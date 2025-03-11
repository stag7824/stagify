# Use a lightweight Node.js base image
FROM node:lts-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy your application code
COPY . .

# Expose port
EXPOSE 3000

# Start the application 
CMD [ "npm", "run", "dev" ]