# Define base stage
FROM node:20.18.0-alpine as base
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile
COPY . .

# Define build stage
FROM base as build
RUN yarn build

# Define production stage
FROM node:20.18.0-alpine as prod
WORKDIR /app
COPY --from=base /app/package.json ./ 
COPY --from=base /app/yarn.lock ./ 
COPY --from=build /app/.next ./
RUN yarn install --frozen-lockfile --production

EXPOSE 3000
CMD ["yarn", "start"]
