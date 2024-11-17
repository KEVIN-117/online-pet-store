FROM node:20.18.0-alpine

WORKDIR /app

COPY package.json ./

COPY yarn.lock ./

RUN npm install

COPY . .

RUN npm run build

RUN npx prisma generate

EXPOSE $PORT

CMD ["node", "dist/main.js"]