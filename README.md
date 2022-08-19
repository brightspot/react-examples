# react-examples

This repository is a collection of React examples demonstrating various Brightspot functionality and use cases.

Each example application directory is comprised of the following:

- `app`: frontend application
- `brightspot`: JS Classes for Brightspot
- `README.md`: Explanation and instructions for the example app

After starting Brightspot (see the instructions below), refer to the README located in the example application directory of your choice for further information on uploading JS Classes and running the frontend application.

## Requirements for running example applications

- [Node](https://nodejs.org/en/) version 16 or higher
- [Docker](https://docs.docker.com/) and [Docker Compose](https://docs.docker.com/compose/install/)

## Starting Brightspot

1. Clone the `react-examples` repository.
2. In the root of the repository, run

```
docker-compose up -d
```

Other helpful docker-compose commands:

`docker-compose start`: start container
`docker-compose stop`: stop container
`docker-compose down`: delete container
`docker-compose up`: to run container without detaching to run it in the background
`docker-compose down -v`: delete container and volumes
