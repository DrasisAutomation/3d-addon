ARG BUILD_FROM=ghcr.io/home-assistant/amd64-base:3.19
FROM $BUILD_FROM

# Install Node.js
RUN apk add --no-cache nodejs npm

WORKDIR /app

COPY package.json ./
RUN npm install

COPY server.js .
COPY run.sh .
COPY 3D ./3D

RUN chmod +x /app/run.sh

CMD ["/app/run.sh"]
