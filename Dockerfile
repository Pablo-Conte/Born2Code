FROM node:16.17.0

WORKDIR /usr/app

COPY package.json ./

RUN npm install

COPY . /usr/app/

EXPOSE 7000

CMD ["yarn", "init:dev"]