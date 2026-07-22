from pydantic import BaseModel, ConfigDict
import uuid
from datetime import datetime
from app.models.opportunity import OpportunityType, OpportunitySource

# Models for Opportunity
class OpportunityBase(BaseModel):
    title: str
    org: str
    type: OpportunityType
    tags: list[str] = []
    deadline: datetime | None = None
    url: str | None = None
    source: OpportunitySource

class OpportunityCreate(OpportunityBase):
    external_id: str
    raw_payload: dict = {}

class OpportunityUpdate(OpportunityBase):
    title: str | None = None
    org: str | None = None
    type: OpportunityType | None = None
    source: OpportunitySource | None = None

class OpportunitySchema(OpportunityBase):
    id: uuid.UUID
    external_id: str
    fetched_at: datetime
    match_score: float | None = None # For returning the score in the response

    model_config = ConfigDict(from_attributes=True)

class OpportunityListResponse(BaseModel):
    items: list[OpportunitySchema]
    total: int
