FROM node:12.18.1-alpine
WORKDIR /app
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install
COPY . .
CMD ["npm", "start"]