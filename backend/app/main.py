from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from app.core.config import settings
from app.api.routers import api_router
from app.workers.scheduler import start_scheduler

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: Start APScheduler, Redis pool, etc.
    start_scheduler()
    yield
    # Shutdown: Stop services
    pass

app = FastAPI(
    title=settings.PROJECT_NAME,
    openapi_url=f"{settings.API_V1_STR}/openapi.json",
    lifespan=lifespan,
)

# Set all CORS enabled origins
if settings.BACKEND_CORS_ORIGINS:
    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.BACKEND_CORS_ORIGINS,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

@app.get("/health", tags=["health"])
async def health_check():
    return JSONResponse(content={"status": "ok"})

app.include_router(api_router, prefix=settings.API_V1_STR)
