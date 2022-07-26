# Using a Content Management API Endpoint

In this tutorial, you will learn how to use a Content Management API Endpoint provided through the Brightspot CMS to power a frontend application.

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Installation and Running

Refer to [README.md](https://github.com/brightspot/react-examples/blob/cma-next/README.md) at the root of the react-examples directory.

Once Brightspot is running, login to the CMS using any credentials at: `localhost/cms`.


## GraphQL Content Management API (CMA) Endpoint

For this tutorial, a CMA Endpoint `hello` and a HelloWorld content type has been created: `/graphql/management/hello`.

You can also create a CMA Endpoint editorially - refer to the instructions found in [CMA_Endpoint.md](CMA_Endpoint.md). You will need to make one additional configuration if you want to query for a toolUser: add `com.psddev.cms.db.ToolUser` to the Read Types when you create your CMA endpoint (paste directly into the Read Types dropdown menu and then make sure that type and the Hello World type are checked).

| Add Tool User Type |
| --- |
| <img width="1421" alt="Tool User Type" src="https://user-images.githubusercontent.com/58481829/180973153-1d10fe85-330f-44ff-944b-9e4a3c134277.png"> |

## API Client

In the CMS, click on the burger menu then select APIs under Admin. Select New API Client under Clients. Input hello world for the name, and for endpoints select Custom Management API Endpoint. Click on the clipboard icon next to Client ID and save that ID for future use. Click Add API Key under Keys to generate a unique API Key (you will only be able to see this once so make sure to copy it and save for future use). Click Save to save your new API Client.

| Create API Client |
| --- |
| <img width="1783" alt="Create API Client" src="https://user-images.githubusercontent.com/58481829/176060181-039f5900-503c-4e0b-9cf4-ec58881845e6.png">|

Now you can use your GraphQL CMA endpoint to perform CRUD operations.

## Using GraphQL queries and mutations in a Next.js Application


Change directories to `cma-next/app`. Add the following `.env` file in this directory:

```
NEXT_PUBLIC_HOST=http://localhost:3000
GRAPHQL_URL=http://localhost/graphql/management/hello
GRAPHQL_CLIENT_ID=<your client id>
GRAPHQL_CLIENT_SECRET=<your client secret>
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=hello
```

Run the following commands in your terminal:

```bash
yarn && yarn run dev
```
Go to `http://localhost:3000` in your browser. You will see a login page. Login with your user name (the name you used to login to Brightspot). You will be redirected to the Hello World dashboard. You will be able to perform all CRUD applications using this dashboard. 

All GraphQL queries are located in the `cma-next/app/queries` directory. All api routes for using these queries are located in the `cma-next/app/pages/api` directory. 

This application use [Next Auth](https://next-auth.js.org/) for authentication and shows a simple example of how that can be implemented. This is only a starter example. Refer to the Next Auth documentation for more advanced implementation. 
