# react-examples

This repository is a collection of React code examples pertinent to Brightspot front-end development. Each directory within the repo addresses a specific Brightspot feature or use case.

Each directory contains the following:

- `app/`: front-end application
- `brightspot/`: JavaScript classes for Brightspot
- `README.md`: Description of the application, as well as instructions for installing and running it.

After starting Brightspot and your front-end application, refer to the associated `README.md` for further information.

## Requirements for running an example application ✅

- [Node](https://nodejs.org/en/) version 16 or higher
- [Docker](https://docs.docker.com/) and [Docker Compose](https://docs.docker.com/compose/install/)
- [Yarn](https://classic.yarnpkg.com/lang/en/) version 1 (classic)

## Starting Brightspot 🚀

1. Clone the `react-examples` repository.
1. In the root of the repository, run

```sh
docker-compose up
```

Press **Ctrl-C** to stop the docker containers.

## Uploading content to Brightspot 📤

Run the following commands in the appropriate `brightspot/` directory:

```sh
yarn
npx brightspot config server http://localhost/cms
npx brightspot login
npx brightspot types download
npx brightspot types upload src
```

**Note** If there is already a `brightspot.json` file, you can skip the `npx brightspot config server` command.

## Running the front-end application 👟

In the `app/` directory, run one of the following commands:

For React:

```
yarn start
```

For Next.js:

```
yarn dev
```

The front-end application will open automatically in your browser.

## Other helpful Docker commands 💡

- `docker-compose start`: Starts a stopped docker container.
- `docker-compose stop`: Stops container (this command does *not* delete data).
- `docker-compose down`: Deletes container (this command does *not* delete data stored in named volumes).
- `docker-compose up`: to run container without detaching to run it in the background.
- `docker-compose down -v`: Deletes container and volumes (helpful if you need a fresh docker instance).
- `docker volume prune`: Deletes unused volumes.

## Common Issues 🤔

* My endpoint schema has not updated after making changes in the JavaScript class.

   - In Brightspot, navigate to **Admin > APIs**, select the endpoint you have updated, and click **Save**.

* I want to remove all data and start fresh.

   - Use the `docker-compose down -v` command.

* I try to log in using `npx brightspot login`, but a message appears indicating that I am already logged in. However, when I try to upload or download types I am prompted to login again.

   - This is to be expected. You should only encounter this situation if you run `docker-compose down` and then start running docker again. Just follow the terminal prompts (log in if prompted), then re-run the previous command (`npx brightspot types download` or `npx brightspot types upload src`).

* I am getting a `failed to fetch` error in my front-end application.
   - Make sure the Brightspot docker containers are running. If you are using the default command `docker-compose up` to run the containers, check the logs for any possible errors. Try to query for the content using GraphQL Explorer in Brightspot to ensure the GraphQL endpoint is working as expected.
