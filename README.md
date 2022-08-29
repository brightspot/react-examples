# react-examples

This repository is a collection of React examples demonstrating various Brightspot functionality and use cases.

Each example application directory is comprised of the following:

- `app`: frontend application
- `brightspot`: JS Classes for Brightspot
- `README.md`: Explanation and instructions for the example app

After starting Brightspot and your frontend application, refer to the README located in the example application directory for further information.

## Requirements for running an example application ✅

- [Node](https://nodejs.org/en/) version 16 or higher
- [Docker](https://docs.docker.com/) and [Docker Compose](https://docs.docker.com/compose/install/)

## Starting Brightspot 🚀

1. Clone the `react-examples` repository.
2. In the root of the repository, run

```
docker-compose up
```

Enter `CTRL c` to stop the docker containers.

## Uploading Content to Brightspot 📤

JS Classes make it possible to create and modify Brightspot CMS content with JavaScript (TypeScript).

Run the following commands in the example application `brightspot` directory:

```
yarn
npx brightspot config server http://localhost/cms
npx brightspot login
npx brightspot types download
npx brightspot types upload src
```

> **_Note_** If there is already a `brightspot.json` file you can skip the `npx brightspot config server` command.

## Running the frontend application 👟

Run `yarn` in the example application `app` directory. The command for starting the app differs for React and Next.js applications:

React:

```
yarn start
```

Next.js:

```
yarn dev
```

The frontend application will open automatically in your browser.

## Other helpful Docker commands 💡

- `docker-compose start`: start a stopped docker container
- `docker-compose stop`: stop container (this command does NOT delete data)
- `docker-compose down`: delete container (this command does NOT delete data stored in named volumes)
- `docker-compose up`: to run container without detaching to run it in the background
- `docker-compose down -v`: delete container and volumes (helpful if you need a fresh docker instance)
- `docker volue prune`: delete unused volumes

## Common Issues 🤔

1. My endpoint schema has not updated after making changes in the JS Class.

   - In the CMS, navigate to `Admin`, `APIs`, select the endpoint you have updated, and click `SAVE`.

2. I want to remove all data and start fresh.

   - Use the `docker-compose down -v` command.

3. I try to login using `npx brightspot login` but a message appears that I am already logged in. However, when I try to upload or download types I am prompted to login again.

   - This is to be expected. You should only encounter this situation if you run `docker-compose down` and then start running docker again. Just follow the terminal prompts (i.e. login if prompted), then re-run the previous command (`npx brightspot types download` or `npx brightspot types upload src`).

4. I am getting a `failed to fetch` error in my frontend application.
   - Make sure you have the Brightspot docker container running. If you are using the default command, `docker-compose up` to run the container, check the logs for any possible errors. Finally, try to query for the content using GraphQL Explorer in the CMS to make sure the CMS successfully provides data.
