FROM node:14-alpine
WORKDIR /usr/src/discord-nfl-fantasy-bot
COPY .env ./
COPY dist/ ./
COPY package*.json ./
RUN [ "npm", "install", "--only=prod" ]
CMD [ "node", "index.js" ]
