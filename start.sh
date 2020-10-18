#!/bin/sh

# extract the protocol
pg_proto="`echo $DATABASE_URL | grep '://' | sed -e's,^\(.*://\).*,\1,g'`"
# remove the protocol
pg_url=`echo $DATABASE_URL | sed -e s,$pg_proto,,g`

# extract the user and password (if any)
pg_userpass="`echo $pg_url | grep @ | cut -d@ -f1`"
pg_pass=`echo $pg_userpass | grep : | cut -d: -f2`
if [ -n "$pg_pass" ]; then
    pg_user=`echo $pg_userpass | grep : | cut -d: -f1`
else
    pg_user=$pg_userpass
fi

# extract the host -- updated
pg_hostport=`echo $pg_url | sed -e s,$pg_userpass@,,g | cut -d/ -f1`
pg_port=`echo $pg_hostport | grep : | cut -d: -f2`
if [ -n "$pg_port" ]; then
    pg_host=`echo $pg_hostport | grep : | cut -d: -f1`
else
    pg_host=$pg_hostport
fi

# extract the path (if any)
pg_path="`echo $pg_url | grep / | cut -d/ -f2-`"

export DB_POSTGRESDB_DATABASE=$pg_path
export DB_POSTGRESDB_HOST=$pg_host
export DB_POSTGRESDB_PORT=$pg_port
export DB_POSTGRESDB_USER=$pg_user
export DB_POSTGRESDB_PASSWORD=$pg_pass

export N8N_HOST="$APP_NAME.herokuapp.com"
export VUE_APP_URL_BASE_API="https://$APP_NAME.herokuapp.com/"
export WEBHOOK_TUNNEL_URL="https://$APP_NAME.herokuapp.com/"

if [ -z ${PORT+x} ]; then echo "PORT variable not defined, leaving N8N to default port."; else export N8N_PORT=$PORT; echo "N8N will start on '$PORT'"; fi

n8n start