# Use official Node.js LTS image based on Alpine for smaller size
FROM node:20-alpine

# Set working directory
WORKDIR /workspace

# Install additional dependencies
RUN apk add --no-cache \
  git \
  bash \
  curl

# Copy package files
COPY package*.json ./dock

# Install dependencies
RUN npm ci

# Copy the rest of the application
COPY . .

# Expose port for Angular dev server
EXPOSE 4200

# Default command
CMD ["npm", "start"]
