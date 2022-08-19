# Brightspot with React, Apollo Client, and GraphQL

This example highlights how simple it is to use the [Brightspot GraphQL API](https://www.brightspot.com/documentation/brightspot-cms-developer-guide/latest/graphql-api) for generating a GraphQL Content Delivery API endpoint (CDA). Simply create an endpoint (`brightspot/src/brightspot/example/hello_graphql_apollo_cda/HelloGraphqlEndpoint.ts`), and add the path for the endpoint to your frontend(`app/.env`).

## Getting Started

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

You will need [Docker](https://docs.docker.com/) and Docker Compose to run the Brightspot CMS. If you install Docker Desktop/Toolbox for Windows or Mac, Docker Compose is also [installed](https://docs.docker.com/get-started/08_using_compose/). If you are on a linux machine, you will need to [install](https://docs.docker.com/compose/install/) Docker Compose.

Make sure you are in the root of the react-examples repository, and run

```
docker-compose up
```

To stop the docker instance, enter `CTRL + C`.

To remove the instance:

```
docker-compose down
```

Once your Docker instance is running, follow the [instructions](../brightspot/README.md) for uploading JS Classes to your Brightspot instance.

Once the development server is running, CD into `hello-graphql-apollo-cda/app` and run the following commands:

```
yarn && yarn start
```

Navigate to `http://localhost:3000` in your browser to see the result.

## Publish CMS Content

Publish a Hello World item in the CMS. Enter the permalink generated when you publish the HelloWorld in your frontend application.
