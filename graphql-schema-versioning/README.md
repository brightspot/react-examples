# Schema Versioning

GraphQL endpoints are versionless, following [best practices](https://graphql.org/learn/best-practices/#versioning) schemas should evolve without breaking changes. However, breaking changes can still occur. As a schema evolves, it is best to have a process to detect changes and any potential problems.

Brightspot stores a record whenever a schema changes that can be viewed in Brightspot. This example demonstrates how to track changes to schemas and compare schema versions programmatically. The front-end application uses [GraphQL Inspector](https://www.the-guild.dev/graphql/inspector/docs/introduction) to view schema changes before updating any code (helping you catch any breaking changes), and also [Codegen](https://www.the-guild.dev/graphql/codegen/docs/getting-started) to generate types based on the most up-to-date schema version.

## What you will learn

1. [Create an endpoint that exposes the schema version data](#1-create-an-endpoint-that-exposes-the-schema-version-data)
2. [Retrieve the schema data](#2-retrieve-the-schema-version-data)
3. [Compare schema versions programatically](#3-compare-graphql-schema-versions-via-graphql-inspector)

## Running the example application

> **_Note_** Just starting? Refer to the [README](/README.md) at the root of the `react-examples` repository for details on running example applications in depth.

### Install dependencies

Run the following command from the `graphql-schema-versioning/app` directory:

```sh
$ yarn
```

```
[1/4] 🔍 Resolving packages...
[2/4] 🚚 Fetching packages...
[3/4] 🔗 Linking dependencies...
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

You can now view graphql-schema-versioning in the browser.

## Using the example application

At startup, there is one schema. You can view this schema [here](app/schemas/originalSchema.graphql). GraphQL Inspector requires two schemas in order to run a comparison and detect changes.

### Step 1: Create the second schema

To change the schema and create a new schema version, make the following arbitrary changes to the [Movie view model](brightspot/src/brightspot/example/graphql_schema_versioning/MovieViewModel.ts):

**Edit:** Change the method name `getDescription()` to `getPlot()`:

```js
  @JavaMethodParameters()
  @JavaMethodReturn(String)
  getPlot(): string {
    return this.model.description
  }
```

Uncomment the following methods:

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

Upload your Brightspot types once again. This will create another schema and will be the most up-to-date version.

### Step 2: Compare the schemas

Run the following from the [app](app) directory:

```sh
$ yarn compare-schemas
```

```
✨  Done in 0.24s.
```

This gets the latest schema and compares it against the [original](app/schemas/originalSchema.graphql).

Example Output:

```gql
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

### 1: Create an endpoint that exposes the schema version data

The [SchemaVersioningEndpoint](brightspot/src/brightspot/example/graphql_schema_versioning/SchemaVersioningEndpoint.ts) implements a content management api (CMA) endpoint. The method `getEntryFields` is used to query GraphQL schema versions for all endpoints in this application:

To expose the schema history to an endpoint, `GraphQLSchemaVersion` must be added as an entry field.

This example uses a Content Management API Endpoint (CMA) since the schema data is intended for use by internal developers.

```js
  [`getEntryFields()`](): List<ContentManagementEntryPointField> {
    let schemaClass = new ContentManagementEntryPointField(
      GraphQLSchemaVersion.class,
      true
    )
```

### 2: Retrieve the schema version data

Firstly, you need to write a query that returns the schema versions you want to compare.

To filter the required schema versions, the example queries a specific endpoint using its label, organized the retrieved versions by timestamp and queries only for the `schema` field, within the `schema` field, the `publicUrl` field.

The `publicUrl` field is integral as this is where the schema itself is stored.

The Schema Versions query:

```graphql
query Schemas {
  versions: com_psddev_graphql_GraphQLSchemaVersionQuery(
    where: {
      predicate: "endpoint/getLabel = ?"
      arguments: "Schema Versioning Movie Endpoint"
    }
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

### 3: Compare GraphQL schema versions via GraphQL Inspector

Once you have the schema version data required, you need to be able to filter the schema you want to compare against the [original](app/schemas/originalSchema.graphql), available once codegen was executed successfully.

This example uses the command `yarn compare-schemas` to run the script [comepareSchemas.mjs](app/comepareSchemas.mjs).

The file calls the [schema versioning endpoint](brightspot/src/brightspot/example/graphql_schema_versioning/SchemaVersioningEndpoint.ts) with the query shown above. It grabs the first schema in the collection as this is the latest and compares it against the [original](app/schemas/originalSchema.graphql) using [GraphQL-Inspectors programmatic API](https://the-guild.dev/graphql/inspector/docs/api/schema#programmatic-api).

## Try it yourself

Correct the application.

Based on the changes made, in order for the front-end application to work, you can do one of two things:

1. Update the schema to be backwards compatible based on what you have learned.

2. Update the front-end application to conform to the new changes and display the new fields.

## Troubleshooting

Having issues running the example application? Refer to the [Common Issues](/README.md) section in the repository README for assistance.
