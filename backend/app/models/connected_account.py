from datetime import datetime, timezone
import uuid
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy import DateTime, String, ForeignKey

from app.db.base import Base

class ConnectedAccount(Base):
    __tablename__ = "connected_accounts"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"))
    provider: Mapped[str] = mapped_column(String, nullable=False) # e.g., "linkedin"
    provider_user_id: Mapped[str] = mapped_column(String, nullable=False, index=True)
    access_token: Mapped[str | None] = mapped_column(String, nullable=True) # Encrypted at rest
    refresh_token: Mapped[str | None] = mapped_column(String, nullable=True) # Encrypted at rest
    connected_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))

    user: Mapped["User"] = relationship(back_populates="accounts")
