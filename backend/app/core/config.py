from typing import Any

from pydantic import PostgresDsn, field_validator
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    PROJECT_NAME: str = "Optra-AI Backend"
    API_V1_STR: str = "/api"
    BACKEND_CORS_ORIGINS: list[str] = []

    # Database
    POSTGRES_SERVER: str
    POSTGRES_USER: str
    POSTGRES_PASSWORD: str
    POSTGRES_DB: str
    POSTGRES_PORT: int = 5432
    SQLALCHEMY_DATABASE_URI: PostgresDsn | str | None = None

    @field_validator("SQLALCHEMY_DATABASE_URI", mode="before")
    @classmethod
    def assemble_db_connection(cls, v: str | None, info: Any) -> Any:
        if isinstance(v, str):
            return v
        return PostgresDsn.build(
            scheme="postgresql+asyncpg",
            username=info.data.get("POSTGRES_USER"),
            password=info.data.get("POSTGRES_PASSWORD"),
            host=info.data.get("POSTGRES_SERVER"),
            port=info.data.get("POSTGRES_PORT"),
            path=f"{info.data.get('POSTGRES_DB') or ''}",
        )

    # Redis
    REDIS_URL: str

    # Security
    SECRET_KEY: str
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 1440
    ENCRYPTION_KEY: str

    # LinkedIn OAuth
    LINKEDIN_CLIENT_ID: str
    LINKEDIN_CLIENT_SECRET: str
    LINKEDIN_REDIRECT_URI: str

    model_config = SettingsConfigDict(env_file=".env", case_sensitive=True)

settings = Settings()
