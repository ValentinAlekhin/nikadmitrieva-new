FROM node:16-alpine

WORKDIR home/app

COPY package*.json ./

RUN npm ci

RUN npm run build

COPY . .

CMD [ "npm", "run", "start" ]
