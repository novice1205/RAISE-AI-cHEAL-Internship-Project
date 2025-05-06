from fastapi import APIRouter
from string import ascii_uppercase
from random import sample, shuffle

router = APIRouter()

# Flashcards - Fixed character set
@router.post("/gamify/flashcards")
def flashcards_data():
    characters = list(ascii_uppercase) + list("123456789")
    game_data = [{"char": c, "label": "Flashcard"} for c in characters]
    return {"game_data": game_data}

# Pattern Recognition - Miswritten characters
@router.post("/gamify/pattern")
def pattern_recognition_game():
    normal_chars = list("ABCDEFGHIJKLMN")
    reversed_chars = sample(list("OPQRSTUVWXYZ123456789"), 10)

    # Tag characters
    data = [{"char": c, "label": "Normal"} for c in normal_chars]
    data += [{"char": c, "label": "Reversed"} for c in reversed_chars]

    # Shuffle
    shuffle(data)
    return {"pattern_data": data}

# Tracing Practice
@router.post("/gamify/tracing")
def gamify_tracing_chars():
    from string import ascii_uppercase, ascii_lowercase, digits
    characters = list(ascii_uppercase + ascii_lowercase + digits)
    game_data = [{"char": c, "label": "Trace"} for c in characters]
    return {"game_data": game_data}
