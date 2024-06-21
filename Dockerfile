# Use the official Node.js image as the base image
FROM node:14

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json files to the working directory
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the project files to the working directory
COPY . .

# Expose the port the app runs on
EXPOSE 6060

# Add node_modules/.bin to PATH
ENV PATH /app/node_modules/.bin:$PATH

# Command to run the Vue.js application
CMD ["npm", "run", "serve", "--", "--port", "6060", "--host", "0.0.0.0"]
