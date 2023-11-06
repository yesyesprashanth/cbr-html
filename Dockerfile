# Use the official Nginx image as the base image
FROM nginx:latest

# Copy your website template files to the Nginx default HTML directory
COPY ./ /usr/share/nginx/html/

# Expose port 3003
EXPOSE 80