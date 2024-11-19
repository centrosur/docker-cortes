#!/bin/bash

# Paso 1: Verificar si el repositorio está clonado
if [ ! -d .git ]; then
  echo "Este directorio no parece ser un repositorio de Git. Por favor, verifica."
  exit 1
fi

# Paso 2: Descartar cambios locales
echo "Descartando todos los cambios locales..."
git reset --hard HEAD
if [ $? -ne 0 ]; then
  echo "Error al descartar cambios locales. Por favor, verifica el estado del repositorio."
  exit 1
fi

# Paso 3: Traer los cambios del repositorio remoto
echo "Actualizando el repositorio..."
git pull origin $(git rev-parse --abbrev-ref HEAD)

if [ $? -ne 0 ]; then
  echo "Error al actualizar el repositorio. Por favor, verifica los conflictos o problemas de conexión."
  exit 1
fi

echo "Repositorio actualizado con éxito."

# Paso 4: Ejecutar el script build.sh
SETUP_SCRIPT="scripts/build.sh"

if [ -f "$SETUP_SCRIPT" ]; then
  echo "Ejecutando el script build.sh..."
  bash "$SETUP_SCRIPT"
  if [ $? -ne 0 ]; then
    echo "Error al ejecutar el script build.sh."
    exit 1
  fi
else
  echo "El script build.sh no existe en la ubicación esperada: $SETUP_SCRIPT"
  exit 1
fi

echo "Script ejecutado correctamente. Todo está actualizado y configurado."
