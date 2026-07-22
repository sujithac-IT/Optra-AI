from pydantic import BaseModel, ConfigDict
import uuid

class ProfileBase(BaseModel):
    name: str | None = None
    headline: str | None = None
    avatar_url: str | None = None
    skills: list[str] = []
    goals: list[str] = []
    resume_url: str | None = None

class ProfileCreate(ProfileBase):
    pass

class ProfileUpdate(ProfileBase):
    pass

class ProfileSchema(ProfileBase):
    id: uuid.UUID
    user_id: uuid.UUID

    model_config = ConfigDict(from_attributes=True)
