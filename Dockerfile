FROM n8nio/n8n

ENV N8N_BASIC_AUTH_ACTIVE true
ENV N8N_BASIC_AUTH_USER $N8N_BASIC_AUTH_USER
ENV N8N_BASIC_AUTH_PASSWORD $N8N_BASIC_AUTH_PASSWORD
ENV N8N_PROTOCOL=https
ENV N8N_PORT=443
ENV N8N_ENCRYPTION_KEY $N8N_ENCRYPTION_KEY
ENV N8N_CUSTOM_EXTENSIONS /data/custom
ENV DB_TYPE postgresdb

# Set a custom user to not have n8n run as root
USER root

ADD custom /data/custom

# Specifying work directory
WORKDIR /data

# copy start script to container
COPY ./start.sh /

# make the script executable
RUN chmod +x /start.sh

# define execution entrypoint
ENTRYPOINT [ "/start.sh" ]