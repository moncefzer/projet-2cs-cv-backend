FROM ghcr.io/puppeteer/puppeteer:21.6.0

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome-stable


WORKDIR /usr/src/app

COPY package.json ./
RUN npm install -g npm@10.2.5
RUN npm cache clean --force
COPY . .
CMD [ "node", "index.js" ]
