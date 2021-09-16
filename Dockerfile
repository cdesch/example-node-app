FROM node:14-alpine

WORKDIR /app

# COPY package.json package-lock.json ./
COPY package.json yarn.lock ./

# RUN npm install --production
RUN yarn install

COPY . .

EXPOSE 3000

CMD node app.js