FROM node:carbon-alpine as builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:alpine
RUN npm install -g serve
RUN npm iinstall -g http-server
WORKDIR /app
COPY --from=builder /app/build /app
EXPOSE 5000
CMD ["serve", "s", "build"]
ENTRYPOINT http-server



