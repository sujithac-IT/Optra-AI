from pydantic import BaseModel

class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"

class TokenPayload(BaseModel):
    sub: str | None = None

class RefreshTokenRequest(BaseModel):
    # In a real app we might use http-only cookies for refresh tokens
    pass 
