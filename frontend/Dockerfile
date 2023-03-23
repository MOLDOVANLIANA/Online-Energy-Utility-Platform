FROM node:17-alpine3.15

COPY package.json .
COPY package-lock.json .



COPY . .

RUN npm run build
