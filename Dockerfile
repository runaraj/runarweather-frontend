FROM node:carbon-alpine as builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:alpine
RUN npm install -g serve
WORKDIR /app
COPY --from=builder /app/build /app
EXPOSE 3000
CMD ["serve", "s", "."]