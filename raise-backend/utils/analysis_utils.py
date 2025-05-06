from collections import Counter

def analyze_results(results):
    names = results.names
    label_ids = [int(cls.item()) for cls in results.boxes.cls]
    labels = [names[i] for i in label_ids]
    counts = dict(Counter(labels))

    confused = [k for k, v in counts.items() if k != "Normal" and v >= 3]
    only_number_confusion = any(ch in "0123456789" for ch in confused)

    return {
        "label_counts": counts,
        "total_detected": len(labels),
        "confused_characters": confused,
        "only_number_confusion": only_number_confusion
    }