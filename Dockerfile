#Use the official Ngnix image as the base image 
FROM nginx:latest

#Copy your website template files to the Ngnix default HTML directory
COPY ./ /usr/share/ngnix/html/

EXPOSE 3003

