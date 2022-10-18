# GraphQl Schema Versioning

This example demonstrates Brightspot's ability to use a GraphQL endpoint to track changes and compare versions of a schema. As the schema evolves, the front-end application can retrieve the most up to date version to avoid any breaking changes.

*https://graphql.org/learn/best-practices/#versioning*

## What you will learn

1. How to view schema versions via Brightspot or with [GraphQL Inspector](https://www.the-guild.dev/graphql/inspector/docs/introduction)
2. How to compare schema versions via Brightspot or with GraphQL Inspector
3. How to use GraphQL Inspector to monitor changes before running [Codegen](https://www.the-guild.dev/graphql/codegen/docs/getting-started) to generate new types/schemas

## Running the example application

Refer to the [README](/README.md) at the root of the `react-examples` repository for details on running example applications in depth. Make sure you have the Docker instance for the example applications running, then follow the quick-start steps starting in the `graphql-schema-versioning` directory:

To upload JS Classes in Brightspot (http://localhost/cms):

```sh
cd brightspot
yarn
npx brightspot types download
npx brightspot types upload src

```

To run the front-end:

```sh
cd app
yarn
yarn codegen
yarn start
```

## Step 1: Publish Movie Content

In Brightspot, publish at least one **Movie**.

## Step 2 Codegen

From the `graphql-schema-versioning/app` directory run the following command:

```
yarn codegen
```

The `codegen.yml` file will take the query included in `/components/MoviesQuery.graphql` as well as the schema from `http://localhost/graphql/delivery/movies` and will create a `generated.ts` file.

This file will contain types and hooks based on the query.

## Step 3 Update the Schema

Run the front-end application to confirm that the published **Movie** content renders. Then add the following changes to the **Movie** Content Type and View Model located at `graphql-schema-versioning/brightspot/src/brightspot/example/graphql_schema_versioning/`:

`Movie.ts`:

```js
  @JavaField(Long)
  releaseYear?: number

  @JavaField(String)
  director?: string;
```

`MovieViewModel.ts`:

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

To check via Brightspot, navigate to the GraphQL Explorer and it will show the new fields added to the schema for **Movie**.

## Step 4 Tracking GraphQL Schema Versions via Brightspot

Navigate to the **Menu** &rarr; **Admin** &rarr; **APIs**

On the left rail, click on **Movie Endpoint**.

Click on the ellipsis on the right side of the page and select **ADVANCED** to see a list of Schema Versions in chronological order.

Click on the eye icon of version number 1 to see the latest change. When the form pops up, scroll down to **Schema** and click on the **text/plain** link. It will open a new tab showing the schema and types.

Return to Brightspot and click on the **COMPARE WITH PREVIOUS** button to see a side by side comparison of the schemas to compare the changes.

## Step 5 Tracking GraphQL Schema Versions via GraphQL Inspector

From the `graphql-schema-versioning/app` directory run the following command:

```sh
yarn schemas
```

This will run the `downloadSchemas.mjs` to save the two most recent schemas to `graphql-schema-versioning/app/schemas`.

Confirm the files have saved to `graphql-schema-versioning/app/schemas`. Run the following with **<file1>** being the old schema and **<file2>** being the new schema:

```sh
npx graphql-inspector diff ./schemas/<file1> ./schemas/<file2>
```

The graphql-inspector will run and display the number of changes that were made. If there are no breaking changes, it will return a 'success' message. If there are breaking changes, it will return an ERROR message mand serve as a warning that the front-end will need to be updated.

```sh
Detected the following changes (2) between schemas:

✔  Field director was added to object type Movie
✔  Field releaseYear was added to object type Movie
success No breaking changes detected
```

## Step 6 Update The App

Navigate back to the front-end `graphql-schema-versioning/app`. The types and schema have not been updated in the `generated.ts` file.

The file does not have the field **director** or **releaseYear** in it's type or Movie query

The query needs to be updated `graphql-schema-versioning/app/src/components/MoviesQuery.graphql`, to retrieve those new fields to display in the front-end. The application will still run again because there are no breaking changes. `graphql-schema-versioning/app/src/components/Movie.tsx` and `graphql-schema-versioning/app/src/components/MovieContainer.tsx` need to be updated to display the new fields.

MoviesQuery:

```
query Movies {
  Movies {
    movies {
      title
      description
      releaseYear
      director
    }
  }
}
```

MovieContainer:

```js
import { useMoviesQuery } from '../generated'
import MovieComponent from './Movie'

const MovieContainer = () => {
  const { loading, error, data } = useMoviesQuery()

  if (loading) return <div>Loading...</div>
  if (error) return <div>{error.message}</div>

  return (
    <div className="movies-container">
      {data?.Movies?.movies &&
        data.Movies.movies.map((movie, index) => (
          <MovieComponent
            key={index}
            title={movie?.title}
            description={movie?.description}
            releaseYear={movie?.releaseYear}
            director={movie?.director}
          />
        ))}
    </div>
  )
}

export default MovieContainer
```

Movie:

```js
import { Movie } from '../generated'

const MovieComponent = ({
  title,
  description,
  releaseYear,
  director,
}: Movie) => (
  <div className="movie-card">
    <h1>{title}</h1>
    <h2>{description}</h2>
    <img
      className="movie-image"
      src="https://img.freepik.com/premium-vector/movie-camera-vector-icon-isolated-object-white-background_661273-89.jpg"
      alt="movie"
    />
    <h3>{releaseTear}</h3>
    <h3>{director}</h3>
  </div>
)

export default MovieComponent
```

From the `graphql-schema-versioning/app` directory run:

```sh
yarn codegen
```

Now the `generated.ts` file should contain the new schema.

Go back to your **Movie** content and update the fields published in Brightspot for them render on the front-end.

## Try it yourself

Make a breaking change to the `graphql-schema-versioning/brightspot/src/brightspot/example/graphql_schema_versioning/Movie.ts` file and remove one of the fields and in the view model `graphql-schema-versioning/brightspot/src/brightspot/example/graphql_schema_versioning/MovieViewModel.ts`, then upload into Brightspot.

```
yarn schemas
```

Confirm the files have saved to `graphql-schema-versioning/app/schemas`.
Run the following with **file1** being the old schema and **file2** being the new schema:

```sh
npx graphql-inspector diff ./schemas/file1 ./schemas/file2
```

The graphql-inspector cli will display the breaking changes.

Run Codegen once more and there will be an error that there is no field for the specified removed field that the query `graphql-schema-versioning/app/src/components/MovieQuery.graphql` is asking for.

This is bad practice, when new GraphQL fields are added, it's expected to leave the old ones behind, deprecate them and simply change the data requested. There should only be additions to new fields and then updating the query for the new field, check with graphql-inspector and if all is well, run Codegen and then update the application.

GraphQL unlike REST APIs gives us the ability to easily track new fields added or removed to the schema.

## Troubleshooting

Having issues running the example application? Refer to the [Common Issues](/README.md) section in the respository README for assistance.

Only one file downloaded when running the schemas script? There is only one schema at the endpoint. Be sure to go into Brightspot &rarr; **Menu** &rarr; **Admin** &rarr; **APIS** and save your **Movie Endpoint**.
