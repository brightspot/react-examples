# Schema Versioning

GraphQL endpoints are versionless, following [best practices](https://graphql.org/learn/best-practices/#versioning) schemas should evolve without breaking changes. However, breaking changes can still occur. As a schema evolves, it is best to have a process to detect changes and any potential problems.

Brightspot stores a record whenever a schema changes that can be viewed in Brightspot. This example demonstrates how to track changes to schemas and compare schema versions programmatically. The front-end application uses [GraphQL Inspector](https://www.the-guild.dev/graphql/inspector/docs/introduction) to view schema changes before updating any code (helping you catch any breaking changes), and also [Codegen](https://www.the-guild.dev/graphql/codegen/docs/getting-started) to generate types based on the most up-to-date schema version.

## What you will learn

1. [Create an endpoint that exposes the schema version data](#1-create-an-endpoint-that-exposes-the-schema-version-data)
2. [Retrieve the schema data](#retrieving-the-schema-version-data)
3. [Compare schema versions programatically](#2-comparing-graphql-schema-versions-via-graphql-inspector)

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

At startup, there is only one schema. GraphQL Inspector requires two schemas in order to run a comparison and detect changes.

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

### Step 2: Download the schema files to compare

Run the following from the [app](app) directory:

```sh
$ yarn schemas
```

```
✨  Done in 0.24s.
```

This downloads two GraphQL files to [schemas](app/schemas) representing the two latest schemas stored in Brightspot.

### Step 3: Compare the schemas

With the two schemas downloaded, the GraphQL Inspector's [Schema Validation]('https://the-guild.dev/graphql/inspector/docs/essentials/diff') tool can be used to compare the two schema versions.

Run the following from the [app](app) directory with `oldSchema.graphql` as the old schema, and `newSchema.graphql` as the new schema:

```
npx graphql-inspector diff ./schemas/oldSchema.graphql ./schemas/newSchema.graphql
```

```sh
Detected the following changes (4) between schemas:

✖  Field description was removed from object type Movie
✔  Field director was added to object type Movie
✔  Field plot was added to object type Movie
✔  Field releaseYear was added to object type Movie
error Detected 1 breaking change
```

## How everything works

The first schema to compare against will be the latest schema that was available when the command `yarn codegen` was executed successfully. This command has been modified in this example to additionally run the script file [getTimeStamp.mjs](app/getTimeStamp.mjs). The script records the time it runs and writes the timestamp to the included [timeStamp](app/schemas/timeStamp.mjs) file.

The second schema will represent the latest changes made to the [Movie view model](brightspot/src/brightspot/example/graphql_schema_versioning/MovieViewModel.ts) that have been uploaded.

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

To filter the required schema versions, the example queries a specific endpoint using its label, organized the retrieved versions by timestamp and queries only for the `timestamp` and `schema` fields. Within the `schema` field, we fetched the `publicUrl` field.

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
      timestamp
      schema {
        publicUrl
      }
    }
  }
}
```

### The yarn schemas script

Once you have the schema version data required, you need to be able to filter the two schemas you want to compare.

This example uses the command `yarn schemas` to run the script [downloadSchemas.mjs](app/downloadSchemas.mjs).

The file calls the [schema versioning endpoint](brightspot/src/brightspot/example/graphql_schema_versioning/SchemaVersioningEndpoint.ts) with the query shown above. It uses the [timeStamp](app/schemas/timeStamp.mjs) file to get the latest schema available when the time stamp was created and the most recent schema available (they can be the same). Lastly, it writes GraphQL files to the [schemas](app/schemas) directory using the URLs from both schemas.

### 3: Compare GraphQL schema versions via GraphQL Inspector

This example uses GraphQL Inspector [schema validation](https://the-guild.dev/graphql/inspector/docs/essentials/diff) to run and display the number of changes and serves to notify whether the front end needs to be updated to address these changes or the schema needs to be updated to restore and deprecate fields that are being used.

Example:

Run the following from the [app](app) directory with `oldSchema.graphql` as the old schema, and `newSchema.graphql` as the new schema:

```

npx graphql-inspector diff ./schemas/oldSchema.graphql ./schemas/newSchema.graphql

```

Output:

```sh
Detected the following changes (4) between schemas:

✖  Field description was removed from object type Movie
✔  Field director was added to object type Movie
✔  Field plot was added to object type Movie
✔  Field releaseYear was added to object type Movie
error Detected 1 breaking change
```

## Try it yourself

Correct the application.

Based on the changes made, in order for the front-end application to work, you can do one of two things:

1. Update the schema to be backwards compatible based on what you have learned.

2. Update the front-end application's to conform to the new changes and display the new fields.

## Troubleshooting

Having issues running the example application? Refer to the [Common Issues](/README.md) section in the repository README for assistance.
