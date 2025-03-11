# Stage 1: Build the application
FROM node:18-alpine AS builder

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Stage 2: Serve the application using a lightweight server
FROM node:18-alpine

# Install 'serve' to serve the build directory
RUN npm install -g serve

# Set the working directory
WORKDIR /app

# Copy the build files from the previous stage
COPY --from=builder /app/dist ./dist

# Set the default command to serve the application
CMD ["serve", "-s", "dist", "-l", "3000"]

# Expose port 3000
EXPOSE 3000