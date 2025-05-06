import torch
import numpy as np
import cv2

def apply_gradcam(model, input_tensor):
    gradients = []
    activations = []

    def save_gradient_hook(module, grad_in, grad_out):
        gradients.append(grad_out[0])

    def save_activation_hook(module, input, output):
        activations.append(output)

    # Register hooks on the last convolutional layer
    final_conv = list(model.children())[-1]
    handle_forward = final_conv.register_forward_hook(save_activation_hook)
    handle_backward = final_conv.register_backward_hook(save_gradient_hook)

    model.zero_grad()
    output = model(input_tensor)
    pred_class = torch.argmax(output).item()
    output[0, pred_class].backward()

    # Grad-CAM logic
    grad = gradients[0][0].cpu().numpy()
    act = activations[0][0].cpu().numpy()
    weights = np.mean(grad, axis=(1, 2))
    cam = np.sum(weights[:, None, None] * act, axis=0)
    cam = np.maximum(cam, 0)
    cam = cv2.resize(cam, (224, 224))
    cam = (cam - cam.min()) / (cam.max() - cam.min())
    cam = (cam * 255).astype(np.uint8)

    # Clean up
    handle_forward.remove()
    handle_backward.remove()

    return cam.tolist()