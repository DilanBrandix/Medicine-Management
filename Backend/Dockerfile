FROM node:16.13.2-alpine

# Create app directory
WORKDIR /app

ADD package.json /app/package.json

ADD . /app

RUN npm install

RUN npm run build

EXPOSE 3000:3000


CMD ["npm", "run", "start:prod"]