FROM node:16-alpine

WORKDIR home/app

COPY package*.json ./

RUN yarn install

RUN npm run build

COPY . .

CMD [ "npm", "run", "start" ]
