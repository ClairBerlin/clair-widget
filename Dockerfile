FROM nginx
COPY dist /usr/share/nginx/html
COPY vue-default.conf /etc/nginx/conf.d/default.conf
