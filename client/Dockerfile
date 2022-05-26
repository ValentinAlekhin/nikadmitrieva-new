FROM node:14-alpine

WORKDIR home/app

COPY package*.json ./

RUN npm i

COPY . .

RUN npm run build

ENV HOST 0.0.0.0
EXPOSE 3000

CMD [ "npm", "run", "start" ]
