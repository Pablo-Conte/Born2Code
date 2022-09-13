FROM node:16.17.0

WORKDIR /usr/app

COPY package.json ./

RUN npm install

COPY . /usr/app/

EXPOSE 7000

CMD ["npm", "run", "init-dev"]