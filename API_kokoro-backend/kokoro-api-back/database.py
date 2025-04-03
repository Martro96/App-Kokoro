from databases import Database  # type: ignore
from sqlalchemy import create_engine  # type: ignore
from models import metadata

# Creo la URL de conexión a SQLite para que use el archivo local kokoro.db
DATABASE_URL = "sqlite:///./kokoro.db"

# Conexión asíncrona a la base de datos para FastAPI
database = Database(DATABASE_URL)

# Motor de SQLAlchemy para crear las tablas
engine = create_engine(DATABASE_URL)

# Crea todas las tablas definidas en models.py (coffees)
metadata.create_all(engine)
