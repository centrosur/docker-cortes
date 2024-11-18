#!/bin/bash

# Detener la ejecución si ocurre un error
set -e

# Actualizar paquetes y sistema
echo "Actualizando sistema..."
sudo apt update && sudo apt upgrade -y


# Función para verificar si un comando está disponible
command_exists() {
  command -v "$1" >/dev/null 2>&1
}

# Instalar Docker si no está instalado
if command_exists docker; then
  echo "Docker ya está instalado. Versión: $(docker --version)"
else
  echo "Docker no está instalado. Procediendo a instalarlo..."
  sudo apt update && sudo apt install -y apt-transport-https ca-certificates curl software-properties-common
  curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
  echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
  sudo apt update
  sudo apt install -y docker-ce docker-ce-cli containerd.io
  echo "Docker instalado correctamente. Versión: $(docker --version)"
fi

# Instalar Docker Compose si no está instalado
if command_exists docker-compose; then
  echo "Docker Compose ya está instalado. Versión: $(docker-compose --version)"
else
  echo "Docker Compose no está instalado. Procediendo a instalarlo..."
  DOCKER_COMPOSE_VERSION=$(curl -s https://api.github.com/repos/docker/compose/releases/latest | grep -Po '"tag_name": "\K.*?(?=")')
  sudo curl -L "https://github.com/docker/compose/releases/download/$DOCKER_COMPOSE_VERSION/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
  sudo chmod +x /usr/local/bin/docker-compose
  echo "Docker Compose instalado correctamente. Versión: $(docker-compose --version)"
fi

# Verificar instalaciones
docker --version
docker-compose --version

echo "Docker y Docker Compose están instalados y listos para usar."

# Crear las carpetas donde se debe guardar los assets

# Nombre de la carpeta assets
ASSETS_FOLDER="assets"
LOGOS_FOLDER="assets/logos"
FAVICONS_FOLDER="assets/favicons"

# Verificar si el ASSETS_FOLDER ya existe
if [ -d "$ASSETS_FOLDER" ]; then
  echo "Carpeta $ASSETS_FOLDER ya existe."
else
  mkdir "$ASSETS_FOLDER"
  echo "Carpeta '$ASSETS_FOLDER' creada correctamente."
fi

# Verificar si el LOGOS_FOLDER ya existe
if [ -d "$LOGOS_FOLDER" ]; then
  echo "Carpeta $LOGOS_FOLDER ya existe."
else
  mkdir "$LOGOS_FOLDER"
  echo "Carpeta '$LOGOS_FOLDER' creada correctamente."
fi

# Verificar si el FAVICONS_FOLDER ya existe
if [ -d "$FAVICONS_FOLDER" ]; then
  echo "Carpeta $FAVICONS_FOLDER ya existe."
else
  mkdir "$FAVICONS_FOLDER"
  echo "Carpeta '$FAVICONS_FOLDER' creada correctamente."
fi

CERTS_FOLDER="certs"

# Verificar si el CERTS_FOLDER ya existe
if [ -d "$CERTS_FOLDER" ]; then
  echo "Carpeta $CERTS_FOLDER ya existe."
else
  mkdir "$CERTS_FOLDER"
  echo "Carpeta '$CERTS_FOLDER' creada correctamente."
fi

# run generate_env para generar las variables de entorno
chmod +x generate_env.sh
bash generate_env.sh

echo "Configuraciones iniciales realizadas con éxito"