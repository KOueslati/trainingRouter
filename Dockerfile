# base image
FROM node:14.9.0-alpine as node

# This WORKDIR command will create the working directory in our docker image.
# going forward any command will be run in the context of this directory
WORKDIR /usr/src/app

# This COPY command will copy package.json and package-lock.json
# from our current directory to the root of our working directory
# inside a container which is /usr/src/app
COPY package.json package-lock.json ./

# This RUN command will restore node_modules define in our package.json
RUN npm install

# This COPY command copies all the files from our current directory to the container working directory.
# this will copy all our source files.

COPY . .
# This command will build our angular project in production mode
# and create production ready files in dist/SampleApp folder.
RUN npm run build

# This line will create a second stage nginx container
# where we will copy the compiled output from our build stage.
FROM nginx:latest

COPY nginx.conf /etc/nginx/nginx.conf

WORKDIR /usr/share/nginx/html

#This is the final command of our docker file.
# This will copy the compiled angular app from builder stage path /usr/src/app/dist/SampleApp/ to nginx container.
COPY --from=node /usr/src/app/dist/ .