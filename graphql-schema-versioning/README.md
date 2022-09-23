# GraphQl Schema Versioning

Thanks to GraphQL's ability to only retrieve data requested, seldom are there changes made that will break the user's application. Though that is the case, the user will likely want to have access to the most up to date schema in their applications. As the schema evolves, the application can get any updated types and fields while still running the same code/queries as before avoiding any breaking changes.

*https://graphql.org/learn/best-practices/#versioning*

## Running the example application

Refer to the [README](/README.md) at the root of the `react-examples` repository for details on running example applications in depth. Make sure you have the Docker instance for the example applications running, then follow the quick-start steps starting in the `hello-world` directory:

To upload JS Classes in Brightspot (http://localhost/cms):

```
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

Click on the Movie Content Type to create a new Movie. Enter a 'Title' and 'Description'.

and now on the top right click 'Publish', notice that there is now a Permalink based on the title.

## Step 2: GraphQL Hello World

Now that there is `Movie` content published, click on the hamburger menu in the top left corner and click on `Developer → GraphQL Explorer`.

At the top of the page there is a dropdown for `Select GraphQL Endpoint`.
Select the previously created `Movie Endpoint` endpoint.

The `GraphQL Explorer` allowed for easy query testing endpoints.

Under the `Explorer` section, on selection of `Movie`, the fields available on the GraphQL schema will appear. Notice that the middle section under `GraphiQL` has now generated a query. This is being built based on selections.

Select `model`, a further two fields will appear, **id** and **path**, check the **path** box. Notice that double quotes `"_"` have appeared but also, a `$`. Select the `$` to change your query into one that accepts a variable, in this case a string.

Check the `Title` and `description` boxes to add those fields to the query.

The final query should look like the code below after changing `MyQuery` to `MovieQuery`. For more information on creating GraphQL queries visit [graphql.org/learn/queries/](graphql.org/learn/queries/)

```js
query MovieQuery {
  Movie(model: {path: ""}) {
    headline
    subheadline
  }
}
```

You will need to pull up the **QUERY VARIABLES** section below the GraphiQL section in the middle panel. Type in the following with the content's path:

```json
{
  "path": "/path-here"
}
```

Click the play icon to test and if successful you will see the following response on the right, confirming that the endpoint works.

```json
{
  "data": {
    "Movie": {
      "Title": "Movie Title",
      "description": "Movie Description"
    }
  }
}
```
## Step 4 Codegen

The `codegen.yml` file located `graphql-schema-versioning/app/codegen.yml`will take the query we created previously (as it is included in `graphql-schema-versioning/app/src/components/MovieQuery.graphql`)
as well as the schema from
`http://localhost/graphql/delivery/movies`
and will generate a `generated.ts` file in the `graphql-schema-versioning/app/src` folder.

This file will contain the query that used as well as the types based on the schema that with TypeScript.

## Step 5 Checking Schema Versions

## Step 5 Add Article Content Type Fields

After testing and loading the schema and types in the application, make some changes to the `Movie` Content Type and View Model. 

It is located:
`graphql-schema-versioning/brightspot/src/brightspot/example/graphql_schema_versioning/*`

The files requiring editing are:
`Movie.ts`
`MovieViewModel.ts`

Start with `Movie.ts` add the following code:
```js
  @JavaField(Number)
  releaseDate?: number

  @JavaField(String)
  director?: string;
```

Now, the GraphQL Endpoint needs to know to update the schema for these fields. Move on to `MovieViewModel.ts` and add the following code:
```js
  @JavaMethodParameters()
  @JavaMethodReturn(Number)
  getReleaseDate(): number {
    return this.model.releaseDate
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

The content types should now be updated. Navigate to the API. Go to the Menu => APIs and click on **Movie Endpoint** and then click save.

Head back to the graphql explorer and notice the new fields added to the schema for **Movie**.

## Step 6 GraphQL Schema Versions

After confirming with the GraphQL Explorer that the newly created fields are available, navigate back to the API. Go to the Menu => APIs

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
  releaseDate: Float
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

## Step 7 Updating Our App

Codegen is a very useful tool. Head back to the front-end react application `graphql-schema-versioning/app`. The application will still run as there have been no breaking changes made to the schema. Though the types and schema has not been updated in the `generated.ts` file.

The file does not have the field **director**  or **realeaseDate** in it's type or Movie query:
```js
export type MovieQuery = { 
  __typename?: 'Query', 
  Movie?: { 
    __typename?: 'Movie', 
    title?: string | null, 
    description?: string | null 
    } | null 
  };

```
```js
export type Movie = {
  __typename?: 'Movie';
  description?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
};
```

Make sure the app is not running and run:
```
yarn codegen
```

Now our `generated.ts` file contains the new schema:
```js
export type MovieQuery = { 
  __typename?: 'Query', 
  Movie?: { 
    __typename?: 'Movie', 
    title?: string | null, 
    description?: string | null 
    } | null 
  };

```
```js
export type Movie = {
  __typename?: 'Movie';
  description?: Maybe<Scalars['String']>;
  director?: Maybe<Scalars['String']>;
  releaseDate?: Maybe<Scalars['Float']>;
  title?: Maybe<Scalars['String']>;
};
```

Notice the query is still the same...because it needs to be updated too, to retrieve those new fields and then display in the front-end. The application will still run again because there are no breaking changes but even if the `graphql-schema-versioning/app/src/components/MovieComponent.tsx` file were to be changed to try and add the fields for **releaseDate** and **director**, it would not break but there would be nothing displayed: 

MovieComponent:
```js
import { Movie } from '../generated'
interface Props {
  movie: Movie | undefined
}

const MovieComponent = ({ movie }: Props) => {
  if (movie === undefined) return <></>
  if (!movie) return <div>The movie does not exist (404)</div>
  const { title, description, director, releaseDate } = movie

  return (
    <div className="movie">
      <h1>{title}</h1>
      <h2>{description}</h2>
      <h2>{director}</h2>
      <h2>{releaseDate}</h2>
    </div>
  )
}

export default MovieComponent
```

Update `graphql-schema-versioning/app/src/components/MovieQuery.graphql` to:
```js
query Movie($path: String) {
  Movie(model: { path: $path }) {
    title
    description
    director
    releaseDate
  }
}
```

Then run:
```sh
yarn codegen
```
Once more.

As long as the movie has all the fields published in Brightspot, they will render on the front-end.

Here is an application that is easily managed. So what kind of thing could break the app?

If you were to go back to the `graphql-schema-versioning/brightspot/src/brightspot/example/graphql_schema_versioning/Movie.ts` file and removed one of the fields there and in the view model `graphql-schema-versioning/brightspot/src/brightspot/example/graphql_schema_versioning/MovieViewModel.ts`. You will have a problem in the front end because now that field just does not exist.

Run Codegen once more and there will be an error that there is no field for the specified removed field.

This is bad practice, when new GraphQL fields are added, it's expected to leave the old ones behind and simply change the data requested. There should only be additions to new fields and then updating the query for the new field, running Codegen and then update the application. Though if you don't update the application, it still should not break.

GraphQL unlike REST APIs gives us the ability to stay up to date on new fields but not have the need to change the code unless there is a need for the new fields and one can simply adjust the query.