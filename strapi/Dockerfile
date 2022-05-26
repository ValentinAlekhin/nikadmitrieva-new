FROM strapi/base

WORKDIR /app

COPY package*.json ./

RUN npm i

ENV NODE_ENV production

RUN npm run build

COPY . .

EXPOSE 1337

CMD [ "npm", "run", "start" ]
