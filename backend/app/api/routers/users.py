from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from app.api.deps import get_db, get_current_user
from app.models.user import User
from app.schemas.user import UserSchema, UserUpdate

router = APIRouter()

@router.get("/me", response_model=UserSchema)
async def read_user_me(current_user: User = Depends(get_current_user)):
    return current_user

@router.patch("/me", response_model=UserSchema)
async def update_user_me(
    user_in: UserUpdate,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    if user_in.email:
        current_user.email = user_in.email
    await db.commit()
    await db.refresh(current_user)
    return current_user
