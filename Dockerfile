FROM node:22-alpine

WORKDIR /effectiveMobile
COPY package.json package-lock.json ./

RUN npm install --production
COPY src ./src
COPY .env.dev .env

ENTRYPOINT ["node", "src/index.js"]

