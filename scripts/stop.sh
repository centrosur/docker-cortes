# para y elimina todos los contenedores en el servidor
echo "Parando todos los contenedores..."
sudo docker stop $(sudo docker ps -q)
echo "Eliminando todos los contenedores..."
sudo docker rm $(sudo docker ps -aq)
echo "Contenedores eliminados con éxito"