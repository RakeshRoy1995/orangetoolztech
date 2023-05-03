FROM node:18-alpine

WORKDIR /usr/ekshop/api/orangeToolz/

ARG NODE_ENV
ENV NODE_ENV $NODE_ENV

COPY package*.json /usr/ekshop/api/orangeToolz/
RUN npm install

COPY . /usr/ekshop/api/orangeToolz/

ENV PORT 5000
EXPOSE $PORT
CMD [ "npm", "start" ]
