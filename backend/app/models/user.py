from datetime import datetime, timezone
import uuid
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy import DateTime, String, Boolean

from app.db.base import Base

class User(Base):
    __tablename__ = "users"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    email: Mapped[str] = mapped_column(String, unique=True, index=True, nullable=False)
    hashed_password: Mapped[str | None] = mapped_column(String, nullable=True) # Nullable for OAuth-only
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))

    # Relationships
    accounts: Mapped[list["ConnectedAccount"]] = relationship(back_populates="user", cascade="all, delete-orphan")
    profile: Mapped["Profile"] = relationship(back_populates="user", uselist=False, cascade="all, delete-orphan")
    bookmarks: Mapped[list["Bookmark"]] = relationship(back_populates="user", cascade="all, delete-orphan")
    recommendations: Mapped[list["SkillRecommendation"]] = relationship(back_populates="user", cascade="all, delete-orphan")
