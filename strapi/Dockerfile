FROM node:14-alpine

WORKDIR home/app

COPY package*.json ./

RUN yarn install

RUN npm run build

COPY . .

CMD [ "npm", "run", "start" ]
