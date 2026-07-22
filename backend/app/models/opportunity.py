from datetime import datetime, timezone
import uuid
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.dialects.postgresql import UUID, JSONB
from sqlalchemy import DateTime, String, Enum
import enum

from app.db.base import Base

class OpportunityType(str, enum.Enum):
    job = "job"
    internship = "internship"
    hackathon = "hackathon"
    competition = "competition"

class OpportunitySource(str, enum.Enum):
    linkedin = "linkedin"
    unstop = "unstop"
    generic = "generic"

class Opportunity(Base):
    __tablename__ = "opportunities"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    external_id: Mapped[str] = mapped_column(String, unique=True, index=True, nullable=False)
    title: Mapped[str] = mapped_column(String, nullable=False)
    org: Mapped[str] = mapped_column(String, nullable=False)
    type: Mapped[OpportunityType] = mapped_column(Enum(OpportunityType), nullable=False)
    tags: Mapped[list[str]] = mapped_column(JSONB, server_default='[]')
    deadline: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True)
    url: Mapped[str | None] = mapped_column(String, nullable=True)
    source: Mapped[OpportunitySource] = mapped_column(Enum(OpportunitySource), nullable=False)
    raw_payload: Mapped[dict] = mapped_column(JSONB, server_default='{}')
    fetched_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))

    bookmarks: Mapped[list["Bookmark"]] = relationship(back_populates="opportunity", cascade="all, delete-orphan")
