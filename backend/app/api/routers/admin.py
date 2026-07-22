from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.deps import get_db
# For admin routes, we'd normally have a get_current_admin dependency
from app.services.feed_refresh_service import refresh_all_feeds

router = APIRouter()

@router.post("/feeds/refresh")
async def manual_feed_refresh(db: AsyncSession = Depends(get_db)):
    """
    Manually trigger adapter sync (admin-only in a real app)
    """
    count = await refresh_all_feeds(db)
    return {"message": f"Successfully refreshed feeds. Upserted {count} opportunities."}
