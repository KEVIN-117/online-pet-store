# Define base stage
FROM node as base
WORKDIR /app
COPY yarn.lock package.json ./
RUN yarn install
COPY . .

# Define test stage -:> running all tests 
FROM base as test
RUN yarn test

# Define build stage -:> building the app
FROM base as build
RUN yarn build

# Define production stage -:> running the app
FROM base as prod
COPY --from=base /app/package.json ./
COPY --from=base /app/yarn.lock ./

RUN yarn install
RUN yarn build

COPY --from=build /app/.next ./.next



EXPOSE $PORT

CMD ["sh", "-c", "yarn dev -p $PORT"]