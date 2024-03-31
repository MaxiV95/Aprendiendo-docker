# Selecciona la imagen base de Node.js versión 13 en Alpine Linux, una distribución ligera
FROM node:18-alpine

# Define las variables de entorno para el nombre de usuario y contraseña de la base de datos MongoDB
# ENV MONGO_DB_USERNAME=admin \
#     MONGO_DB_PWD=password

# Copiar carpeta
COPY app /app/

# establece el directorio predeterminado para que los siguientes comandos se ejecuten en el directorio /home/app
WORKDIR /app

# ejecutará la instalación de npm en /home/app debido a WORKDIR
RUN npm install

# no es necesario /app/server.js debido a WORKDIR
CMD ["node", "server.js"]

# -> docker build -t my-app:0.1 .
# -> docker images
# -> docker run -d -p 3000:3000 --name my-app my-app:0.1
# -> docker ps

# una mejor practica es pimero copiar el package.json, instalar node y luego copiar el resto de carpetas,
# mas velocidad en generacion de imagen ya que carga solo nuevos cambios
# FROM node:18-alpine
# WORKDIR /app
# COPY package.json package-lock.json .
# RUN npm install
# COPY myapp /app
# CMD ["node", "server.js"]