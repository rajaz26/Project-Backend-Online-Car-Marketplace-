# Base image
FROM node

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy app files
COPY . .

# Expose port
EXPOSE 8800

# Run the app
CMD ["npm", "start"]
