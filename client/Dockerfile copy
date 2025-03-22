FROM node:22-alpine AS base
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

FROM base AS dev
COPY . /app
COPY . .
RUN ls /app
RUN yarn build

FROM base AS prod
COPY --from=base /app/node_modules ./node_modules
COPY --from=dev /app/.next ./.next
COPY --from=dev /app/public ./public
# COPY --from=dev /app/next.config.js ./next.config.js

CMD ["yarn", "start"]
