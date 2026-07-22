from pydantic import BaseModel, EmailStr, ConfigDict
import uuid
from datetime import datetime

class UserBase(BaseModel):
    email: EmailStr

class UserCreate(UserBase):
    password: str | None = None

class UserUpdate(BaseModel):
    email: EmailStr | None = None

class UserSchema(UserBase):
    id: uuid.UUID
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)
