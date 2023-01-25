
FROM node:16-alpine

WORKDIR ./app

COPY . .

RUN npm install

RUN cd client && npm install

CMD ["npm", "run", "dev"]

