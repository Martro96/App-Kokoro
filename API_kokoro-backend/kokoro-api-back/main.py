from fastapi import FastAPI
from contextlib import asynccontextmanager
from database import database #conexión a SQLite
from models import coffee_table #importamos la tabla real de cafés
from schemas import Coffee, CoffeeCreate
from fastapi.middleware.cors import CORSMiddleware

# Lifespan: se ejecuta al iniciar y cerrar el servidor
@asynccontextmanager
async def lifespan(app: FastAPI):
    await database.connect()  # Conecta a la base de datos al iniciar FastAPI
    yield
    await database.disconnect()  # Desconecta cuando se detiene el servidor

# Creamos la instancia principal de la aplicación
app = FastAPI(lifespan=lifespan)
#Permito conexiones en el back 
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:4200"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Endpoint básico de prueba
@app.get("/")
def read_root():
    return {"message": "Hola desde Codespaces con base de datos conectada!"}

# Endpoint GET: devolver todos los cafés
@app.get("/coffees", response_model=list[Coffee])
async def get_coffees():
    query = coffee_table.select()
    results = await database.fetch_all(query)  # Recupera todos los cafés de la BBDD
    return results

# Endpoint POST: crear un nuevo café en la base de datos
@app.post("/coffees", response_model=Coffee)
async def create_coffee(coffee: CoffeeCreate):
    query = coffee_table.insert().values(
        name=coffee.name,
        origin=coffee.origin,
        notes=coffee.notes,
        price=coffee.price,
        available=coffee.available
    )
    last_record_id = await database.execute(query)  # Ejecuta la inserción
    return {**coffee.dict(), "id": last_record_id}  # Devuelve el café insertado con ID generado

# Endpoint GET con parámetro para obtener el café por su id
@app.get("/coffees/{coffee_id}", response_model=Coffee)
async def get_coffee_by_id(coffee_id: int):
    # Creamos la consulta por id
    query = coffee_table.select().where(coffee_table.c.id == coffee_id)
    coffee = await database.fetch_one(query)

    # Si no encuentra el café:
    if coffee is None:
        from fastapi import HTTPException
        raise HTTPException(status_code=404, detail="Café no encontrado")

    # Si lo encuentra, lo devuelve aquí
    return coffee

#endpoint para editar un café por su id
@app.put("/coffees/{coffee_id}", response_model=Coffee)
async def update_coffee(coffee_id: int, updated_coffee: CoffeeCreate):
    #verificamos que el café existe
    query = coffee_table.select().where(coffee_table.c.id == coffee_id)
    existing_coffee = await database.fetch_one(query)

    if existing_coffee is None:
        from fastapi import HTTPException
        raise HTTPException(status_code=404, detail="Café no encontrado")

    #Ejecutamos la actualización
    update_query = coffee_table.update().where(coffee_table.c.id == coffee_id).values(
        name=updated_coffee.name,
        origin=updated_coffee.origin,
        notes=updated_coffee.notes,
        price=updated_coffee.price,
        available=updated_coffee.available
    )
    await database.execute(update_query)

    #devolvemos el café actualizado
    return {**updated_coffee.dict(), "id": coffee_id}

# Endpoint DELETE: eliminar un café por su ID
@app.delete("/coffees/{coffee_id}")
async def delete_coffee(coffee_id: int): 
    query = coffee_table.select().where(coffee_table.c.id == coffee_id)
    coffee = await database.fetch_one(query)

    if coffee is None:
        from fastapi import HTTPException
        raise HTTPException(status_code=404, detail="Café no encontrado")

    # Eliminamos café:
    delete_query = coffee_table.delete().where(coffee_table.c.id == coffee_id)
    await database.execute(delete_query)

    return {"message": f"Café con ID {coffee_id} ha sido eliminado correctamente"}
