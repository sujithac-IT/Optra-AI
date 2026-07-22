import uuid
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.dialects.postgresql import UUID, JSONB
from sqlalchemy import String, ForeignKey
from typing import Any

from app.db.base import Base

class Profile(Base):
    __tablename__ = "profiles"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), unique=True)
    name: Mapped[str | None] = mapped_column(String, nullable=True)
    headline: Mapped[str | None] = mapped_column(String, nullable=True)
    avatar_url: Mapped[str | None] = mapped_column(String, nullable=True)
    skills: Mapped[list[str]] = mapped_column(JSONB, server_default='[]')
    goals: Mapped[list[str]] = mapped_column(JSONB, server_default='[]') # e.g., ["job", "internship"]
    resume_url: Mapped[str | None] = mapped_column(String, nullable=True)

    user: Mapped["User"] = relationship(back_populates="profile")
