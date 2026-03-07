ARG BUILD_FROM
FROM $BUILD_FROM

RUN apk add --no-cache nodejs npm

WORKDIR /app

COPY package.json ./
RUN npm install

COPY server.js .
COPY run.sh .
COPY 3D ./3D

RUN chmod +x /app/run.sh

CMD ["/app/run.sh"]