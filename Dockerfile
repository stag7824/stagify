# Dockerfile
FROM node:18-alpine AS builder
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the source code and build the app
COPY . .
RUN npm run build

FROM node:18-alpine
WORKDIR /app

# Copy built assets from the builder stage
COPY --from=builder /app . 

# Set environment variables for production and custom port
ENV NODE_ENV=production
ENV PORT=8080

# Expose port 8080
EXPOSE 8080

# Start the application
CMD ["npm", "run", "start"]