# A partir de la siguiente imagen:
FROM node:19-alpine
# Copiar carpetas y archivos dentro del directorio especificado
# ('/' final para que lo cree si no existe)
COPY package.json /app/
COPY src /app/
# Moverse de directorio (cd en nuestra terminal)
WORKDIR /app
# Instalar dependencias dentro del contenedor
RUN npm install
# Corremos la aplicación (solo un comando CMD)
CMD [ "node", "server.js" ]

# Corre docker, corre build, -t: para añadir nombre con versión name:tag,
# finalmente direccion donde se encuentra el archivo docker
# -> docker build -t nodeapp:0.1 .

# -> docker images
# -> docker run -d -p 8080:3000 nodeapp:0.1
# -> docker ps