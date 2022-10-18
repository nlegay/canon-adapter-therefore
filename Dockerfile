FROM node:alpine3.15

WORKDIR /app/adapter-therefore/

COPY package*.json ./

RUN npm ci --only=production

COPY . .

VOLUME /app/adapter-therefore/logs

CMD [ "node", "server.js" ]