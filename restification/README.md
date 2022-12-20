## GraphQL RESTification

This example will demonstrate how to set up GraphQL Queries into individual REST API Endpoints using the [Brightspot GraphQL API](https://www.brightspot.com/documentation/brightspot-cms-developer-guide/latest/graphql-api).

## What you will learn

1. How to use Brightspot to create REST Mapping API Endpoints along with a potential use case
2. How to still use the GraphQL schema for type generation at build time and runtime without exposing the endpoint to the public

## Running the example application

Refer to the [README](/README.md) at the root of the `react-examples` repository for details on running example applications in depth. Make sure you have the Docker instance for the example applications running, then follow the quick-start steps starting in the `restification` directory:

To upload JS Classes in Brightspot (http://localhost/cms):

```sh
cd brightspot
yarn
npx brightspot types download
npx brightspot types upload src

```

To run the frontend:

```sh
cd app
yarn
yarn codegen
yarn start
```

The front-end application will open automatically in the browser.

## Step 1: Publish Member Content

In Brightspot, publish at least one **Member** content types.

## Step 2 Codegen

From the `restification/app` directory run the following command:

```
yarn codegen
```

The `codegen.yml` file will take the query included in `/queries/AllMembers.graphql` as well as the schema from `http://localhost/graphql/management/members` and will create a `generated.ts` file. This file will contain types and hooks based on the query. The `codegen.yml` file also has access the ID and Secret for authorization.

## Step 3 Building the Query and Create REST Mapping

To see the API in action, navigate to **Developer** &rarr; **GraphQL Explorer** from the menu, and select **Members API: Restification** from the Select GraphQL Endpoint dropdown. In the explorer panel on the left rail you'll see a GraphQL query field named 'brightspot_example_restification_MemberQuery'. Previously in other examples, this would accept arguments of either `id` or `path` but this first query will be to receive all members but restricting the information provided. This will only display the members' display name.

Check the `items` dropdown and check the `displayName` box. The final query should look like this after changing 'MyQuery' to 'AllMemvers':

```graphql
query AllMembers {
  ListOfMembers: brightspot_example_restification_MemberQuery {
    members: items {
      displayName
    }
  }
}
```

Test the query by pressing the execute/play button. Note that we have put in an alias of `ListOfMembers` so that when the data returns, the object will have that key rather than `brightspot_example_restification_MemberQuery`

In the GraphQL Explorer, with the query set up and working, create the first REST Map. Click on the cog on the top right of the GraphQL Explorer page, there should be three options, 'Persisted Query Extension', 'Schema' and finally, select:
'Create REST Mapping'.

Once selected, a pop up form will appear. The form has the sections 'REST Endpoint', 'REST Mapping Name', 'REST Mapping Method(s)', 'REST Mapping Path' and 'GraphQL Query'

The 'REST Endpoint' is new so it will be pre-selected with 'Create New...' Otherwise there would be a selection of Endpoints to choose this new Mapping to belong to.

'REST Mapping Name' Name this 'All Members', leave the 'REST Mapping Method(s)' as a GET request and 'REST Mapping Path' should be auto generated from the name to '/all-members'.

Click on the 'CREATE' button. As this is the first Mapping, there will be a new form titled: 'New REST GraphQL Mapping API'.

Under name, put:
Members API

There are a few things to notice:

After entering the name, the 'Path Prefix' section will automatically generate '/members-api'

As there is only one GraphQL API Endpoint set up in this example, the 'GraphQL Endpoint' section has a dropdown list and 'GraphQL REST API' is currently selected.

Access is set to 'Inherit' which will be based on the Endpoint selected. Change this to 'Anyone'.

Hit save, notice the 'Paths' section at the bottom will have generated:'/members-api/all-members'.

Repeat the process for another query, this time, select the `where` dropdown. This will display two new fields, `arguments` and `predicate`. Click the `$` symbol next to arguments, which will change the query to take in a variable. Next to `predicate` enter the following in the text box 'displayName = ?'. This query will take the `arguments` and look for a display name that matches. This will be a GET that will take parameters and a POST request.

Change the query name to `Member`. The query should look like this:

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

At the bottom of the explorer, pull up the 'QUERY VARIABLES' section and put in the variable, it will look like this:

```json
{
  "arguments": "<Member Display Name Here>"
}
```

Test the query to confirm the results are as expected.

Create the REST Mapping for the query. The form will be auto completed but under 'REST Mapping Method(s)', be sure to select/check 'POST' so that it displays both: GET, POST.

Test the GET endpoint quickly by going into the browser and visiting:
'http://localhost/Members/all-members'
also the GET,POST request as it can be a GET request with params being the display name:
http://localhost/members-api/member?arguments={Member Display Name Here}

## Step 4 Run the React App

Test this in the inluded React App.

CD to the 'app' directory in the terminal and run:

```sh
yarn start
```

Navigate to `http://localhost:3000/` in the web browser and see the text from the published content.

Type in the display name created earlier for the GET with params and POST query.

## Try it yourself

Create some REST endpoints that give more information than this example has demonstrated or change the endpoint to display something other than display names.

## Troubleshooting

Having issues running the example application? Refer to the [Common Issues](/README.md) section in the respository README for assistance.
