from ultralytics import YOLO
import os
from PIL import Image, ImageDraw

model = YOLO("C:/Users/HP/Desktop/cHEAL Internship/RAISE-AI Phase-I/raise-backend/yolo_model/yolo_results/handwriting_yolo4/weights/best.pt")

def draw_colored_boxes(image_path, results, output_path):
    img = Image.open(image_path).convert("RGB")
    draw = ImageDraw.Draw(img)
    names = model.names

    for box in results.boxes:
        x1, y1, x2, y2 = map(int, box.xyxy[0])
        label = names[int(box.cls[0].item())]
        color = {"Normal": "green", "Corrected": "orange", "Reversed": "red"}.get(label, "black")
        draw.rectangle([x1, y1, x2, y2], outline=color, width=2)
        draw.text((x1, y1 - 10), label, fill=color)

    img.save(output_path)

def run_detection(image_path, save_dir="output_images"):
    os.makedirs(save_dir, exist_ok=True)
    annotated_img_path = os.path.join(save_dir, "annotated.jpg")
    results = model(image_path)
    draw_colored_boxes(image_path, results[0], annotated_img_path)
    return results[0], annotated_img_path