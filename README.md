# App Kokoro

Este proyecto consiste en una aplicación web full-stack que muestra un catálogo de cafés del mundo.

## Tecnologías usadas

- **Frontend:** Angular 19
- **Backend:** FastAPI + SQLite
- **Contenedores:** Docker y Docker Compose

## ¿Qué hace esta app?

- Muestra una colección de cafés de especialidad con imagen, nombre, origen y descripción.
- Se conecta a un backend que expone una API REST con los cafés.
- Se ha añadido soporte para contenedores usando Docker y orquestación con Docker Compose.

## Estructura del proyecto

```
Prueba-tecnica-AirFi/ 
├── API_kokoro-backend/ # Backend con FastAPI + SQLite 
├── kokoro-frontend/ # Frontend con Angular 
├── docker-compose.yml # Orquestación de ambos servicios 
├── prueba_desarrollo_web.pdf # Enunciado prueba 
└── README.md

```

---

## Cómo ejecutar la app con Docker

### Requisitos previos

- Tener instalado Docker y Docker Compose.
- Clonar este repositorio:

```bash
git clone https://github.com/Martro96/Prueba-tecnica-AirFi.git
cd Prueba-tecnica-AirFi
```

### Ejecutar los contenedores

Desde la raíz del proyecto:

```bash
docker-compose up --build
```

Esto construirá e iniciará los servicios del backend (FastAPI en `localhost:8000`) y frontend (Angular servido con Nginx en `localhost:4200`).

### Parar los contenedores

```bash
docker-compose down --volumes --remove-orphans
```

---

## Acceso a la aplicación

- Frontend: http://localhost:4200
- API (FastAPI): http://localhost:8000
- Documentación Swagger: http://localhost:8000/docs

---

## Recursos extra

- Base de datos: SQLite (creada automáticamente)
- Las imágenes se asignan desde el frontend en base al nombre del café.
- Se ha utilizado `HttpClient` en Angular para obtener los datos.

---

## Autoría

Proyecto desarrollado por [Martro96](https://github.com/Martro96) como parte del proceso de selección de AirFi 



