from pydantic import BaseModel, ConfigDict
import uuid
from datetime import datetime
from app.models.recommendation import PriorityEnum

class RecommendationBase(BaseModel):
    skill: str
    reason: str
    resource_url: str | None = None
    priority: PriorityEnum

class RecommendationCreate(RecommendationBase):
    user_id: uuid.UUID

class RecommendationSchema(RecommendationBase):
    id: uuid.UUID
    user_id: uuid.UUID
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)

class RecommendationListResponse(BaseModel):
    items: list[RecommendationSchema]
    total: int
