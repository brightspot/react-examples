# react-examples
Collection of React examples demonstrating various Brightspot functionality and use cases.


## Installation
Clone or download this repository. Make sure you have [Docker](https://www.docker.com/) installed. If you do not, follow the instructions on the [Docker Getting Started Page](https://www.docker.com/get-started/) to download Docker for your OS and then install the package to get the Docker daemon up and running on your machine.

You will need [Node](https://nodejs.org/en/) version 16 for these tutorials.


## Running Brightspot
Change directories (cd) to the tutorial directory of your choice. Then cd into `brightspot/brightspot-server/<tutorial directory name>`. To initialize the docker instance, run `docker/up`. To start and stop the docker instance thereafter run `docker/start` or `docker/stop`. To completely remove the docker instance run `docker/down`. You can also restart the container with `docker/restart`.

Once the docker instance is running, navgiate to `http://localhost/cms` in your browser. Login with the username and password of your choosing. 
