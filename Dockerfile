FROM node:14-alpine as base

RUN mkdir /app
WORKDIR /app

# COPY package.json package-lock.json ./
COPY package.json yarn.lock ./

# Install Dependencies
RUN yarn install

COPY . .

EXPOSE 3000

CMD node app.js