# GraphQl Schema Versioning

This example demonstrates Brightspot's ability to use a GraphQL endpoint to track changes and compare versions of a schema. As the schema evolves, the front-end application can retrieve the most up-to-date version to avoid any breaking changes.

*https://graphql.org/learn/best-practices/#versioning*

## What you will learn

1. How to view schema versions via Brightspot or with [GraphQL Inspector](https://www.the-guild.dev/graphql/inspector/docs/introduction).
2. How to compare schema versions via Brightspot or with GraphQL Inspector.
3. How to use GraphQL Inspector to monitor changes before running [Codegen](https://www.the-guild.dev/graphql/codegen/docs/getting-started) to generate new types/schemas.

## Running the example application

Refer to the [README](/README.md) at the root of the `react-examples` repository for details on running example applications in depth. Make sure you have the Docker instance for the example applications running, then follow the quick-start steps starting in the `graphql-schema-versioning` directory:

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

## Step 1: Publish Movie Content

In Brightspot, publish at least one **Movie**.

## Step 2 Codegen

From the `graphql-schema-versioning/app` directory, run the following command:

```
yarn codegen
```

The `codegen.yml` file takes the query included in `/components/MoviesQuery.graphql` as well as the schema from `http://localhost/graphql/delivery/movies` and creates a `generated.ts` file. This file will contain types and hooks based on the query.

The script also generates a timestamp file located `/schemas/timeStamp.mjs`.

## Step 3 Update the Schema / ViewModel

Run the front-end application to confirm that the published **Movie** content renders.

Then add the following changes to the **Movie** view model located at `graphql-schema-versioning/brightspot/src/brightspot/example/graphql_schema_versioning/MovieViewModel.ts` **_replacing_** `getDescription()` with `getPlot()` :

```js
  @JavaMethodParameters()
  @JavaMethodReturn(String)
  getPlot(): string {
    return this.model.description
  }

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

From the `graphql-schema-versioning/brightspot` directory run the following command:

```sh
npx brightspot types upload src
```

In Brightspot:

1. Navigate to **Menu** &rarr; **Admin** &rarr; **APIs**.
2. Click on **Schema Versioning Movie Endpoint**
3. Click SAVE to save your endpoint along with updates.

Navigate to the GraphQL Explorer and it will show the new fields added to the schema for **Movie** in the **Schema Versioning Movie Endpoint**.

## Step 4 Tracking GraphQL Schema Versions via Brightspot

1. Navigate to the **Menu** &rarr; **Admin** &rarr; **APIs**.

2. On the left rail, click on **Schema Versioning Movie Endpoint**.

3. Click on the ellipsis on the right side of the page and select **ADVANCED** to see a list of Schema Versions in chronological order.

4. Click on the eye icon of version number 1 to see the latest change. When the form pops up, scroll down to **Schema** and click on the **text/plain** link. A new tabs opens showing the schema and types.

5. Return to Brightspot and click on the **COMPARE WITH PREVIOUS** button to see a side-by-side comparison of the schemas.

## Step 5 Tracking GraphQL Schema Versions via GraphQL Inspector

From the `graphql-schema-versioning/app` directory run the following command:

```sh
yarn schemas
```

This will run the `downloadSchemas.mjs` to save the two schemas to `graphql-schema-versioning/app/schemas`, `codegenSchema.graphql`, which will be based on the timestamp when `yarn codegen` was executed and `newSchema.graphql`, which will be the newest schema on the server.

Confirm the files have saved to `graphql-schema-versioning/app/schemas`. Run the following with `codegenSchema.graphql` as the old schema, and `newSchema.graphql` as the new schema:

```sh
npx graphql-inspector diff ./schemas/codegenSchema.graphql ./schemas/newSchema.graphql
```

The graphql-inspector will run and display the number of changes that were made. If there are no breaking changes, it returns a 'success' message. If there are breaking changes, it returns an ERROR message that serves as a warning that the front end needs to be updated to address these changes or the schema needs to be updated to restore and deprecate the field.

```sh
Detected the following changes (4) between schemas:

✖  Field description was removed from object type Movie
✔  Field director was added to object type Movie
✔  Field plot was added to object type Movie
✔  Field releaseYear was added to object type Movie
error Detected 1 breaking change
```

## Step 6 Update The App

Navigate back to the front-end `graphql-schema-versioning/app`. The types and schema have not been updated in the `generated.ts` file.

The file does not have the field **director** or **releaseYear** in its type or Movie query

The query needs to be updated `graphql-schema-versioning/app/src/components/MoviesQuery.graphql`, to retrieve those new fields to display in the front end. The application will still run again because there are no breaking changes. `graphql-schema-versioning/app/src/components/Movie.tsx` needs to be updated to display the new fields.

MoviesQuery:

```
query Movies {
  Movies {
    movies {
      title
      plot
      releaseYear
      director
    }
  }
}
```

Movie:

```js
import { Movie } from '../generated'

interface MovieProp {
  movie: Movie | null;
}

const MovieComponent = ({ movie }: MovieProp) => (
  <div className="movie-card">
    <h1>{movie?.title}</h1>
    <h2>{movie?.description}</h2>
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
yarn codegen
```

Now the `generated.ts` file now contains the new schema.

## Try it yourself

Make a breaking change, remove one of the fields in the view model `graphql-schema-versioning/brightspot/src/brightspot/example/graphql_schema_versioning/MovieViewModel.ts`, then upload into Brightspot.

```
yarn schemas
```

Confirm the files have been saved to `graphql-schema-versioning/app/schemas`. Run the following with `codegenSchema.graphql` as the old schema, and `newSchema.graphql` as the new schema:

```sh
npx graphql-inspector diff ./schemas/codegenSchema.graphql ./schemas/newSchema.graphql
```

The graphql-inspector displays the changes.

Run Codegen once more and note the error indicating that there is no field for the specified removed field for which the query `graphql-schema-versioning/app/src/components/MovieQuery.graphql` is asking. for.

This is not recommended. When new GraphQL fields are added, the expectation is that old fields are left behind, and that the front end simply changes the data requested.

Only additions to new fields should exist, and the query should be updated for these new fields. Check with graphql-inspector and, if all is as intended, run Codegen, then update the application.

GraphQL APIs, unlike REST APIs, provide the ability to easily track new fields added or removed to the schema.

## Troubleshooting

Having issues running the example application? Refer to the [Common Issues](/README.md) section in the respository README for assistance.

Only one file downloaded when running the schemas script? There is only one schema at the endpoint. Be sure to:

1. Navigate to **Menu** &rarr; **Admin** &rarr; **APIs**.
2. Click on **Schema Versioning Movie Endpoint**
3. Click SAVE to save updates made to your endpoint.
