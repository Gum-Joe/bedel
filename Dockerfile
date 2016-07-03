# Docker file to run bedel
FROM ubuntu:latest
# Install curl & git
RUN apt-get update &&\
 apt-get install -y curl && \
 apt-get install -y nodejs npm git
# Create our user
RUN adduser --shell /bin/bash --disabled-password --gecos '' bedel &&\
 adduser --shell /bin/bash --disabled-password --gecos '' bedel sudo
# Make into default user
USER bedel
# Environment
ENV NODE_ENV development
# Install nvm & the latest nodejs version
RUN curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.31.2/install.sh | bash
# Invoke nvm to install node
# From http://stackoverflow.com/questions/25899912/install-nvm-in-docker
RUN cp -f ~/.nvm/nvm.sh ~/.nvm/nvm-tmp.sh; \
    echo "nvm install stable; nvm alias default stable" >> ~/.nvm/nvm-tmp.sh; \
    sh ~/.nvm/nvm-tmp.sh; \
    rm ~/.nvm/nvm-tmp.sh;
# Copy -> ~/bedel
COPY . /home/bedel/bedel
WORKDIR /home/bedel/bedel
# Install packages
RUN npm install
# Run
CMD bin/bedel server --color --debug
