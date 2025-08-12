# Build stage
FROM node:22-alpine AS builder

WORKDIR /app

# Copy package files for dependency installation
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build the application (creates ./dist)
RUN npm run build

# Production stage
FROM nginx:stable-alpine-slim

# Remove default nginx config
RUN rm /etc/nginx/conf.d/default.conf

# Copy nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Copy built static files from build stage
COPY --from=builder /app/dist/ /usr/share/nginx/html

EXPOSE 8000

# Create app directory for entrypoint to dynamically inject env variables
COPY entrypoint.sh /usr/share/nginx/html/entrypoint.sh
ENTRYPOINT ["/usr/share/nginx/html/entrypoint.sh"]

# Start nginx in foreground
CMD ["nginx", "-g", "daemon off;"]

HEALTHCHECK --interval=30s --timeout=3s CMD wget -qO- http://127.0.0.1:8000/health || exit 1
