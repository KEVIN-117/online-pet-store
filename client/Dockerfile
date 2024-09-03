# Define base stage
FROM node as base
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# Define test stage -:> running all tests 
FROM base as test
RUN npm run test

# Define build stage -:> building the app
FROM base as build
RUN npm run build

# Define production stage -:> running the app
FROM base as prod
COPY --from=base /app/package.json /app/package-lock.json ./
RUN npm install --production
EXPOSE 3000
CMD ["npm", "run", "start"]

# Define app stage -:> running the app
FROM nginx:alpine as app
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]