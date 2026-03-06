# Etapa 1: Build de la aplicación Vue/Vite
FROM node:22-alpine as build-stage
WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del código fuente
COPY . .

# Construir la aplicación para producción
# Nota: Pasamos el API key como ARG si quieres inyectarlo en tiempo de build,
# pero en EasyPanel puedes usar variables de entorno directamente.
RUN npm run build

# Etapa 2: Servidor Nginx para servir los estáticos
FROM nginx:alpine as production-stage

# Copiar los archivos construidos desde la etapa anterior
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Copiar la configuración personalizada de Nginx
# Esto es crucial para que el enrutador de Vue (SPA) funcione correctamente
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exponer el puerto 80
EXPOSE 80

# Iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]
