FROM node:16

ENV NODE_ENV=production

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 7000

CMD ["npm", "run", "dev"]