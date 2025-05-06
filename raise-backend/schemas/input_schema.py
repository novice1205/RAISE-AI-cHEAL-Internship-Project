from pydantic import BaseModel

class UploadSchema(BaseModel):
    filename: str
