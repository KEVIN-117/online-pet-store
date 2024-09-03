FROM bitnami/laravel:latest as base
WORKDIR /app
COPY . .

# Define test stage
FROM base as test
RUN composer install
RUN php artisan test

# Define build stage
FROM base as build
RUN composer install
RUN php artisan config:cache
RUN php artisan route:cache
RUN php artisan view:cache

# Define production stage
FROM base as prod
COPY --from=build /app /app
EXPOSE 3000
CMD ["php", "artisan", "serve"]
