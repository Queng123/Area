# DockerFile for the NestJS API
# Use the official image as a parent image.

FROM node:lts-alpine

# Set the working directory.
WORKDIR /usr/src/app

# Copy the file from your host to your current location.
COPY package.json ./

#Update the system
RUN apk update && apk upgrade

#Update node
RUN npm install npm@latest -g

# Run the command inside your image filesystem.
COPY . /usr/src/app/

RUN npm install

# Inform Docker that the container is listening on the specified port at runtime.
EXPOSE 8080

# Run the specified command within the container USE env var MODE to set the mode
CMD npm run start:$MODE --watch
