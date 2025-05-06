import base64
import io
import numpy as np
import tensorflow as tf
from PIL import Image
import matplotlib.cm as cm

# Load the trained model
model = tf.keras.models.load_model("models/dyslexia_handwriting_model.keras")
IMG_SIZE = (224, 224)

def preprocess_image(image):
    image = image.resize(IMG_SIZE)
    array = np.array(image) / 255.0
    array = np.expand_dims(array, axis=0)
    return array

def make_gradcam_heatmap(img_array, model, last_conv_layer_name="conv2d", pred_index=None):
    grad_model = tf.keras.models.Model(
        [model.inputs], [model.get_layer(last_conv_layer_name).output, model.output]
    )

    with tf.GradientTape() as tape:
        conv_outputs, predictions = grad_model(img_array)
        if pred_index is None:
            pred_index = tf.argmax(predictions[0])
        class_channel = predictions[:, pred_index]

    grads = tape.gradient(class_channel, conv_outputs)
    pooled_grads = tf.reduce_mean(grads, axis=(0, 1, 2))
    conv_outputs = conv_outputs[0]
    heatmap = conv_outputs @ pooled_grads[..., tf.newaxis]
    heatmap = tf.squeeze(heatmap)
    heatmap = tf.maximum(heatmap, 0) / tf.math.reduce_max(heatmap)
    return heatmap.numpy()

def encode_heatmap(heatmap, image):
    heatmap = np.uint8(255 * heatmap)
    heatmap_img = Image.fromarray(heatmap).resize(image.size)
    heatmap_arr = np.array(heatmap_img)

    original_arr = np.array(image.convert("RGB"))
    jet_img = np.uint8(cm.jet(heatmap_arr / 255.0)[:, :, :3] * 255)
    jet_img = Image.fromarray(jet_img).resize(image.size)
    blended = Image.blend(Image.fromarray(original_arr), jet_img, alpha=0.5)

    buffered = io.BytesIO()
    blended.save(buffered, format="PNG")
    return base64.b64encode(buffered.getvalue()).decode("utf-8")

def predict_dysgraphia(image_bytes):
    image = Image.open(io.BytesIO(image_bytes)).convert("RGB")
    img_array = preprocess_image(image)
    prediction = model.predict(img_array)[0][0]

    confidence = round(float(prediction) * 100, 3)
    result = "Normal" if confidence >= 30 else "Dyslexia"

    heatmap = make_gradcam_heatmap(img_array, model, last_conv_layer_name="conv5_block3_out")
    heatmap_encoded = encode_heatmap(heatmap, image)

    return f"Prediction: {result} Confidence: {confidence}%", heatmap_encoded