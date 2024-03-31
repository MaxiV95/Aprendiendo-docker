## aplicación de demostración: desarrollo con Docker

Esta aplicación de demostración muestra una aplicación de perfil de usuario simple configurada usando

- index.html con estilos js y css puros
- backend de nodejs con módulo express
- mongodb para almacenamiento de datos

Todos los componentes están basados en Docker.

###

```bash
docker pull mongo
docker pull mongo-express
```

### Con Docker

#### Para iniciar la aplicación

Paso 1: crear una red acoplable

```bash
docker network ls
docker network create mongo-network
```

Paso 2: inicia mongodb

```bash
docker run -d -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=admin -e MONGO_INITDB_ROOT_PASSWORD=password --name mongodb --net mongo-network mongo
```

documentación mongo https://hub.docker.com/_/mongo

Paso 3: inicia mongo-express

```bash
docker run -d -p 8081:8081 -e ME_CONFIG_MONGODB_ADMINUSERNAME=admin -e ME_CONFIG_MONGODB_ADMINPASSWORD=password --net mongo-network --name mongo-express -e ME_CONFIG_MONGODB_SERVER=mongodb mongo-express
```

documentación mongo-express https://hub.docker.com/_/mongo-express

_NOTA: crear docker-network es opcional. Puede iniciar ambos contenedores en una red predeterminada. En este caso, simplemente emita el indicador `--net` en el comando `docker run`_

Paso 4: abre mongo-express desde el navegador

```bash
http://localhost:8080
```

Paso 5: cree una _db_: `user-account` y una _colección_ de `users` en mongo-express

Paso 6: Inicie su aplicación nodejs localmente; vaya al directorio `app` del proyecto

```bash
npm install
node server.js
```

Paso 7: acceda a la interfaz de usuario de su aplicación Nodejs desde el navegador

```bash
http://localhost:3000
```

### Con Docker Compose

#### Para iniciar la aplicación

Paso 1: inicie mongodb y mongo-express

```bash
docker-compose -f docker-compose.yaml up
```

_Puedes acceder a mongo-express en localhost:8080 desde tu navegador_

Paso 2: en la interfaz de usuario de mongo-express, cree una nueva base de datos "my-db"

Paso 3: en la interfaz de usuario de mongo-express: cree una nueva colección "usuarios" en la base de datos "my-db"

Paso 4: iniciar el servidor de node

```bash
npm install
node server.js
```

Paso 5: acceda a la aplicación nodejs desde el navegador

```bash
http://localhost:3000
```

#### Para crear una imagen acoplable desde la aplicación

```bash
docker build -t my-app:1.0 .
```

_El punto "." al final del comando indica la ubicación del Dockerfile._

mas información: https://www.youtube.com/watch?v=6YisG2GcXaw
ver quien usa un puerto -> netstat -ano | findstr :27017