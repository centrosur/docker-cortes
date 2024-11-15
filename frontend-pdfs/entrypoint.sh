#!/bin/sh
# Sustituir las variables de entorno en nginx.conf antes de iniciar Nginx
envsubst '$NUM_CONNECTIONS $PORT_BACKEND' < /etc/nginx/nginx.conf.template > /etc/nginx/nginx.conf

envsubst '$LOGO_URL $FAVICON_URL $MINISTERIO_URL $MAX_HEIGHT_TABLE $MAX_ROW_IN_TABLE $ALIMENTADORES_INDUSTRIALES $TITLE $DESCRIPTION' < /usr/share/nginx/html/assets/js/runtime-env-template.js > /usr/share/nginx/html/assets/js/runtime-env.js
# Iniciar Nginx
nginx -g "daemon off;"