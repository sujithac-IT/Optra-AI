from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from sqlalchemy.exc import IntegrityError
import uuid

from app.api.deps import get_db, get_current_user
from app.models.user import User
from app.models.bookmark import Bookmark
from app.models.opportunity import Opportunity
from app.schemas.bookmark import BookmarkSchema, BookmarkCreate, BookmarkListResponse

router = APIRouter()

@router.post("", response_model=BookmarkSchema, status_code=status.HTTP_201_CREATED)
async def create_bookmark(
    bookmark_in: BookmarkCreate,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    # Check if opportunity exists
    opp_result = await db.execute(select(Opportunity).filter(Opportunity.id == bookmark_in.opportunity_id))
    if not opp_result.scalar_one_or_none():
        raise HTTPException(status_code=404, detail="Opportunity not found")

    bookmark = Bookmark(
        user_id=current_user.id,
        opportunity_id=bookmark_in.opportunity_id
    )
    db.add(bookmark)
    try:
        await db.commit()
        await db.refresh(bookmark)
    except IntegrityError:
        await db.rollback()
        raise HTTPException(status_code=400, detail="Bookmark already exists")
        
    return bookmark

@router.get("", response_model=BookmarkListResponse)
async def list_bookmarks(
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    result = await db.execute(select(Bookmark).filter(Bookmark.user_id == current_user.id))
    bookmarks = result.scalars().all()
    
    # Let's assume we want to return the opportunity details as well, SQLAlchemy relationships handle this
    # if configured properly with selectinload, but since it's lazy by default in async, we might need to load it.
    # For now, let's keep it simple.
    
    return BookmarkListResponse(items=bookmarks, total=len(bookmarks))

@router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_bookmark(
    id: uuid.UUID,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    result = await db.execute(select(Bookmark).filter(Bookmark.id == id, Bookmark.user_id == current_user.id))
    bookmark = result.scalar_one_or_none()
    
    if not bookmark:
        raise HTTPException(status_code=404, detail="Bookmark not found")
        
    await db.delete(bookmark)
    await db.commit()
