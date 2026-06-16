FROM node:18-alpine
WORKDIR /app
COPY package.json /app/
RUN npm install
COPY . .
EXPOSE 3000
CMD node src/server.js