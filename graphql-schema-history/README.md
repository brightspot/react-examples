# Schema History

GraphQL endpoints are versionless, so clients can request data without specifying a specific version number. While it is [recommended](https://graphql.org/learn/best-practices/#versioning) to evolve schemas without introducing breaking changes, it is still possible for such changes to occur. Therefore, it is important to have a process in place for detecting changes and potential problems as the schema evolves.

Brightspot stores each version of a schema in a record, so you can trace a schema's history. This example demonstrates how to track changes to schemas and compare schema history programmatically. The front-end application uses [GraphQL Inspector](https://www.the-guild.dev/graphql/inspector/docs/introduction) to view schema changes before updating any code (helping you catch any breaking changes), and also uses [Codegen](https://www.the-guild.dev/graphql/codegen/docs/getting-started) to generate types based on the most recent schema.

## What you will learn

1. [Create an endpoint that exposes the schema history data](#step-1-create-an-endpoint-that-exposes-the-schema-history-data)
1. [Retrieve the schema data](#step-2-retrieve-the-schema-history-data)
1. [Compare schema versions programmatically](#step-3-compare-graphql-schema-versions-via-graphql-inspector)

## Running the example application

**Note** Just starting? Refer to the [README](/README.md) at the root of the `react-examples` repository for details on running example applications.

### Get Original Schema URL

Before comparing schemas, you will need to have the original schema. Go to your Brightspot instance in your browser navigate to **☰** &rarr; **Developer** &rarr; **GraphQL Explorer**. Select the **Movie Endpoint** first, to load the schema. Then change to **Schema History Endpoint** and copy and paste the following query:

```
query Schemas {
  versions: com_psddev_graphql_GraphQLSchemaVersionQuery(
    where: { predicate: "endpoint/getLabel = ?", arguments: "Movie Endpoint" }
    sorts: { order: descending, options: "timestamp" }
  ) {
    items {
      schema {
        publicUrl
      }
    }
  }
}
```

The return data will look similar to the following:

```
{
  "data": {
    "versions": {
      "items": [
        {
          "schema": {
            "publicUrl": "http://localhost/storage/42/4e/2e875f164f479330294112cad4ea/movie-endpoint-01-01-2023-00-00-00-edt.graphql"
          }
        }
      ]
    }
  }
}
```

Copy the "publicUrl" value - the URL of the first schema - and paste it in the [.env](./app/.env#l3) file as the value for **GRAPHQL_SDL_URL**.

This ensures the original schema will always be the same when running codegen and is configured to return the same version received with an [introspection query](https://graphql.org/learn/introspection/) bound by the same introspection query rules.

### Install dependencies

Run the following command from the `graphql-schema-history/app/` directory:

```sh
yarn
```

Wait until a message similar to `✨ Done in 5.03s` appears.

Run the following commands to start up the front-end application:

```sh
yarn codegen
```

Wait until a message similar to `✨ Done in 0.83s` appears.

```sh
yarn start
```

You can now view schema history in the browser.

## Using the example application

At startup, there is one generated schema named `originalSchema.graphql` in the `app/schemas/` directory. GraphQL Inspector requires two schemas in order to run a comparison and detect changes.

### Step 1: Generate the second schema

Brightspot's GraphQL APIs are generated dynamically based on your content type definitions. If you remove a field from your content type, the corresponding field in the GraphQL schema will also be removed.

Make the following arbitrary changes to the [Movie view model](brightspot/src/brightspot/example/schema_history/MovieViewModel.ts):

Change the method name `getDescription()` to `getPlot()`:

```js
@JavaMethodParameters()
@JavaMethodReturn(String)
getPlot(): string {
  return this.model.description
}
```

Uncomment the code under the `Add New Fields` comment:

```js
@JavaMethodParameters()
@JavaMethodReturn(Number)
getReleaseYear(): number {
  return this.model.releaseYear
}

@JavaMethodParameters()
@JavaMethodReturn(String)
getDirector(): string {
  return this.model.director
}
```

Upload your Brightspot types once again. The app generates another schema and adds it to Brightspot's schema history. This new schema is the current version.

### Step 2: Compare the schemas

Run the following from the `app/` directory:

```sh
yarn compare-schemas
```

Wait until a message similar to `✨ Done in 0.24s` appears.

This command compares the endpoint's current schema against `originalSchema.graphql`.

Example Output:

```graphql
[
  {
    type: 'FIELD_ADDED',
    criticality: { level: 'NON_BREAKING' },
    message: "Field 'director' was added to object type 'Movie'",
    meta: {
      typeName: 'Movie',
      addedFieldName: 'director',
      typeType: 'object type'
    },
    path: 'Movie.director'
  },
  {
    type: 'FIELD_ADDED',
    criticality: { level: 'NON_BREAKING' },
    message: "Field 'plot' was added to object type 'Movie'",
    meta: {
      typeName: 'Movie',
      addedFieldName: 'plot',
      typeType: 'object type'
    },
    path: 'Movie.plot'
  },
  {
    type: 'FIELD_ADDED',
    criticality: { level: 'NON_BREAKING' },
    message: "Field 'releaseYear' was added to object type 'Movie'",
    meta: {
      typeName: 'Movie',
      addedFieldName: 'releaseYear',
      typeType: 'object type'
    },
    path: 'Movie.releaseYear'
  },
  {
    type: 'FIELD_REMOVED',
    criticality: {
      level: 'BREAKING',
      reason: 'Removing a field is a breaking change. It is preferable to deprecate the field before removing it.'
    },
    message: "Field 'description' was removed from object type 'Movie'",
    meta: {
      typeName: 'Movie',
      removedFieldName: 'description',
      isRemovedFieldDeprecated: false,
      typeType: 'object type'
    },
    path: 'Movie.description'
  }
]
✨  Done in 1.00s.
```

## How everything works

### Step 1: Create an endpoint that exposes the schema history data

The file [SchemaHistoryEndpoint.ts](brightspot/src/brightspot/example/schema_history/SchemaHistoryEndpoint.ts) implements a content management API (CMA) endpoint. The method `getEntryFields` is used to query GraphQL schema history for all endpoints in this application:

To expose the schema history to an endpoint, `GraphQLSchemaHistory` must be added as an entry field.

```typescript
  [`getEntryFields()`](): List<ContentManagementEntryPointField> {
    let schemaClass = new ContentManagementEntryPointField(
      GraphQLSchemaHistory.class,
      true
    )
```

### Step 2: Retrieve the schema history data

Write a query that returns the schema versions you want to compare. The following example queries a specific endpoint using its label, organizes the retrieved history by timestamp, and requires the `schema` field and the `publicUrl` field underneath. The `publicUrl` field is integral as this is where the schema itself is stored.

```graphql
query Schemas {
  versions: com_psddev_graphql_GraphQLSchemaHistoryQuery(
    where: { predicate: "endpoint/getLabel = ?", arguments: "Movie Endpoint" }
    sorts: { order: descending, options: "timestamp" }
  ) {
    items {
      schema {
        publicUrl
      }
    }
  }
}
```

### Step 3: Compare GraphQL schema versions via GraphQL Inspector

Once you have the schema history data, filter for the schema you want to compare against the original (`originalSchema.graphql`), available once codegen was executed successfully. The following example uses the command `yarn compare-schemas` to run the script [compareSchemas.mjs](app/compareSchemas.mjs).

The file calls the [schema history endpoint](brightspot/src/brightspot/example/schema_history/SchemaHistoryEndpoint.ts) with the query shown above. It grabs the first schema in the collection (as this is the latest), and compares it against the [original](app/schemas/originalSchema.graphql) using [GraphQL-Inspectors programmatic API](https://the-guild.dev/graphql/inspector/docs/api/schema#programmatic-api).

## Try it yourself

Based on the changes made, in order for the front-end application to work, you need to provide one of the following updates:

* Update the schema to be backwards compatible based on what you have learned.

   - Add a `plot` field to the data model [Movie](brightspot/src/brightspot/example/schema_history/Movie.ts).
   - Update the [Movie view model](brightspot/src/brightspot/example/schema_history/MovieViewModel.ts) to restore the `getDescription` method, deprecate the field, and add a new field `getPlot`.

* Update the front-end application to conform to the new changes and display the new fields.

   - Update the query [MoviesQuery](app/src/components/MoviesQuery.graphql) by removing the field `description` as it is no longer in the schema. Add fields `plot`, `director`, and `releaseYear`.
   - Update the [Movie](app/src/components/Movie.tsx) component so that it no longer shows `description` but does show `plot`. Optionally add the two new fields available (`director` and `releaseYear`).

## Troubleshooting

Having issues running the example application? Refer to the [Common Issues](/README.md) section in the repository README for assistance.
