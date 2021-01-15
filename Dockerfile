FROM node:14

RUN  apt-get update \
  && apt-get install -y libreoffice

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci --only=production

COPY . .

RUN npm run build

EXPOSE 3002

HEALTHCHECK --interval=1m --timeout=3s \
  CMD curl -f localhost:3002/api/health || exit 1

CMD [ "npm", "run", "start:prod" ]
