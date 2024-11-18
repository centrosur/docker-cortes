# Clonar el proyecto de GitHub
echo "Clonando el proyecto desde GitHub..."
REPO_URL="https://github.com/juanpablo-jpho/docker-cortes.git"  # Cambia esto por tu URL
git clone $REPO_URL
cd docker-cortes

bash setup.sh
