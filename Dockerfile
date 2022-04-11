FROM node:lts-alpine3.15

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci --only=production

COPY . .

EXPOSE 42
CMD [ "node", "server.js" ]