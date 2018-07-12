# FROM node:carbon-alpine as builder
# WORKDIR /app
# COPY package*.json ./
# RUN npm install
# COPY . .
# RUN npm run build

# FROM node:alpine
# RUN npm install -g serve
# RUN npm install -g http-server
# WORKDIR /app
# COPY --from=builder /app/build /app
# EXPOSE 5000
# CMD ["serve", "s", "build"]
# ENTRYPOINT http-server


# base image
FROM node:9.6.1

# set working directory
RUN mkdir /app
WORKDIR /app

# install and cache app dependencies
COPY package*.json ./
RUN npm install
RUN npm install react-scripts@1.1.1 -g
COPY . .
EXPOSE 3000

# start app
CMD ["npm", "start"]