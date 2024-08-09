# Usa una imagen base de Node.js
FROM node:12.13-alpine3.9 AS build

# Establece el directorio de trabajo en /app
WORKDIR /app

# Copia el package.json y el package-lock.json
COPY package*.json ./

# Instala las dependencias
RUN npm install --frozen-lockfile

# Copia el resto de la aplicación
COPY . .

# Construye la aplicación para producción
RUN npm run build

# Usa una imagen base de Nginx para servir la aplicación
FROM nginx:alpine

# Copia los archivos de construcción de React al directorio de Nginx
COPY --from=build /app/build /usr/share/nginx/html

# Elimina la configuración por defecto de Nginx
RUN rm /etc/nginx/conf.d/default.conf

# Copia la configuración personalizada de Nginx
COPY nginx.conf /etc/nginx/conf.d

# Expone el puerto 80
EXPOSE 3000

# Comando para ejecutar Nginx
CMD ["nginx", "-g", "daemon off;"]
