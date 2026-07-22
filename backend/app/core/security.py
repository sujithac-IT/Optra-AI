from datetime import datetime, timedelta, timezone
from typing import Any

import jwt
from passlib.context import CryptContext
from cryptography.fernet import Fernet

from app.core.config import settings

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

ALGORITHM = "HS256"

# For symmetric encryption of OAuth tokens
fernet = Fernet(settings.ENCRYPTION_KEY.encode('utf-8') if settings.ENCRYPTION_KEY else Fernet.generate_key())

def create_access_token(
    subject: str | Any, expires_delta: timedelta | None = None
) -> str:
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(
            minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES
        )
    to_encode = {"exp": expire, "sub": str(subject)}
    encoded_jwt = jwt.encode(to_encode, settings.SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)

def encrypt_token(token: str) -> str:
    """Encrypt OAuth tokens before saving to DB."""
    return fernet.encrypt(token.encode("utf-8")).decode("utf-8")

def decrypt_token(encrypted_token: str) -> str:
    """Decrypt OAuth tokens from DB."""
    return fernet.decrypt(encrypted_token.encode("utf-8")).decode("utf-8")
