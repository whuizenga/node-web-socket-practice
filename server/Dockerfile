FROM node:16.7.0 AS server-deps

WORKDIR /workspace

COPY ./package.json /workspace/package.json
COPY ./yarn.lock /workspace/yarn.lock
RUN yarn install

FROM server-deps

COPY . /workspace

EXPOSE 3005

CMD ["yarn", "start-dev"]