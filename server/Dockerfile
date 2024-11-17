FROM node:20.18.0-alpine

WORKDIR /app

COPY package.json ./

COPY yarn.lock ./

RUN npm install

COPY . .

RUN npx prisma generate

RUN npm run build


EXPOSE $PORT

CMD ["node", "dist/main.js"]