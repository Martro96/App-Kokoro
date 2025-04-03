from sqlalchemy import Table, Column, Integer, String, Float, Boolean, MetaData # type: ignore

#Creo un recolector de todas las tablas:
metadata = MetaData()

#Tabla de cafés: 
coffee_table = Table(
    "coffees",
    metadata,
    Column("id", Integer, primary_key=True),
    Column("name", String, nullable=False),
    Column("origin", String),
    Column("notes", String),
    Column("price", Float),
    Column("available", Boolean, default=True),
)