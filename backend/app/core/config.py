from pydantic_settings import BaseSettings
from typing import List


class Settings(BaseSettings):
    DATABASE_URL: str
    APP_NAME: str
    ALLOWED_ORIGINS: List[str]

    class Config:
        env_file = ".env.example"


settings = Settings()