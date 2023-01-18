## GraphQL RESTification

This example will demonstrate how to set up GraphQL queries into individual REST API endpoints using [Brightspot's GraphQL APIs](https://www.brightspot.com/documentation/brightspot-cms-developer-guide/latest/graphql-api).

## What you will learn

1. How to use Brightspot to create REST Mapping API endpoints including a potential use case.
2. How to still use the GraphQL schema for type generation at build time and runtime without exposing the endpoint to the public.

## Running the example application

Refer to the [README](/README.md) at the root of the `react-examples` repository for details on running example applications in depth. Make sure you have the Docker instance for the example applications running, then follow the quick-start steps starting in the `restification` directory:

To upload JS Classes in Brightspot (http://localhost/cms):

```sh
cd brightspot
yarn
npx brightspot types download
npx brightspot types upload src

```

To run the front end:

```sh
cd app
yarn
yarn codegen
yarn start
```

The front-end application opens automatically in the browser.

## Step 1: Publish Member Content

In Brightspot, publish at least one **Member** content type.

## Step 2 Codegen

From the `restification/app` directory run the following command:

```
yarn codegen
```

The `codegen.yml` file will take the query included in `/queries/AllMembers.graphql` as well as the schema from `http://localhost/graphql/management/members` and creates a `generated.ts` file. This file contains types and hooks based on the query. The `codegen.yml` file also has access to the ID and Secret for authorization.

## Step 3 Building the Query and Create REST Mapping

To see the API in action:

1. Open the navigation menu.
2. Scroll to **Developer** area and open the dropdown if needed.
3. Click on **GraphQL Explorer**, and select **Members API: Restification** from the **Select GraphQL Endpoint** dropdown.

In the explorer panel on the left rail you see a GraphQL query field named 'brightspot_example_restification_MemberQuery'.

In previous examples, we would create queries that accept arguments of either id or path; however, in this example, the query we are creating will retrieves all members, restricting the data returned to only members' display name.

Expand the `items` dropdown and click the `displayName` checkbox. Using [aliases](https://graphql.org/learn/queries/#aliases) we will change the name of the field returned for 'brightspot_example_restification_MemberQuery' to 'ListOfMembers' and 'items' to 'members' for clarity.

The final query appears as the following after changing the default'MyQuery' to 'AllMembers':

```graphql
query AllMembers {
  ListOfMembers: brightspot_example_restification_MemberQuery {
    members: items {
      displayName
    }
  }
}
```

To test the query, click the Play icon.

Next, in the GraphQL Explorer, create the first REST Map:

1. Click the Cog icon in the GraphQL Explorer.
2. Select **Create REST Mapping**.

Brightspot displays a pop-up form with the following sections:

- REST Endpoint,
- REST Mapping Name
- REST Mapping Method(s)
- REST Mapping Path' and 'GraphQL Query

The **REST Endpoint** will be pre-selected with 'Create New...'

1. Under **REST Mapping Name**, 'AllMembers' will be pre-populated. This is based on the query name.
2. Under **REST Mapping Method(s)**, ensure that GET request is selected.
3. Under **REST Mapping Path**, ensure that the REST mapping path is automatically generated from the name of '/all-members'.
4. Click **Create**. As this is the first mapping, the GraphQL Explorer creates a new form with the title **New REST GraphQL Mapping API**.
5. Under **Name**, enter 'Members API'.
6. Under Access, select 'Anyone.' Otherwise, access will inherit based on the endpoint used to create the REST mapping(s) from. In this case, a content management endpoint is being used, which always needs a client with an id and secret.
7. Click **Save**.

There are a few things to note:

- After entering the name, the **Path Prefix** section automatically generates '/members-api'
- The **GraphQL Endpoint** section defaults to **GraphQL REST API** if it is the only endpoint. Select **GraphQL REST API** from the dropdown if there are multiple endpoints.
- The **Paths** section at the bottom generates: **/members-api/all-members**.

Repeat the process for another query, this time, select the **where** dropdown. This displays two new fields:

- `arguments`
- `predicate`

1. Check the box for **arguments**.
2. Click the `$` symbol next to arguments, which will change the query to accept a variable.
3. Next to `predicate`, enter 'displayName = ?' in the text box.

This query takes the `arguments` and looks for a display name that matches. This will be a GET request that will take parameters and a POST request.

Change the query name to `Member` as this will be a query for a display name that matches the variable passed into `arguments`. Expand the `items` dropdown to open up options to then check `displayName` and `email`. Add 'members' as an alias for 'items'. Your query looks similar to the following:

```graphql
query Member($arguments: [String]) {
  Member: brightspot_example_restification_MemberQuery(
    where: { predicate: "displayName = ?", arguments: $arguments }
  ) {
    members: items {
      displayName
      email
    }
  }
}
```

At the bottom of the explorer, pull up the 'QUERY VARIABLES' section and put in the variable. Your variable looks similar to the following:

```json
{
  "arguments": "<Member Display Name Here>"
}
```

Test the query to confirm the results are as expected.

Create the REST Mapping for the query. The form will be automatically completed but under 'REST Mapping Method(s)', be sure to select 'POST' so that it displays both GET and POST.

1. Test the GET endpoint by visiting '[http://localhost/members-api/all-members](http://localhost/members-api/all-members)' into your browser.
2. Test the second REST mapping endpoint with a GET request made with the display name as the parameter by visiting 'http://localhost/members-api/member?arguments={Member Display Name Here}' in your browser.

## Step 4 Run the React App

Test the endpoint using the included React App.

From the 'app' directory in the terminal, run:

```sh
yarn start
```

Navigate to `http://localhost:3000/` in the web browser and see the text from the published content.

Type in the display name created earlier for the GET with params and POST request.

## Try it yourself

1. Create some REST endpoints that give more information than this example has demonstrated.
2. Change the endpoint to display something other than display names.

## Troubleshooting

If your REST endpoint is displaying 'INVALID CREDENTIALS'. Be sure that your REST Mapping's **Access** is changed to 'Anyone' rather than 'inherit'.

Having issues running the example application? Refer to the [Common Issues](/README.md) section in the respository README for assistance.
