#!/bin/bash
# Este script elimina el docker-compose y creará uno nuevo con los archivos actualizados
# para dar permisos (unica vez) -> chmod +x script.sh
# correr script -> ./script.sh

# Detener y eliminar los contenedores definidos en docker-compose.yaml
docker-compose -p my-app -f docker-compose.yaml down

# Eliminar la imagen con nombre específico
# docker rmi my-node-app:0.0.1

# Correr un build de Dockerfile
docker-compose -p my-app -f docker-compose.yaml up --detach
