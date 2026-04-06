import os
from datetime import timedelta
from urllib.parse import quote_plus
from dotenv import load_dotenv

load_dotenv()


class Config:
    # MySQL Database
    DB_HOST = os.getenv('DB_HOST', 'localhost')
    DB_USER = os.getenv('DB_USER', 'root')
    DB_PASSWORD = os.getenv('DB_PASSWORD', '')
    DB_NAME = os.getenv('DB_NAME', 'alumni_portal_db')

    SQLALCHEMY_DATABASE_URI = (
        f"mysql+pymysql://{DB_USER}:{quote_plus(DB_PASSWORD)}@{DB_HOST}/{DB_NAME}"
        "?charset=utf8mb4"
    )
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    # JWT
    JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY', 'default-secret-key')
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(days=7)

    # Uploads
    UPLOAD_FOLDER = os.path.join(
        os.path.dirname(os.path.abspath(__file__)), 'uploads'
    )
    MAX_CONTENT_LENGTH = 16 * 1024 * 1024  # 16 MB max upload

    ALLOWED_EXTENSIONS = {'jpg', 'jpeg', 'png', 'gif', 'pdf', 'doc', 'docx'}
