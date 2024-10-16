
FROM node as build

RUN apt-get update && apt-get install -y git

WORKDIR /app

COPY package*.json /app

RUN npm install

RUN npm install -g @angular/cli

COPY . /app

RUN npm run build --prod --outputPath=./dist/out

#stage 2
FROM nginx

COPY --from=build /app/dist/out/ /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]






#CMD ["ng", "serve", "--host", "0.0.0.0"]