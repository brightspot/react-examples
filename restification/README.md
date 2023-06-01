## GraphQL RESTification

Scenarios could arise where your client-side application is not inherently equipped to handle GraphQL or has already been architected with a GraphQL API but there may be an operational requirement or a privacy concern that necessitates limiting or restricting the volume, scope, or type of data that is sent for public use.

GraphQL Restification involves converting a GraphQL API into a RESTful API. This means replacing a single GraphQL endpoint with multiple RESTful endpoints, each representing a distinct resource or data object.

This example demonstrates how to set up GraphQL queries into individual REST API endpoints.

## What you will learn

1. [Use Brightspot to create REST Mapping API endpoints](#1-create-rest-mapping-api-endpoints).
2. Use the GraphQL schema for type generation at build time and runtime without exposing the endpoint to the public.

## Running the example application

> **_Note_** Just starting? Refer to the [README](/README.md) at the root of the `react-examples` repository for details on running example applications in depth.

### Install dependencies

Run the following command from the `restification/app` directory:

```sh
$ yarn
```

```
[1/4] 🔍 Resolving packages...
[2/4] 🚚 Fetching packages...
[3/4] 🔗 Linking dependencies...a
[4/4] 🔨 Building fresh packages...
✨ Done in 6.03s.
```

Run the following commands to start up the front-end application:

```sh
$ yarn codegen
```

```
✔ Parse Configuration
❯ Generate outputs
✔ Parse Configuration
✔ Generate outputs
✨  Done in 0.89s.
```

```
$ yarn start
```

```
Compiled successfully!
```

The front-end application will not function correctly until the steps are completed.

## Step 1: Publish Member Content

In Brightspot, publish at least one **Member** content type.

## Step 2 Building the Query and Create REST Mapping

In Brightspot from the menu **&#x2630;**, navigate to **Developer** &rarr; **GraphQL Explorer** and select **Members API: Restification** from the **Select GraphQL Endpoint** dropdown.

In the explorer panel on the left pane you see a GraphQL query field named **brightspot_example_restification_MemberQuery**.

In this example, the query created retrieves all members, restricting the data returned to only the members' display name.

Expand the **items** dropdown and check the **displayName** checkbox. Using [aliases](https://graphql.org/learn/queries/#aliases), change the name of the field returned for **brightspot_example_restification_MemberQuery** to **ListOfMembers** and **items** to **members** for clarity.

The final query following changing the default **MyQuery** to **AllMembers**:

```graphql
query AllMembers {
  ListOfMembers: brightspot_example_restification_MemberQuery {
    members: items {
      displayName
    }
  }
}
```

To test the query, click the play/execute button.

#### 1. Create REST mapping API endpoints

After testing the query, create the first REST Map, click the Cog icon in the GraphQL Explorer (located on the right hand side of the page) and select **Create REST Mapping**.

Brightspot displays a pop-up form with the following sections:

- **REST Endpoint**
- **REST Mapping Name**
- **REST Mapping Method(s)**
- **REST Mapping Path**
- **GraphQL Query**

The **REST Endpoint** will be pre-selected with **Create New...**

1. Under **REST Mapping Name**, **AllMembers** will be pre-populated. This is based on the query name.
2. Under **REST Mapping Method(s)**, ensure that **GET** request is selected.
3. Under **REST Mapping Path**, ensure that the REST mapping path is automatically generated from the name of **/all-members**.
4. Click **Create**. As this is the first mapping, the GraphQL Explorer creates a new form with the title **New REST GraphQL Mapping API**.
5. Under **Name**, enter 'Members API'.
6. Under Access, select **Anyone**. Otherwise, access will inherit based on the endpoint used to create the REST mapping(s) from. In this case, a content management endpoint is being used, which always needs a client with an id and secret.
7. Click **Save**.

> - After entering the name, the **Path Prefix** section automatically generates **/members-api**
> - The **GraphQL Endpoint** section defaults to **GraphQL REST API** if it is the only endpoint. Select **GraphQL REST API** from the dropdown if there are multiple endpoints.
> - The **Paths** section at the bottom generates: **/members-api/all-members**.

Repeat the process for another query, this time, select the **where** dropdown. This displays two new fields:

- **arguments**
- **predicate**

Check the box for **arguments**, check the **$** symbol next to arguments which changes the query to accept a variable. Next to **predicate**, type in the text box 'displayName = ?'.

This query takes the `arguments` and looks for a display name that matches. This will be set up as a GET request that will take parameters and a POST request.

Change the query name to `Member` as this will be a query for a display name that matches the variable passed into `arguments`. Expand the **items** dropdown to open the dropdown fields, then check **displayName** and **email**. Add 'members' as an alias for 'items':

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

## Step 3 Run the React App

Test the endpoint using the included React App.

From the 'app' directory in the terminal, run:

```sh
yarn start
```

Navigate to `http://localhost:3000/` in the web browser and see the text from the published content.

Type in the display name created earlier for the GET with params and POST request.

## How everything works

Running:

```sh
yarn codegen
```

The `codegen.yml` file will take the query included in `restification/app/queries/AllMembers.graphql` as well as the schema from `http://localhost/graphql/management/members` and creates a `generated.ts` file. This file contains types and hooks based on the query. The `codegen.yml` file also has access to the ID and Secret for authorization.

## Try it yourself

Create some REST endpoints that give more information than this example has demonstrated.

## Troubleshooting

If your REST endpoint is displaying 'INVALID CREDENTIALS'. Be sure that your REST Mapping's **Access** is changed to 'Anyone' rather than 'inherit'.

Having issues running the example application? Refer to the [Common Issues](/README.md) section in the repository README for assistance.
