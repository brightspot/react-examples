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

In previous examples, queries accept arguments of either id or path; however, in this example, the query retrieves all members, restricting the data returned to only members' display name.

Expand the `items` dropdown and click the `displayName` checkbox. The final query should look like this after changing 'MyQuery' to 'AllMembers':

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

> **Note:** Because you enter an alias of `ListOfMembers`, the object has that key rather than `brightspot_example_restification_MemberQuery` when the data is returned.

In the GraphQL Explorer, create the first REST Map.

Click the Cog icon in the GraphQL Explorer. Three options display:

1. Persisted Query Extension
2. Schema
3. Create REST Mapping

Select **Create REST Mapping**.

Brightspot displays a pop-up form with the following sections:

- REST Endpoint,
- REST Mapping Name
- REST Mapping Method(s)
- REST Mapping Path' and 'GraphQL Query

The **REST Endpoint** will be pre-selected with 'Create New...'

1. Under **REST Mapping Name**, enter 'All Members'.
2. Under **REST Mapping Method(s)**, ensure that GET request is selected.
3. Under **REST Mapping Path**, ensure that the REST mapping path is automatically generated from the name of '/all-members'.
4. Click **Create**. As this is the first mapping, the GraphQL Explorer creates a new form with the title **New REST GraphQL Mapping API**.
5. Under **Name**, enter 'Members API'.
6. Under Access, select 'Anyone.' Otherwise, Access will inherited based on the selected endpoint.
7. Click **Save**.

There are a few things to note:

- After entering the name, the 'Path Prefix' section will automatically generate '/members-api'
- As there is only one GraphQL API Endpoint set up in this example, the 'GraphQL Endpoint' section has a dropdown list and 'GraphQL REST API' is currently selected.
- The **Paths** section at the bottom will have generated: **/members-api/all-members**.

Repeat the process for another query, this time, select the **where** dropdown. This displays two new fields:

- `arguments`
- `predicate`

1. Click the `$` symbol next to arguments, which will change the query to accept a variable.
2. Next to `predicate`, enter 'displayName = ?' in the text box.

This query takes the `arguments` and looks for a display name that matches. This will be a GET request that will take parameters and a POST request.

Change the query name to `Member`. Your query looks similar to the following:

```graphql
query Member($arguments: [String]) {
  Member: brightspot_example_restification_MemberQuery(
    where: { predicate: "displayName = ?", arguments: $arguments }
  ) {
    items {
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

Create the REST Mapping for the query. The form will be automatically completed but under 'REST Mapping Method(s)', be sure to check 'POST' so that it displays both GET and POST.

1. Test the GET endpoint by entering '[http://localhost/members-api/all-members](http://localhost/members-api/all-members)' into your browser.
2. Test the second REST mapping endpoint with a GET request made with the display name as the parameter by entering 'http://localhost/members-api/member?arguments={Member Display Name Here}'

## Step 4 Run the React App

Test this in the included React App.

From the 'app' directory in the terminal, run:

```sh
yarn start
```

Navigate to `http://localhost:3000/` in the web browser and see the text from the published content.

Type in the display name created earlier for the GET with params and POST query.

## Try it yourself

Create some REST endpoints that give more information than this example has demonstrated or change the endpoint to display something other than display names.

## Troubleshooting

Having issues running the example application? Refer to the [Common Issues](/README.md) section in the respository README for assistance.
