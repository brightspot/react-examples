# GraphQl Schema Documentation

This example demonstrates Brightspot's ability to use a GraphQL endpoint to capture schema documentation. When brought to the front end using codegen, the types for the schema will have documentation for the content type itself and its fields.

## What you will learn

1. How to use Javadocs to add documentation to Brightspot's GraphQL Schemas
2. How to bring the documentation to your front-end application using [Codegen](https://www.the-guild.dev/graphql/codegen/docs/getting-started)
3. How this can be useful while developing

## Running the example application

Refer to the [README](/README.md) at the root of the `react-examples` repository for details on running example applications in depth. Make sure you have the Docker instance for the example applications running, then follow the quick-start steps starting in the `graphql-schema-documentation` directory:

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

# Step 1 Using GraphQL Explorer to View Schema Documentation

Once you have uploaded the content types, head to http://localhost/cms and go to GraphQLExplorer via the Menu, select the `GraphQL Schema Documentation Endpoint`. On the Right hand side of the Explorer, click on **Docs**. The panel will open with **Documentation Explorer**. There will be a search bar where you can search any of the content types or fields. There is also a section labeled **Root Types** which allows you to navigate through queries and operations available. Either search for `Profile` or click through the **Query** until you find profile.

Click on type **Profile** to see the content type with documentation based on the `brightspot/src/brightspot/example/graphql_schema_documentation/ProfileViewModel.ts` code. Click on each field to have a closer look at them each along with the documentation with any styling added.

# Step 2 Using React/Codegen to View Schema Documentation While Developing

The front-end React application is all set up to use **Codegen** to get the schema along with its documentation.

From the `graphql-schema-documentation/app` directory run the following command:

```
yarn codegen
```

The `codegen.yml` file will take the query included in `/components/AllProfilesQuery.graphql` as well as the schema from `http://localhost/graphql/delivery/graphql-schema-documentation` and will create a `generated.ts` file. This file will contain types and hooks based on the query.

Navigate to the `generated.ts` file in your IDE, we recommend [Visual Studio Code](https://code.visualstudio.com/Download). Highlighting any of the types and fields will display documentation to go with it. This can also be seen in the application itself. Review the code in `graphql-schema-documentation/app/src/App.tsx`:

```js
import './App.css'
import { Profile, useAllProfilesQuery } from './generated'

const App = () => {
  const { loading, error, data } = useAllProfilesQuery()

  if (loading) return <div>Loading...</div>
  if (error) return <div>{error.message}</div>

  const profilesArray = data?.AllProfiles?.ListOfProfiles

  const arrayOfProfiles: Profile[] = []

  profilesArray?.forEach((profile) => {
    if (profile) {
      const {
        displayName,
        favoriteSport,
        favoriteBook,
        favoriteFood,
        favoriteSong,
      }: Profile = profile

      let p: Profile = {
        displayName,
        favoriteSport,
        favoriteBook,
        favoriteFood,
        favoriteSong,
      }
      arrayOfProfiles.push(p)
    }
  })
  return (
    <div className="profiles-container">
      {arrayOfProfiles.map((profile: Profile) => {
        const {
          displayName,
          favoriteSport,
          favoriteBook,
          favoriteFood,
          favoriteSong,
        } = profile
        return (
          <div className="profile">
            <h1>{displayName}</h1>
            <h2>{favoriteBook}</h2>
            <h2>{favoriteSport}</h2>
            <h2>{favoriteFood}</h2>
            <h2>{favoriteSong}</h2>
          </div>
        )
      })}
    </div>
  )
}

export default App
```

Highlighting the variables within the **h1** and **h2** tags will display the fields documentation.

## Try it yourself

Add/Edit the documentation located in the `graphql-schema-documentation/brightspot/src/brightspot/example/graphql_schema_documentation/ProfileViewModel.ts`.
