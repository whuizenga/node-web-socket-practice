FROM node:16.7.0 AS client-deps

WORKDIR /app

COPY ./package.json /app/package.json
COPY ./yarn.lock /app/yarn.lock
RUN yarn install

FROM client-deps

COPY . /app

EXPOSE 3000

CMD ["yarn", "start"]