# Notes

In this tutorial, you will learn how to use a Content Management API Endpoint provided by Brightspot to power a frontend application.

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

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
yarn dev
```

The frontend application will open automatically in the browser.

## Using the example application

You can start with the frontend application. Click on the form at the top of the dashboard to create a new Note. Make sure to enter the Username that you are using in Brightspot (the name you logged in with). After creating your note, you should see it appear in the dashboard. Confirm in Brightspot that the note is also listed on the dashboard. You should see your Username avatar next to the note.

## How everything works

Brightspot makes it possible to create content that you can then query for using the GraphQL API. One GraphQL API Brightspot offers is the Content Management API (CMA). Refer to the Brightspot documentation for more information.

Navigate to `brightspot/src/examples/notes`. This directory contains the JS Classes files that are uploaded to Brightspot.

#### JS Classes Files:

- `Note.ts`: the model (class) that contains the business logic (fields, etc)
- `NotesEndpoint.ts`: the class that create a custom CMA Endpoint with the following configurations:
  - `getEntryFields`: specify the class(es) to determine the schema for the custom endpoint
  - `updateCorsConfiguration`: permit cross-origin resource sharing (CORS) to enable requests from localhost
  - `getPaths`: specify the path(s) to send HTTP requests to (this path is added to `app/.env`)
  - `Singleton`: create a 'one and only' instance of the custom endpoint
- `NotesEndpointClient.ts`: the class that creates an API Client. The API Client has a client ID and API Key that are stored in the `app/.env` file to access the CMA Endpoint

#### Queries:

All queries are located in `app/queries/index.ts`:

- `GET_NOTES`: either query for notes ("\* matches ?") given certain arguments or pass in other filter options (ex: "not \_id matches ?") with arguments.
- `CREATE_AND_UPDATE_NOTE`: either create a new note (if no id is provided) or update an existing one
- `DELETE_NOTE`: delete a note by id - add `permanently: true` to delete without archiving.

#### API Routes

All GraphQL queries are made using the dynamic api routing provided by Next.js. Navigate to `pages/api/notes` to see how the GraphQL query requests are made.

> **_Note_** This application is for demonstration purposes only. In a production-level application, you would want to implement authentication. Although this application requires a Username for creating new content and updating content in the frontend, further authentication would be needed.

## Try it yourself

The following are suggestions for further exploration:

1. Change one field in a note in the frontend (example, change the title of a note). In Brightspot, change the description of that same note. Refresh both the frontend and Brightspot. What do those fields display?

2. Set the `limit` in the `GET_NOTES` query to a smaller number (like 2). Create more than 2 notes and see how server-side pagination is used.

3. Remove `permanently: true` from the `DELETE_NOTE` query. Now try deleting that note, then navigate to Brightspot dashboard. Select `Note` for Content Type, then Status: Archived. Do you see the note you deleted?

4. Test out the detailed error messages that the Brightspot GraphQL API provides. Remove one letter from a query in `app/queries/index.ts`. Notice the error message that displays.

## Troubleshooting

1. I am getting getting the following error on initial page load in the browser for the frontend: "Response not successful: Received status code 401"....

   - Verify that the Notes Endpoint API Client Client ID and API Key (found in Brightspot: Menu Button -> `Admin` -> `APIs` -> `Clients`) are the same values that are in the `app/.env` file.

2. I get an error when trying to create or update a Note: "Variable 'toolUser' has an invalid value"....
   - Verify the the Username you entered in the New Note Form or note Card is a Username in Brightspot.

Having other issues running the example application? Refer to the [Common Issues](/README.md) section in the respository README for assistance.
