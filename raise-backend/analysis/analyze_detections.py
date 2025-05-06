from collections import Counter

CONFUSABLE_DIGITS = {"6", "9", "5", "2"}
CONFUSABLE_LETTERS = {"b", "d", "p", "q", "m", "w", "u", "n"}

def analyze_detections(results):
    names = results.names
    boxes = results.boxes
    class_ids = boxes.cls.tolist()

    labels = [names[int(cid)] for cid in class_ids]
    counts = Counter(labels)

    analysis = {
        "total_detected": sum(counts.values()),
        "label_counts": dict(counts),
        "confused_characters": [],
        "only_number_confusion": False
    }

    for label in counts:
        if label in CONFUSABLE_DIGITS or label in CONFUSABLE_LETTERS:
            analysis["confused_characters"].append(label)

    if all(l.isdigit() for l in counts):
        analysis["only_number_confusion"] = True

    return analysis