FROM node:14-alpine

WORKDIR /usr/src/app

COPY package*.json ./

# Install dependancies with npm
RUN npm install

# Copy all files
COPY . .

RUN npm run build

EXPOSE 3000

CMD [ "node", "dist/main" ]
