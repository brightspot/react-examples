# Using a Content Management API Endpoint

In this tutorial, you will learn how to use a Content Management API Endpoint provided through the Brightspot CMS to power a frontend application.

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Installation and Running

Refer to root [README.md](react-examples/README.md) at the root of the react-examples directory.

Once Brightspot is running, login to the CMS using any credentials at: `localhost/cms`.

## GraphQL Content Management API (CMA) Endpoint

For this tutorial, a CMA Endpoint `App Endpoint(CMA)` and a Note content type has been created: `/graphql/management/notes` to make the setup process easier.

You can also create a CMA Endpoint editorially - refer to the instructions found in [CMA_Endpoint.md](CMA_Endpoint.md).

If you create a CMA endpoint editorially, you will need to make one additional configuration if you want to query for a toolUser: add `com.psddev.cms.db.ToolUser` to the Read Types when you create your CMA endpoint (paste directly into the Read Types dropdown menu and then make sure that type and the Note type are checked).

## API Client

For this tutorial, an API Client is provided and therefore no further setup is needed.

However, you can create your own as well. In the CMS, click on the burger menu then select APIs under Admin. Select New API Client under Clients. Input a name of your choice, and for endpoints select App Endpoint. Click on the clipboard icon next to Client ID and save that ID for future use. Click Add API Key under Keys to generate a unique API Key (you will only be able to see this once so make sure to copy it and save for future use). Click Save to save your new API Client.

Now you can use your GraphQL CMA endpoint to perform CRUD operations.

## Using GraphQL queries and mutations in a Next.js Application

Change directories to `notes/app`. If you did not make a new API Client and are using the one pre-generated, you can skip this step.

If you did create a new API Client in the CMS, add your Client ID and Client Secret in their respective fields in the `.env` file in this directory:

```
NEXT_PUBLIC_HOST=http://localhost:3000
GRAPHQL_URL=http://localhost/graphql/management/notes
GRAPHQL_CLIENT_ID=<your client id>
GRAPHQL_CLIENT_SECRET=<your client secret>
```

Run the following commands in your terminal:

```bash
yarn && yarn dev
```

Go to `http://localhost:3000` in your browser to see the Notes dashboard. You will be able to perform all CRUD applications using this dashboard. After creating or editing notes, check the CMS to verify that your username is showing next to the Notes you created or edited.

> **_Note_** This application is for demonstration purposes only. In a production-lvel application, you need to implement authentication. Although this application requires a User name for creating new content and updating content in the frontend, further authentication would be needed.
