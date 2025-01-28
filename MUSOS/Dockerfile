# Use the official Node.js 22 image as the base image
FROM node:22

# Set the working directory
WORKDIR /app

# Install Ionic CLI and React
RUN npm install -g @ionic/cli

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE 8100

# Start the Ionic application
CMD ["ionic", "serve", "--host", "0.0.0.0"]