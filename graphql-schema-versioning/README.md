# GraphQL Schema Versioning

Since GraphQL only retrieves data explicitly requested, new features added to a GraphQL endpoint have no impact on the applications using them. Following [best practices](https://graphql.org/learn/best-practices/#versioning) allows the GraphQL endpoint to be versionless. GraphQL schemas should evolve without breaking changes but that does not mean they cannot be introduced. As a schema evolves, it is best if a process in place to detect any potential problems.

This example demonstrates Brightspot’s ability to monitor changes to GraphQL schemas and compare schema versions. The front-end application also uses [GraphQL Inspector](https://www.the-guild.dev/graphql/inspector/docs/introduction) to view any schema changes before updating, to avoid any breaking changes, and using [Codegen](https://www.the-guild.dev/graphql/codegen/docs/getting-started) to generate types based on the most up-to-date schema version.

## What you will learn

1. How to view schema versions via Brightspot and [GraphQL Inspector](https://www.the-guild.dev/graphql/inspector/docs/introduction).
2. How to compare schema versions via Brightspot and GraphQL Inspector.

## Running the example application

Refer to the [README](/README.md) at the root of the `react-examples` repository for details on running example applications in depth. Make sure you have the Docker instance for the example applications running, then follow the quick-start steps starting in the `graphql-schema-versioning` directory:

To upload JS Classes in Brightspot (http://localhost/cms):

```sh
cd brightspot
yarn
npx brightspot types download
npx brightspot types upload src

```

To run the front end, run the following commands from the `graphql-schema-versioning/app` directory:

```sh
yarn
yarn codegen
yarn start
```

The front-end application opens automatically in the browser.

## Step 1: Publish Movie Content

In Brightspot, publish at least one **Movie**.

## Step 2: Loading Schema Versions

Schema versions are lazily loaded, a call has to be made to the endpoint for the new schema to load. We can do this using the GraphQL Explorer:

1. **Navigation menu** &rarr; **Developer** &rarr; **GraphQL Explorer**.
2. Using the dropdown list, select **Schema Versioning Movie Endpoint**.

The schema versions loaded.

## Step 3: Viewing GraphQL Schema Versions in Brightspot

1. **Navigation menu** &rarr; **Admin** &rarr; **APIs**..
2. On the left rail, click on **Schema Versioning Movie Endpoint**.
3. Click on the ellipsis on the right side of the page and select **ADVANCED** to see a list of Schema Versions in chronological order.
4. Click on the eye icon, to the right of the schema version listed (there is only one at this stage).
5. Click on the link under **Schema**.

A new tab opens displaying the schema and its types. You can close this tab.

## Step 4: Update the Schema / ViewModel

Run the front-end application to confirm that the published **Movie** content renders.

Then make the following changes to the **Movie** view model located at `graphql-schema-versioning/brightspot/src/brightspot/example/graphql_schema_versioning/MovieViewModel.ts` :

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

From the `graphql-schema-versioning/brightspot` directory run the following command:

```sh
npx brightspot types upload src
```

## Step 5: Comparing GraphQL Schema Versions via Brightspot

Follow [Step 2](#step-2-loading-schema-versions) to load the latest schema versions.

**Navigation menu** &rarr; **Developer** &rarr; **APIs** and then click on **Schema Versioning Movie Endpoint**. Once there, follow these instructions to compare versions:

1. Click on the second ellipsis on the right side of the page and select **ADVANCED** to see a list of Schema Versions in chronological order.
2. Click on the eye icon of version number 1. This is the newest schema.
3. Click on the **COMPARE WITH PREVIOUS** button to see a side-by-side comparison of the schemas.

## Step 6: Tracking and Comparing GraphQL Schema Versions via GraphQL Inspector

Changing and uploading the view model as shown in [step 4](#step-4-update-the-schema--viewmodel) will cause the schema to change, creating a new version.

This example has two endpoints, the first is used in the front-end application with a query to get all movie content data.

The second, which can be seen in **Navigation menu** &rarr; **Admin** &rarr; **APIs**, on the left rail labelled **Schema Versioning Endpoint** requires credentials to access the endpoint. This endpoint is used with a query to get all of the schema versions for the **Schema Versioning Movie Endpoint**.

The command `yarn codegen` also runs a script file `getTimeStamp.mjs`, located at `graphql-schema-versioning/app/getTimeStamp.mjs`. This script records the time the script was run, writes and saves it to `graphql-schema-versioning/app/schemas/timeStamp.mjs`.

From the `graphql-schema-versioning/app` directory run the following command:

```
yarn schemas
```

This runs another script file `downloadSchemas.mjs`, located at `graphql-schema-versioning/app/downloadSchemas.mjs`.

What does the script do?

1. Calls the endpoint using the credentials stored in the `graphql-schema-versioning/app/.env` file, with the query that is set up as a const called `graphqlSchemaQuery`, to get all of the schemas for the **Schema Versioning Movie Endpoint**.
2. Sends the schemas to the `parseSchemaURLS` function that uses the earlier created ` graphql-schema-versioning/app/schemas/timeStamp.mjs` file to get the latest schema available when the time stamp was created and the most recent schema available (they can be one and the same), stores them in an object and adds a name key and value.
3. Then it sends these two schema objects to `downloadSchemas` which takes the URL in both schemas to open the URL and write files to `graphql-schema-versioning/app/schemas`, `codegenSchema.graphql` and `mostRecentSchema.graphql`.

Using GraphQL Inspector's [Schema Validation]('https://the-guild.dev/graphql/inspector/docs/essentials/diff'), compare the two schema versions.

Run the following with `codegenSchema.graphql` as the old schema, and `newSchema.graphql` as the new schema:

```
npx graphql-inspector diff ./schemas/codegenSchema.graphql ./schemas/newSchema.graphql
```

The graphql-inspector runs and displays the number of changes. If there are no breaking changes, it returns a 'success' message. If there are breaking changes, it returns an ERROR message that serves as a warning that the front end needs to be updated to address these changes or the schema needs to be updated to restore and deprecate the field.

```sh
Detected the following changes (4) between schemas:

✖  Field description was removed from object type Movie
✔  Field director was added to object type Movie
✔  Field plot was added to object type Movie
✔  Field releaseYear was added to object type Movie
error Detected 1 breaking change
```

## Step 7: Update The App

Based on the changes made, update the query in the front-end application for Codegen to get the correct fields and types.

Update the `Movie.tsx` component to display the new fields and change 'description' to 'plot':

`graphql-schema-versioning/app/src/components/MoviesQuery.graphql`:

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

`graphql-schema-versioning/app/src/components/Movie.tsx`:

```js
import { Movie } from '../generated'

interface MovieProp {
  movie: Movie | null;
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
yarn codegen
```

The `graphql-schema-versioning/app/src/generated.ts` file is updated containing the new schema and field types. The front-end application can run once again with no errors.

## Try it yourself

Introduce New Fields that do not break the front-end application:

1. Add new fields to `graphql-schema-versioning/brightspot/src/brightspot/example/graphql_schema_versioning/MovieViewModel.ts`.
2. From the `graphql-schema-versioning/brightspot` upload the types.
3. View them in the GraphQL Explorer.
4. Download the schemas with the script shown earlier to compare.
5. Run Codegen after viewing the 'Success' message.
6. Run the front-end application and see no errors.

## Troubleshooting

Having issues running the example application? Refer to the [Common Issues](/README.md) section in the respository README for assistance.

Only one file downloaded when running the schemas script when there should be two? There is only one schema at the movies endpoint. Be sure to call the movies endpoint with the GraphQL Explorer first so that the latest schema is loaded.
