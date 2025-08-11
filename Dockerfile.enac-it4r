# Build stage
FROM node:22-alpine AS builder

WORKDIR /app

# TODO: create an injectEnv.js to inject environment variables
# dynamically to have only one build

# Accept build arguments with defaults
ARG VITE_APP_NAME=GBDI
ARG VITE_GRAPHQL_API_DOMAIN=https://api.gbdi.io
ARG VITE_WEB_DOMAIN=https://app.gbdi.io
ARG VITE_AUTH_API_DOMAIN=https://api.gbdi.io
ARG VITE_AUTH_API_PATH=/api/auth
ARG VITE_AUTH_WEB_PATH=/auth


# Set environment variables from build args
ENV VITE_APP_NAME=${VITE_APP_NAME}
ENV VITE_GRAPHQL_API_DOMAIN=${VITE_GRAPHQL_API_DOMAIN}
ENV VITE_WEB_DOMAIN=${VITE_WEB_DOMAIN}
ENV VITE_AUTH_API_DOMAIN=${VITE_AUTH_API_DOMAIN}
ENV VITE_AUTH_API_PATH=${VITE_AUTH_API_PATH}
ENV VITE_AUTH_WEB_PATH=${VITE_AUTH_WEB_PATH}

# Copy package files for dependency installation
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build the application (creates ./dist)
RUN npm run build

# Production stage
FROM nginx:1.27-alpine

# Drop default server, add ours
RUN rm -f /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/nginx.conf

# Copy built static files from build stage
COPY --from=builder /app/dist/ /usr/share/nginx/html

EXPOSE 8000
HEALTHCHECK --interval=30s --timeout=3s CMD wget -qO- http://127.0.0.1:8000/health || exit 1
