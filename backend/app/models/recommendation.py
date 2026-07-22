from datetime import datetime, timezone
import uuid
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy import DateTime, String, Enum, ForeignKey
import enum

from app.db.base import Base

class PriorityEnum(str, enum.Enum):
    high = "high"
    medium = "medium"
    low = "low"

class SkillRecommendation(Base):
    __tablename__ = "skill_recommendations"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"))
    skill: Mapped[str] = mapped_column(String, nullable=False)
    reason: Mapped[str] = mapped_column(String, nullable=False)
    resource_url: Mapped[str | None] = mapped_column(String, nullable=True)
    priority: Mapped[PriorityEnum] = mapped_column(Enum(PriorityEnum), nullable=False, default=PriorityEnum.medium)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))

    user: Mapped["User"] = relationship(back_populates="recommendations")
