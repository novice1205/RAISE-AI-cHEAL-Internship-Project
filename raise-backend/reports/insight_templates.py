def get_gamified_tasks(confused_chars):
    suggestions = []

    for char in confused_chars:
        if char in {"b", "d", "p", "q"}:
            suggestions.append(f"Trace and color '{char}' vs its mirror letter (e.g., 'b' vs 'd').")
        elif char in {"6", "9"}:
            suggestions.append(f"Practice vertical flip with '6' and '9' cutouts.")
        else:
            suggestions.append(f"Circle '{char}' in words during reading practice.")

    if not suggestions:
        suggestions.append("Keep practicing consistent letter formation and line spacing.")

    return suggestions
