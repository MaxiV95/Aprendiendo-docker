# Selecciona la imagen base de Node.js versión 13 en Alpine Linux, una distribución ligera
FROM node:18-alpine

# Crear el directorio de la aplicación
WORKDIR /app

# Copiar archivos de la aplicación
COPY /app/package.json .
COPY /app/package-lock.json .

# Instalar dependencias de la aplicación
RUN npm install

# Define las variables de entorno para el nombre de usuario y contraseña de la base de datos MongoDB
# ENV MONGO_DB_USERNAME=admin \
#     MONGO_DB_PWD=password
# Copiar archivos fuente de la aplicación
COPY /app/src .

# Cambiar el propietario de los archivos en el directorio de la aplicación al usuario node
RUN chown -R node:node /app

# Cambiar al usuario node
USER node

# Ejecutar la aplicación
CMD ["node", "server.js"]

# -> docker build -t my-app:0.1 .
# -> docker images
# -> docker run -d -p 3000:3000 --name my-app my-app:0.1
# -> docker ps
