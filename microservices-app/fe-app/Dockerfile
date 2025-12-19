FROM node:22-alpine AS build
WORKDIR /app
COPY . .
RUN npm install && npm run build

FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html

COPY public/env.template.js /usr/share/nginx/html/env.template.js

COPY docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh

EXPOSE 80
CMD ["/docker-entrypoint.sh"]