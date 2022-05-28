FROM node:14-alpine

WORKDIR home/app

COPY package*.json ./

RUN npm i

COPY . .

EXPOSE 3000

CMD [ "npm", "run", "start:builder" ]
