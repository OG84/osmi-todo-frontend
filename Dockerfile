FROM node as build-env
LABEL author Christian Götze
COPY . /usr/app
WORKDIR /usr/app

RUN yarn
RUN yarn build-prod

FROM nginx as runtime-env
WORKDIR /usr/app
COPY --from=build-env /usr/app/nginx.conf /usr/local/nginx/conf
COPY --from=build-env /usr/app/dist/osmi-todo-frontend .

EXPOSE 80
ENTRYPOINT [ "nginx", "-g", "deamon off" ]
