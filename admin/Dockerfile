FROM node:14-alpine as builder

WORKDIR /app

COPY . .

RUN  npm ci

ENV VUE_APP_BASE_URL='http://localhost:8000'

RUN npm run build

FROM node:14-alpine

WORKDIR /app

COPY --from=builder /app/dist .

RUN npm install -g http-server

EXPOSE 8080 

CMD  http-server . --proxy http://localhost:8080? 