FROM strapi/base

WORKDIR /app

COPY package*.json ./

RUN npm i

ENV NODE_ENV production

COPY . .

RUN npm run build


EXPOSE 1337

CMD [ "npm", "run", "start" ]
