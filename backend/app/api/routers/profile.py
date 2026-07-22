from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.api.deps import get_db, get_current_user
from app.models.user import User
from app.models.profile import Profile
from app.schemas.profile import ProfileSchema, ProfileUpdate

router = APIRouter()

@router.get("", response_model=ProfileSchema)
async def read_profile(
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    result = await db.execute(select(Profile).filter(Profile.user_id == current_user.id))
    profile = result.scalar_one_or_none()
    if not profile:
        raise HTTPException(status_code=404, detail="Profile not found")
    return profile

@router.put("", response_model=ProfileSchema)
async def update_profile(
    profile_in: ProfileUpdate,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    result = await db.execute(select(Profile).filter(Profile.user_id == current_user.id))
    profile = result.scalar_one_or_none()
    
    if not profile:
        # Create it if it doesn't exist for some reason
        profile = Profile(user_id=current_user.id)
        db.add(profile)
        
    update_data = profile_in.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(profile, field, value)
        
    await db.commit()
    await db.refresh(profile)
    return profile
