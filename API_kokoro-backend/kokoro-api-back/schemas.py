from pydantic import BaseModel

class Coffee(BaseModel):
    id: int
    name: str
    origin: str | None = None
    notes: str | None = None
    price: float
    available: bool

class CoffeeCreate(BaseModel):
    name: str
    origin: str | None = None
    notes: str | None = None
    price: float
    available: bool