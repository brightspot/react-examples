# react-examples

Collection of React examples demonstrating various Brightspot functionality and use cases.

## Installation

Clone or download this repository. Make sure you have [Docker](https://www.docker.com/) installed. If you do not, follow the instructions on the [Docker Getting Started Page](https://www.docker.com/get-started/) to download Docker for your OS and then install the package to get the Docker daemon up and running on your machine.

You will need [Node](https://nodejs.org/en/) version 16 or higher for these tutorials.

## Running Brightspot

TODO: THIS CONTENT WILL BE UPDATED!!

Clone the react-examples-docker repository. Run `docker/up` to build the Brightspot CMS locally and start a docker instance.
To start and stop the docker instance thereafter run `docker/start` or `docker/stop`. To completely remove the docker instance run `docker/down`. You can also restart the container with `docker/restart`.

Once the docker instance is running, navigate to `http://localhost/cms` in your browser. Login with the username and password of your choosing.

## Installing JS Classes

In a separate terminal window, start at the root of the repository, cd into `<example app directory name>` -> `brightspot`. then run `yarn`. Next, run `npx brightspot login` to login. After logging in, run `npx brightspot types download`. Finally, run `npx brightspot types upload src`. Navigate to the cms (http://localhost/cms) and verify that the content successfully uploaded.

You can verify which content to expect by checking the `src/brightspot/example/<example app directory name>` directory.

Once complete, return to the README for the tutorial to continue.
