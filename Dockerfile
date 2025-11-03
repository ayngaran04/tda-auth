#use an official node.js runtime as a parent image
 FROM node:22-alpine

 #set the working directory in the container
 WORKDIR /app

 #copy package.json and package-lock.json to the working directory
 COPY package*.json .

 #install dependencies
 RUN npm install

#copy the rest of the application code to the working directory
COPY . .

#expose the port the app runs on
EXPOSE 5003

#DEFINE the command to run the application
CMD ["node", "./src/server.js"]