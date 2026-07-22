from pydantic import BaseModel, ConfigDict
import uuid
from datetime import datetime
from .opportunity import OpportunitySchema

class BookmarkBase(BaseModel):
    opportunity_id: uuid.UUID

class BookmarkCreate(BookmarkBase):
    pass

class BookmarkSchema(BookmarkBase):
    id: uuid.UUID
    user_id: uuid.UUID
    created_at: datetime
    opportunity: OpportunitySchema | None = None

    model_config = ConfigDict(from_attributes=True)

class BookmarkListResponse(BaseModel):
    items: list[BookmarkSchema]
    total: int
