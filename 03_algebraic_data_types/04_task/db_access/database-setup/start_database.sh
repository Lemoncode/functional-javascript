CONTAINER=$1
PORT=$2
echo starting environment tests running docker ${CONTAINER}

if [ ! "$(docker ps -q -f name=${CONTAINER})" ]; then
  if [ "$(docker ps -aq -f status=exited -f name=${CONTAINER})" ]; then
    # Cleanup
    echo "Deleting previous stopped container ${CONTAINER}"
    docker rm -fv ${CONTAINER}
  fi

  # Run your container
  docker run \
    -d \
    -p ${PORT}:5432 \
    --name ${CONTAINER} \
    -e "POSTGRES_USER=postgres" \
    -e "POSTGRES_PASSWORD=postgres" \
    postgres:10.4

  # Ping postgres before initialize database
  HEALTHCHECK=$(docker exec $CONTAINER pg_isready > /dev/null 2>&1; echo $?)
  while [ $HEALTHCHECK -ne 0 ]; do
    echo "Waiting for postgres to start..."
    HEALTHCHECK=$(docker exec $CONTAINER pg_isready > /dev/null 2>&1; echo $?)
    sleep 1
  done

  # Initialize database
  docker exec -i $CONTAINER psql -U postgres < ./init_db.sql
fi

echo environment up and running