# Usa una imagen base de Nginx
FROM nginx:alpine

# Copiar el archivo nginx.conf como plantilla
COPY frontend-pdfs/nginx.conf /etc/nginx/nginx.conf.template

# Copiar el script de inicio
COPY frontend-pdfs/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh


# Copia los archivos de tu aplicación Angular al contenedor
COPY ./frontend-pdfs/www /usr/share/nginx/html
COPY frontend-pdfs/runtime-env.js /usr/share/nginx/html/assets/js/runtime-env-template.js

COPY ./assets/logo /usr/share/nginx/html/assets/logo
COPY ./assets/favicon /usr/share/nginx/html/assets/favicon

# Expone el puerto 80 para el servidor
EXPOSE 443

# Usar el script de entrada para iniciar Nginx
ENTRYPOINT ["/entrypoint.sh"]

# Inicia Nginx en primer plano
# CMD ["nginx", "-g", "daemon off;"]