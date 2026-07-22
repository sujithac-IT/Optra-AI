from datetime import datetime, timezone
import uuid
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy import DateTime, ForeignKey, UniqueConstraint

from app.db.base import Base

class Bookmark(Base):
    __tablename__ = "bookmarks"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"))
    opportunity_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("opportunities.id", ondelete="CASCADE"))
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))

    user: Mapped["User"] = relationship(back_populates="bookmarks")
    opportunity: Mapped["Opportunity"] = relationship(back_populates="bookmarks")

    __table_args__ = (
        UniqueConstraint('user_id', 'opportunity_id', name='uq_user_opportunity_bookmark'),
    )
