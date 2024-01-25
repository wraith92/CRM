# Stage 1: Build the application
FROM node:16 AS build
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --force

# Copy the rest of the project files
COPY . .

# Build the React application
RUN npm run build

# Stage 2: Serve the application with Nginx
FROM nginx:alpine

# Copy the build output to Nginx's serve directory
COPY --from=build /usr/src/app/build /usr/share/nginx/html

# Create a new configuration file for Nginx to listen on port 3000
RUN echo "server {\n\
  listen 3000;\n\
  location / {\n\
    root   /usr/share/nginx/html;\n\
    index  index.html index.htm;\n\
    try_files \$uri /index.html;\n\
  }\n\
  error_page   500 502 503 504  /50x.html;\n\
  location = /50x.html {\n\
    root   /usr/share/nginx/html;\n\
  }\n\
}" > /etc/nginx/conf.d/default.conf

# Expose port 3000
EXPOSE 3000

# Start Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
