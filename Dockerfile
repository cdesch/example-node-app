FROM node:14-alpine as base

RUN mkdir /app
WORKDIR /app

# COPY package.json package-lock.json ./
COPY package.json yarn.lock ./

# Install Dependencies
RUN yarn install

FROM base as builder

# Copy files
COPY . .
RUN yarn build

# FROM node:14-alpine as deployment
# RUN mkdir /app
# WORKDIR /app
# COPY --from=builder /app/node_modules ./
# COPY --from=builder /app/dist ./
# COPY --from=builder /app/package.json ./

EXPOSE 3000
CMD yarn serve