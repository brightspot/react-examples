# GraphQL Schema Versioning

GraphQL schemas should evolve without breaking changes, but that does not mean breaking changes won't occur. As a schema evolves, it is best to have a process to detect any potential problems. Following [best practices](https://graphql.org/learn/best-practices/#versioning), GraphQL endpoints are versionless.

This example demonstrates Brightspot's ability to monitor changes to GraphQL schemas and compare schema versions. The front-end application uses [GraphQL Inspector](https://www.the-guild.dev/graphql/inspector/docs/introduction) to view schema changes before updating to avoid breaking changes and [Codegen](https://www.the-guild.dev/graphql/codegen/docs/getting-started) to generate types based on the most up-to-date schema version.

## What you will learn

1. [Compare schema versions using GraphQL Inspector](#1-viewing-and-comparing-graphql-schema-versions-via-graphql-inspector).

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

Run the following command to start up the front-end application:

```sh
$ yarn codegen
$ yarn start
```

## Step 1: Publish movie content

In Brightspot, publish at least one **Movie**.

## Step 2: Load schema versions

Since schema versions are lazily loaded, a call has to be made to the endpoint for the new schema to load. To do this start the front-end application or refresh the front-end application (if it is running).

The schema versions are now loaded.

## Step 3: Update the schema / view model

Run the front-end application to confirm that the published **Movie** content renders (if it is already running, refresh the browser).

Make the following changes to the **Movie** view model located at `graphql-schema-versioning/brightspot/src/brightspot/example/graphql_schema_versioning/MovieViewModel.ts` :

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

Upload your Brightspot types once again. Once uploaded, restart the front-end application (or refresh the browser if it is still running) to load the schema versions. The front-end application will break, we will be shown why.

## Step 4: Download schemas

Run the following:

```sh
$ yarn schemas
```

```
✨  Done in 0.24s.
```

The `graphql-schema-versioning/app/schemas` directory will now hold two GraphQL files representing the schemas should you want to manually review the schemas.

## Step 5: Update the front-end application

Based on the changes made, update the query in the front-end application for Codegen to get the correct fields and types.

Update the `Movie.tsx` component to display the new fields and change 'description' to 'plot':

`graphql-schema-versioning/app/src/components/MoviesQuery.graphql`:

```
query Movies {
  AllMovies {
    movies {
      title
      plot
      releaseYear
      director
    }
  }
}
```

`graphql-schema-versioning/app/src/components/Movie.tsx`:

```ts
import { Movie } from '../generated'

interface MovieProp {
  movie: Movie | null
}

const MovieComponent = ({ movie }: MovieProp) => (
  <div className="movie-card">
    <h1>{movie?.title}</h1>
    <h2>{movie?.plot}</h2>
    <img
      className="movie-image"
      src="https://img.freepik.com/premium-vector/movie-camera-vector-icon-isolated-object-white-background_661273-89.jpg"
      alt="movie"
    />
    <h3>{movie?.releaseYear}</h3>
    <h3>{movie?.director}</h3>
  </div>
)

export default MovieComponent
```

From the `graphql-schema-versioning/app` directory run:

```sh
$ yarn codegen
```

```
✔ Parse Configuration
❯ Generate outputs
✔ Parse Configuration
✔ Generate outputs
✨  Done in 1.01s.
```

The `graphql-schema-versioning/app/src/generated.ts` file will now contain the new schema and field types. As a result, the front-end application can run again with no errors.

## Step 6: Compare schema versions

To view why the front-end application broke, run the following with `codegenSchema.graphql` as the old schema, and `newSchema.graphql` as the new schema:

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

Changing and uploading the view model as shown in above will cause the schema to change, creating a new version that will be loaded once a call is made to the endpoint.

This example has two endpoints:

1. **Schema Versioning Movie Endpoint** is used in the front-end application with a query to get all movie content data.
2. **Schema Versioning Endpoint**, which can be seen navigating to **Navigation menu** &rarr; **Admin** &rarr; **APIs**, on the left rail labeled **Schema Versioning Endpoint**. This endpoint requires credentials and is used with a query to get all schema versions for the **Schema Versioning Movie Endpoint**.

The command `yarn codegen` also runs a script file `getTimeStamp.mjs`, located at `graphql-schema-versioning/app/getTimeStamp.mjs`. This script records the time it runs and writes the timestamp to the `graphql-schema-versioning/app/schemas/timeStamp.mjs` file.

The command `yarn schemas` runs another script file `downloadSchemas.mjs`, located at `graphql-schema-versioning/app/downloadSchemas.mjs`.

What does the script do?

1. Calls the endpoint using the credentials stored in the `graphql-schema-versioning/app/.env` file, with the query set up as a constant variable called `graphqlSchemaQuery`, to get all of the schemas for the **Schema Versioning Movie Endpoint**.
2. Sends the schemas to the `parseSchemaURLS` function that uses the earlier created ` graphql-schema-versioning/app/schemas/timeStamp.mjs` file to get the latest schema available when the time stamp was created and the most recent schema available (they can be the same), stores them in an object, and adds a name key and value.
3. Sends these two schema objects to `downloadSchemas`, which takes the URL in both schemas to open the URL and write files to `graphql-schema-versioning/app/schemas`, `codegenSchema.graphql` and `mostRecentSchema.graphql`.

### 1: Comparing GraphQL schema versions via GraphQL Inspector

Using GraphQL Inspector's [Schema Validation]('https://the-guild.dev/graphql/inspector/docs/essentials/diff'), compare the two schema versions.

Run the following with `codegenSchema.graphql` as the old schema, and `newSchema.graphql` as the new schema:

```
npx graphql-inspector diff ./schemas/codegenSchema.graphql ./schemas/newSchema.graphql
```

The GraphQL Inspector runs and displays the number of changes. If there are no breaking changes, it returns a 'success' message. If there are breaking changes, it returns an ERROR message that serves as a warning that the front end needs to be updated to address these changes or the schema needs to be updated to restore and deprecate the field.

```sh
Detected the following changes (4) between schemas:

✖  Field description was removed from object type Movie
✔  Field director was added to object type Movie
✔  Field plot was added to object type Movie
✔  Field releaseYear was added to object type Movie
error Detected 1 breaking change
```

## Try it yourself

Introduce new fields that do not break the front-end application:

1. Add new fields to `graphql-schema-versioning/brightspot/src/brightspot/example/graphql_schema_versioning/MovieViewModel.ts`.
2. From the `graphql-schema-versioning/brightspot`, upload the types.
3. Run or refresh the front-end application to load the schemas.
4. Download the schemas with the script shown earlier to compare.
5. Run Codegen after viewing the 'Success' message.
6. Run the front-end application to confirm there are no errors.

## Troubleshooting

Having issues running the example application? Refer to the [Common Issues](/README.md) section in the repository README for assistance.

Only one file downloaded when running the schemas script when there should be two? There is only one schema at the endpoint. Be sure to call the endpoint with the front-end application first so that the latest schema is loaded.
