# Stage 1: Build
FROM node:24-alpine AS builder

WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Use npm ci for cleaner, faster install + clear cache to save memory
RUN npm ci --legacy-peer-deps && npm cache clean --force

# Copy source files
COPY . .

# Accept build arguments
ARG VITE_PARA_API_KEY
ARG VITE_ZYFAI_API_KEY
ARG VITE_ZYFAI_ENVIRONMENT
ARG NODE_MAX_OLD_SPACE_SIZE=4096

# Set environment variables for build
ENV VITE_PARA_API_KEY=${VITE_PARA_API_KEY}
ENV VITE_ZYFAI_API_KEY=${VITE_ZYFAI_API_KEY}
ENV VITE_ZYFAI_ENVIRONMENT=${VITE_ZYFAI_ENVIRONMENT}
ENV NODE_OPTIONS=--max-old-space-size=${NODE_MAX_OLD_SPACE_SIZE}

# Build the app
RUN npm run build

# Stage 2: Production
FROM node:24-alpine

WORKDIR /app

# Install serve globally
RUN npm i -g serve && npm cache clean --force

# Copy only the built files from builder stage
COPY --from=builder /app/dist ./dist

EXPOSE 3000

CMD [ "serve", "-s", "dist" ]