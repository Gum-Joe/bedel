# Docker file to run bedel
FROM ubuntu:latest
# Install curl & git
RUN apt-get update && apt-get install -y curl && apt-get install -y git
# Create our user
RUN adduser --disabled-password --gecos '' bedel sudo
# Make into default user
USER bedel
