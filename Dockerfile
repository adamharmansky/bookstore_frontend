FROM node as build
WORKDIR /home/node
COPY . .
RUN npm install
RUN npm run build

FROM nginx
RUN rm /usr/share/nginx/html/index.html
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /home/node/build /usr/share/nginx/html
