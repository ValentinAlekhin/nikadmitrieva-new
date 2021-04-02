FROM node:14-alpine

WORKDIR /app

COPY . .

RUN  npm install

RUN npm run build

RUN rm -rf node_modules

RUN npm i -g serve

EXPOSE 80

CMD [ "serve" "-S" "-p" "80" "./build" ]