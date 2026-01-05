FROM node:24-slim

WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm install

RUN npm i -g serve

COPY . .

# Accept build arguments
ARG VITE_PARA_API_KEY
ARG VITE_ZYFAI_API_KEY
ARG VITE_ZYFAI_ENVIRONMENT

# Set as environment variables for the build
ENV VITE_PARA_API_KEY=${VITE_PARA_API_KEY}
ENV VITE_ZYFAI_API_KEY=${VITE_ZYFAI_API_KEY}
ENV VITE_ZYFAI_ENVIRONMENT=${VITE_ZYFAI_ENVIRONMENT}

# Increase Node.js heap size for build
ENV NODE_OPTIONS=--max-old-space-size=4096

RUN npm run build

EXPOSE 3000

CMD [ "serve", "-s", "dist" ]