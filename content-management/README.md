# Content Management
In this tutorial, you will learn how to use a Content Management API Endpoint provided by Brightspot to power a frontend application.

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## What you will learn
1. How to create a Content Management API endpoint with Brightspot's JS Classes
2. How to create a front-end application with [Next.js](https://nextjs.org/), [Apollo Client](https://www.apollographql.com/docs/react/), and [GraphQl Code Generator](https://www.the-guild.dev/graphql/codegen/docs/getting-started) that can perform all CRUD operations

## Running the example application
Refer to the [README](/README.md) at the root of the `react-examples` repository for details on running example applications in depth. If you have run an example application before, make sure you have the docker instance for the example applications running, then follow the quick-start steps:

brightspot (`http://localhost/cms`):

```
cd brightspot
yarn
npx brightspot types download
npx brightspot types upload src

```

frontend:

```
cd app
yarn
yarn codegen
yarn dev
```

The frontend application will open automatically in the browser.

## Using the example application
You can start with the frontend application. Click on the form at the top of the dashboard to create a new Note. Make sure to enter the Username that you are using in Brightspot (the name you logged in with). After creating your Note, you should see it appear in the dashboard. Confirm in Brightspot that the Note is also listed on the dashboard. You should see your Username avatar next to the Note.

## How everything works
Brightspot makes it possible to create content that you can then query for using the GraphQL API. One GraphQL API Brightspot offers is the Content Management API (CMA). Refer to the Brightspot documentation for more information.

Navigate to `brightspot/src/examples/content_management`. This directory contains the JS Classes files that are uploaded to Brightspot.

#### JS Classes Files:
- `NotesEndpoint.ts`: the class that create a custom CMA Endpoint with the following configurations:
   - `getEntryFields`: specify the class(es) to determine the schema for the custom endpoint
- `NotesEndpointClient.ts`: the class that creates an API Client. The API Client has a client ID and API Key that are stored in the `app/.env` file to access the CMA Endpoint

> **_Note_** A CMA Endpoint requires an API Client with an client ID and API Key. Normally, this is created by an admin editorially in Brightspot. For convenience, an API Client has been generated programatically.
#### Queries:
All queries are located in `app/queries`:

- `GetNotes.graphql`: either query for notes ("\* matches ?") given certain arguments or pass in other filter options (ex: "not \_id matches ?") with arguments.
- `CreateAndUpdateNote.graphql`: either create a new note (if no id is provided) or update an existing one
- `DeleteNote.graphql`: delete a note by id - add `permanently: true` to delete without archiving.

[GraphQl Code Generator](https://www.the-guild.dev/graphql/codegen/docs/getting-started) is used to generate code from the GraphQl schema based on the content uploaded to Brightspot. This helps makes development faster and more consistent since queries, mutations, hooks etc are already typed. If you update your GraphQL query files, be sure to run `yarn codgen` to update your generated files (found in the `app/generated` directory).

#### API Routes
All GraphQL queries are made using [API Routes](https://nextjs.org/docs/api-routes/introduction) provided by Next.js. Navigate to `pages/api/notes` to see how the GraphQL query requests are made. By using the API Routes, the client Id and API key are kept from being a part of the front-end bundle for increased security.

> **_Note_** This application is for demonstration purposes only. In a production-level application, you would want to implement authentication. Although this application requires a username for creating new content and updating content in the frontend, further authentication would be needed.

## Try it yourself
The following are suggestions for further exploration:

1. Change one field in a note in the frontend (example, change the title of a note). In Brightspot, change the description of that same note. Refresh both the frontend and Brightspot. What do those fields display?

2. Remove `permanently: true` from the `DeleteNote.graphql` query (be sure to run `yarn codegen`!). Now try deleting that note, then navigate to Brightspot dashboard. Select `Note` for Content Type, then Status: Archived. Do you see the note you deleted?
## Troubleshooting

1. I am getting getting a 401 network error on initial page load in the browser for the frontend...

   - Verify that the Notes Endpoint API Client Client ID and API Key (found in Brightspot: Menu Button -> `Admin` -> `APIs` -> `Clients`) are the same values that are in the `app/.env` file.

2. I get an error when trying to create or update a Note: "Variable 'toolUser' has an invalid value"....
   - Verify the the Username you entered in the New Note Form or note Card is a Username in Brightspot.

Having other issues running the example application? Refer to the [Common Issues](/README.md) section in the respository README for assistance.
