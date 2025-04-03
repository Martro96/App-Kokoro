# Etapa 1: build de la app Angular
FROM node:18 AS build

WORKDIR /app

COPY . .

RUN npm install
RUN npm run build --configuration=production

# Etapa 2: servir con Nginx
FROM nginx:stable-alpine

COPY --from=build /app/dist/kokoro-frontend/browser /usr/share/nginx/html

# Agregamos la configuración custom de NGINX
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
