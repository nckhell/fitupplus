## Docker commands

### Docker CLI

#### Generate the image data

`docker-compose build`

#### Starting up the containers

`docker-compose up -d`

#### Kill all containers

`docker kill $(docker ps -q)`

#### Remove all containers

`docker rm $(docker ps -a -q)`

#### Remove all docker images

`docker rmi $(docker images -q)`

### Artisan (Laravel)

`docker-compose exec php php /var/www/html/artisan migrate`

Hint: If you’re adamant about wanting to ssh directly into a container to execute commands, there is a pretty simple workaround. Running
docker-compose exec {container_name} /bin/sh will open up a persistent connection to the container specified in the {container_name} argument.
