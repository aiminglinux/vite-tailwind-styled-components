# Use Node.js 16 as the base image
FROM node:16 AS builder

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app
COPY . .

# Build the app
RUN npm run build

# Use a lightweight Node.js 16 image for production
FROM node:16-alpine

# Set the working directory
WORKDIR /app

# Copy the built app from the builder image
COPY --from=builder /app/dist .

# Install serve for serving the app
RUN npm install -g serve

# Start the app with serve
CMD ["serve", "-s", "."]