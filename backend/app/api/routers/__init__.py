from fastapi import APIRouter

from app.api.routers import auth, users, profile, opportunities, bookmarks, recommendations, admin

api_router = APIRouter()

api_router.include_router(auth.router, prefix="/auth", tags=["auth"])
api_router.include_router(users.router, prefix="/users", tags=["users"])
api_router.include_router(profile.router, prefix="/profile", tags=["profile"])
api_router.include_router(opportunities.router, prefix="/opportunities", tags=["opportunities"])
api_router.include_router(bookmarks.router, prefix="/bookmarks", tags=["bookmarks"])
api_router.include_router(recommendations.router, prefix="/recommendations", tags=["recommendations"])
api_router.include_router(admin.router, prefix="/admin", tags=["admin"])
