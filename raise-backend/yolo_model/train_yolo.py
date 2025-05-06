from ultralytics import YOLO

# Load YOLOv8 nano model (or use 'yolov8m.pt' / 'yolov8s.pt' as needed)
model = YOLO("yolov8n.pt")

# Train on your custom YOLO dataset
model.train(
    data="C:/Users/HP/Desktop/cHEAL Internship/Datasets/kaggle/working/synthdata/data.yaml",
    epochs=50,
    imgsz=416,
    batch=16,
    project="yolo_results",
    name="handwriting_yolo"
)