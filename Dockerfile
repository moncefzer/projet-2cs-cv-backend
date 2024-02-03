# Use the specified Puppeteer image from GitHub Container Registry
FROM ghcr.io/puppeteer/puppeteer:21.6.0

# Set environment variables for Puppeteer
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome-stable

# Set the working directory within the container
WORKDIR /usr/src/app

# Copy package.json to the working directory
COPY package*.json ./

# Install a specific version of npm globally
RUN npm ci

# Clean npm cache to reduce image size
RUN npm cache clean --force

# Copy the entire project files into the container's working directory
COPY . .

# Set permissions on /usr/src/app/public
RUN chmod -R 777 /usr/src/app/public

# Set the default command to run the Node.js application (index.js)
CMD [ "node", "index.js" ]
