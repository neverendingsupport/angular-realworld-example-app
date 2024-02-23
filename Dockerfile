# Start with a Python 2.7 base image
FROM python:2.7

# Set the working directory in the container
WORKDIR /app

# Install Node.js
# First, add the NodeSource repo for Node.js 12
RUN curl -sL https://deb.nodesource.com/setup_12.x | bash -

# Install Node.js and npm
RUN apt-get update && apt-get install -y nodejs

# Confirm Node.js and npm are installed
RUN node -v
RUN npm -v

# Install Angular CLI globally inside the container
RUN npm install -g @angular/cli@6.2.9

# Copy the project files into the container at /app
COPY . .

# Install any needed packages specified in package.json
RUN npm install

# Build your Angular application
RUN npm run build || exit 1

# Make port 4200 available to the world outside this container
EXPOSE 4200

# Run the app when the container launches
CMD ["ng", "serve", "--host", "0.0.0.0"]
