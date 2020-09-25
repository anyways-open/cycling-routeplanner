FROM mhart/alpine-node:13 AS build
WORKDIR /app
COPY . .

# To handle 'not get uid/gid'
RUN npm config set unsafe-perm true

RUN npm install
RUN npm run build

# production environment
FROM nginx:stable-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]