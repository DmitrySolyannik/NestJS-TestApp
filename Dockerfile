FROM node:12.13-alpine
COPY . /app
WORKDIR /app
RUN npm install
CMD ["npm", "run", "start:dev"]
