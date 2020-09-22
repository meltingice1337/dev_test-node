FROM node:12 as build

WORKDIR /root/src

COPY . .

WORKDIR /root/src/backend

RUN npm install

CMD ["npm", "start"]
