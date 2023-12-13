# DockerFile for the flutter app.
# The Dockerfile is used to build the APK file for the app.

# Use the official image as a parent image
#If not working run docker pull ghcr.io/cirruslabs/flutter:3.16.3
FROM ghcr.io/cirruslabs/flutter:3.16.3

# Set the working directory.
WORKDIR /usr/src/

# Copy the file from your host to your current location.
COPY . /usr/src/

RUN flutter pub get

# When we will have a logo
#RUN dart run flutter_launcher_icons:main

# Run the command inside your image filesystem.
RUN flutter build apk --release

RUN mkdir /usr/src/app-release

# Copy the file from your host to your current location only on build
RUN cp ./build/app/outputs/apk/release/app-release.apk /usr/src/app-release/
