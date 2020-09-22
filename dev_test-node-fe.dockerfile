FROM node:12 as build

WORKDIR /root/src

COPY . .

WORKDIR /root/src/frontend

RUN npm install && npm prune && npm run build

FROM nginx:1.18

RUN rm -f /etc/nginx/conf.d/* /docker-entrypoint.d/*

COPY --from=build /root/src/frontend/dist /usr/share/nginx/html

COPY --from=build /root/src/nginx.conf /etc/nginx/
