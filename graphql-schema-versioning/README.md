# Schema Versioning

GraphQL endpoints are versionless, following [best practices](https://graphql.org/learn/best-practices/#versioning) schemas should evolve without breaking changes, but that does not mean breaking changes won't occur. As a schema evolves, it is best to have a process to detect changes and any potential problems.

Brightspot stores a record whenever a schema changes and can be viewed in Brightspot. This example demonstrates how to track changes to schemas and compare schema versions programatically. The front-end application uses [GraphQL Inspector](https://www.the-guild.dev/graphql/inspector/docs/introduction) to view schema changes before updating any code (helping you catch any breaking changes), and also [Codegen](https://www.the-guild.dev/graphql/codegen/docs/getting-started) to generate types based on the most up-to-date schema version.

## What you will learn

1. [Create an endpoint that exposes the schema version data](#1-creating-an-endpoint-that-returns-schema-versions).
2. [Compare schema versions programatically](#2-comparing-graphql-schema-versions-via-graphql-inspector).

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

You can now view graphql-schema-versioning in the browser.
```

## Using the example application

In the beginning there is only one schema. GraphQL Inspector requires two schemas to run a comparison and detect changes.

### Step 1: Creating the second schema

Creating a second updated schema requires changes to the [Movie view model](brightspot/src/brightspot/example/graphql_schema_versioning/MovieViewModel.ts)

Make the following changes:

**_Edit:_** Change the method name `getDescription()` to `getPlot()`:

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

The [schemas](app/schemas) directory now holds two GraphQL files, representing the schemas should you want to manually review the schemas.

> More information on the [download schemas script](#the-command-yarn-schemas-runs-the-script-file-downloadschemasmjs)

### Step 3: Comparing the schemas

With two schemas to compare, we can leverage GraphQL Inspector's [Schema Validation]('https://the-guild.dev/graphql/inspector/docs/essentials/diff') and compare the two schema versions.

Run the following from the [app](app) directory with `codegenSchema.graphql` as the old schema, and `newSchema.graphql` as the new schema:

```
npx graphql-inspector diff ./schemas/codegenSchema.graphql ./schemas/newSchema.graphql
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

The command `yarn codegen` has been modified in this example to additionally run the script file [getTimeStamp.mjs](app/getTimeStamp.mjs). This script records the time it runs and writes the timestamp to the included [timeStamp](app/schemas/timeStamp.mjs) file.

The first schema to compare against will be the latest schema that was available when the command `yarn codegen` was executed successfully.

The second schema will represent the latest changes made to the [Movie view model](brightspot/src/brightspot/example/graphql_schema_versioning/MovieViewModel.ts) that have been uploaded.

### 1: Creating an endpoint that returns schema versions

Brightspot stores the history of all schema changes, this example creates an endpoint that points to that data.

The [SchemaVersioningEndpoint](brightspot/src/brightspot/example/graphql_schema_versioning/SchemaVersioningEndpoint.ts) implements `ContentManagementApiEndpointV1`. The method `getEntryFields` is used to query GraphQL schema versions for all endpoints in this application:

```js
  [`getEntryFields()`](): List<ContentManagementEntryPointField> {
    let schemaClass = new ContentManagementEntryPointField(
      GraphQLSchemaVersion.class,
      true
    )
```

#### The command `yarn schemas` runs the script file [downloadSchemas.mjs](app/downloadSchemas.mjs).

What does the script do?

1. Calls the [schema versioning endpoint](brightspot/src/brightspot/example/graphql_schema_versioning/SchemaVersioningEndpoint.ts) with the query `graphqlSchemaQuery` and uses the credentials stored in the [env](app/.env) file. The query asks for the endpoint with the label **Schema Versioning Movie Endpoint** and sorts them by timestamp in a descending order:

```js
const graphqlSchemaQuery = `
  query Schemas {
    versions: com_psddev_graphql_GraphQLSchemaVersionQuery(
      where: { predicate: "endpoint/getLabel = ?", arguments: "Schema Versioning Movie Endpoint" }
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
`
```

2. Sends the schemas to the `parseSchemaURLS` function that uses the [timeStamp](app/schemas/timeStamp.mjs) file to get the latest schema available when the time stamp was created and the most recent schema available (they can be the same), stores them in their own object, and adds a name key and value.
3. Sends the two schema objects to `downloadSchemas`, which takes the URL in both schemas to open the URL and write GraphQL files to the [schemas](app/schemas) directory, `codegenSchema.graphql` and `newSchema.graphql`.

### 2: Comparing GraphQL schema versions via GraphQL Inspector

The GraphQL Inspector runs and displays the number of changes. If there are no breaking changes, it returns a 'success' message. If there are breaking changes, it returns an ERROR message that serves as a warning that the front end needs to be updated to address these changes or the schema needs to be updated to restore and deprecate the field.

Example:

Run the following from the [app](app) directory with `codegenSchema.graphql` as the old schema, and `newSchema.graphql` as the new schema:

```
npx graphql-inspector diff ./schemas/codegenSchema.graphql ./schemas/newSchema.graphql
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

1. Update the schema based on what you have learned to restore the field that was removed.
2. Update the front-end application's [query](app/src/components/MoviesQuery.graphql) to run Codegen and the [Movie Component](app/src/components/Movie.tsx) to display the new fields.

## Troubleshooting

Having issues running the example application? Refer to the [Common Issues](/README.md) section in the repository README for assistance.
