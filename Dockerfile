# Use an official Node.js runtime as the base image
FROM node:18-alpine

ARG REDIS_HOST
ENV REDIS_HOST=$REDIS_HOST

ARG REDIS_PORT
ENV REDIS_PORT=$REDIS_PORT

ARG OPENSEA_API_KEY
ENV OPENSEA_API_KEY=$OPENSEA_API_KEY

# Create app directory
WORKDIR /usr/src/app

# Copy application dependency manifests to the container image.
# A wildcard is used to ensure copying both package.json AND package-lock.json (when available).
# Copying this first prevents re-running npm install on every code change.
COPY --chown=node:node package*.json ./

# Install dependencies
RUN npm ci

# Bundle app source
COPY --chown=node:node . .

# Build the Next.js app
RUN npm run build

# Set NODE_ENV environment variable
ENV NODE_ENV production

USER node

# Expose the port that Next.js runs on
EXPOSE 3000

# Run the Next.js app
CMD [ "node", "dist/main.js" ]