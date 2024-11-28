FROM nginx:1.25.4-alpine-slim as prod
COPY /dist /usr/share/nginx/html
COPY /nginx/default.conf  /etc/nginx/conf.d
CMD ["nginx", "-g", "daemon off;"]