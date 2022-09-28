# GraphQl Schema Versioning

Thanks to GraphQL's ability to only retrieve data requested, seldom are there changes made that will break the user's application. Though that is the case, the user will likely want to have access to the most up to date schema in their applications. As the schema evolves, the application can get any updated types and fields while still running the same code/queries as before avoiding any breaking changes.

*https://graphql.org/learn/best-practices/#versioning*

## What you will learn
1. How to view Schemas Versions via Brightspot or with [GraphQL Inspector](https://www.the-guild.dev/graphql/inspector/docs/introduction)
2. How to compare Schema Versions via Brightspot or with GraphQL Inspector
3. How to use GraphQL Inspector to monitor changes before running [Codegen](https://www.the-guild.dev/graphql/codegen/docs/getting-started) to generate new types/schemas

## Running the example application

Refer to the [README](/README.md) at the root of the `react-examples` repository for details on running example applications in depth. Make sure you have the Docker instance for the example applications running, then follow the quick-start steps starting in the `hello-world` directory:

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
## Step 1: Publishing Movie Content

Go to the home page and click on the (+) icon to the right of the search bar, you will see the newly created Movie Content Type. 

Click on the Movie Content Type to create a new Movie. Enter the following for the fields:

Title: Spiderman: No Way Home
Description: Peter Parker's secret identity is revealed to the entire world. Desperate for help, Peter turns to Doctor Strange to make the world forget that he is Spider-Man. The spell goes horribly wrong and shatters the multiverse, bringing in monstrous villains that could destroy the world.

and now on the top right click 'Publish', notice that there is now a Permalink based on the title.

## Step 2 Codegen

The `codegen.yml` file located `graphql-schema-versioning/app/codegen.yml`will take the query created previously (as it is included in `graphql-schema-versioning/app/src/components/MovieQuery.graphql`)
as well as the schema from
`http://localhost/graphql/delivery/movies`
and will generate a `generated.ts` file in the `graphql-schema-versioning/app/src` folder.

This file will contain the GraphQL query as well as the types based on the schema that correspond to that query.

## Step 3 Updating Schema

After testing and loading the schema and types in the application, make some changes to the `Movie` Content Type and View Model. 

It is located:
`graphql-schema-versioning/brightspot/src/brightspot/example/graphql_schema_versioning/*`

The files requiring editing are:
`Movie.ts`
`MovieViewModel.ts`

Start with `Movie.ts` add the following code:
```js
  @JavaField(Long)
  releaseYear?: number

  @JavaField(String)
  director?: string;
```

Now, the GraphQL Endpoint needs to know to update the schema for these fields. Move on to `MovieViewModel.ts` and add the following code:
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

From the `graphql-schema-versioning/brightspot` directory run:
```sh
npx brightspot types upload src
```

The content types should now be updated. Navigate to the API. Go to the Menu => Admin => APIs and click on **Movie Endpoint** and then click save.

To check via Brightspot, head to the graphql explorer and notice the new fields added to the schema for **Movie**.

## Step 4 GraphQL Schema Versions via Brightspot

Go to the Menu => Admin => APIs

On the left rail, click on our **Movie Endpoint**. 

On the right hand side, click on the elipses (...) within the form:

Click on advanced and you will see a page with a list of 'Schema Versions':

Notice they are in time order too. So if we click on the earliest data and time, that will be the first schema.

Click on the eye icon of the latest version, it should be number 1. You will get a popup with a form for the GraphQL Version. Scroll down and under 'Schema' click on the 'text/plain' link. It should open a new tab/page with our schema along with types that will look like this:
```
schema {
  query: Query
}

type Movie {
  description: String
  director: String
  releaseYear: Int
  title: String
}

type Query {
  Movie(id: ID, model: MovieModelInput, path: String): Movie
}

input MovieModelInput {
  id: ID
  path: String
}
```

Go back to the CMS tab which should still be on the GraphQL Version form, click on the 'COMPARE WITH PREVIOUS' button.

This will display a side by side comparison of the schemas to compare the changes. 

## Step 5 GraphQL Schema Versions via GraphQL Inspector

From the root of the application `graphql-schema-versioning/app` there is a script included in this example called `downloadSchemas.mjs`. It will use the included **Schema Versions Endpoint** located `graphql-schema-versioning/brightspot/src/brightspot/example/graphql_schema_versioning/SchemaVersionEndpoint.ts` to make a post request using the **SchemaQuery.graphql** to return the two most recent schemas and save the files to: `graphql-schema-versioning/app/schemas`. They will have the time stamps in their filenames so that there is no confusion as to which is the most recent.

To run the script, run:
```sh
yarn schemas
```

Confirm the files have saved to `graphql-schema-versioning/app/schemas`. Now run the following with **file1** being the old schema and **file2** being the new schema:
```sh
npx graphql-inspector diff ./schemas/file1 ./schemas/file2
```

The graphql-inspector will run and display the changes along with the number of changes that were made. If there are no breaking changes, it will return a 'success' message after the changes are displayed. If there are breaking changes, it will return an ERROR message. This will let the user know whether or not to run Codegen. If there is a breaking change, the user may not want to pull that schema.

```
Detected the following changes (2) between schemas:

✔  Field director was added to object type Movie
✔  Field releaseYear was added to object type Movie
success No breaking changes detected
```
## Step 6 Updating The App

Head back to the front-end react application `graphql-schema-versioning/app`. The application will still run as there have been no breaking changes made to the schema. Though the types and schema have not been updated in the `generated.ts` file.

The file does not have the field **director**  or **realeaseYear** in it's type or Movie query

Run:
```
yarn codegen
```

Now the `generated.ts` file should contain the new schema.

Notice the query is still the same and needs to be updated too, to retrieve those new fields and then display them in the front-end. The application will still run again because there are no breaking changes but even if the `graphql-schema-versioning/app/src/components/Movie.tsx` file were to be changed to try and add the fields for **releaseYear** and **director**, it would not break but there would be nothing displayed: 

Movie:
```js
import { useMovieQuery } from '../generated'

const Movie = () => {
  const { loading, error, data } = useMovieQuery({
    variables: {
      path: '/spiderman-no-way-home',
    },
  })

  if (loading) return <div>Loading...</div>
  if (error) return <div>{error?.message}</div>

  return (
    <>
      {data?.Movie && (
        <div>
          <h1>{data.Movie?.title}</h1>
          <h2>{data?.Movie.description}</h2>
          <h2>{data?.Movie.releaseYear}</h2>
          <h2>{data?.Movie.director}</h2>
        </div>
      )}
    </>
  )
}

export default Movie

```

Update `graphql-schema-versioning/app/src/components/MovieQuery.graphql` to:
```js
query Movie($path: String) {
  Movie(model: { path: $path }) {
    title
    description
    director
    releaseYear
  }
}
```

Then run:
```sh
yarn codegen
```
Once more.

As long as the movie content has all the fields published in Brightspot, they will render on the front-end.

## Try it yourself

If you were to go back to the `graphql-schema-versioning/brightspot/src/brightspot/example/graphql_schema_versioning/Movie.ts` file and removed one of the fields there and in the view model `graphql-schema-versioning/brightspot/src/brightspot/example/graphql_schema_versioning/MovieViewModel.ts` and then upload into Brightspot. There would be a problem in the front end because now that field just does not exist.

Be sure to go to the **Movie Endpoint** in Brightspot and click save. Once the schemas are updated, if you were to run from the app directory `graphql-schema-versioning/app`:

```
yarn schemas
```
Confirm the files have saved to `graphql-schema-versioning/app/schemas`. Now run the following with **file1** being the old schema and **file2** being the new schema:
```sh
npx graphql-inspector diff ./schemas/file1 ./schemas/file2
```

The graphql-inspector cli will display the breaking changes.

Run Codegen once more and there will be an error that there is no field for the specified removed field that the query `graphql-schema-versioning/app/src/components/MovieQuery.graphql` is asking for.

This is bad practice, when new GraphQL fields are added, it's expected to leave the old ones behind, depracate them and simply change the data requested. There should only be additions to new fields and then updating the query for the new field, check with graphql-inspector and if all is well, running Codegen and then update the application.

GraphQL unlike REST APIs gives us the ability to stay up to date on new fields but not have the need to change the code unless there is a need for the new fields and one can simply adjust the query.

## Troubleshooting

Only one file downloaded when running the schemas script? There is only one schema at the endpoint. Be sure to go into Brightspot => Menu => Admin => APIS and save your **Movie Endpoint**.