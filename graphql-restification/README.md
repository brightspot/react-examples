## GraphQL RESTification

In this example we will demonstrate how to set up GraphQL Queries into individual REST API Endpoints using the [Brightspot GraphQL API](https://www.brightspot.com/documentation/brightspot-cms-developer-guide/latest/graphql-api).

## Running the example application

Refer to the [README](/README.md) at the root of the `react-examples` repository for details on running example applications in depth. Make sure you have the Docker instance for the example applications running, then follow the quick-start steps starting in the `hello-brightspot` directory:

To upload JS Classes in Brightspot (http://localhost/cms):

```
cd brightspot
yarn
npx brightspot types download
npx brightspot types upload src

```

To run the frontend:

```
cd app
yarn
yarn start
```

The front-end application will open automatically in the browser.

## Step 1: Publish Article Content

Publish new 'Article' content by clicking on the
*+* icon at the top of the page, on the right of the search bar and selecting 'Article' or by simply selecting 'Article' of the 'Quick Start' menu.

Notice that 'Headline' is required.

Let's type in:
Hello World

In the Subheadline field:
Welcome to Brightspot!

Now, on the top right, lets publish the content.

Repeat the same steps with the 'Headline' to be:
Brightspot

and the Subheadline field:
The most complete CMS solution available today

## Step 2 Building your Query and Create REST Mapping

To see the API in action, navigate to Developer → GraphQL Explorer from the burger menu, and select Article API (CDA) from the Select GraphQL Endpoint dropdown. The page will load with the GraphiQL Explorer UI with the GraphQL schema loaded into it. In the explorer panel in the left rail you'll see a GraphQL query field named 'Article'. Previously in other examples, this would accept arguments of either id or path but as this will be a with a GET request, bake the path directly into the query. Lets open Article and check model which will give access to id and path. Check path, next to path enter some text for the path. Put in '/hello-world'. 

Check the headline and text box. The final query should look like this after changing 'MyQuery' to 'HelloWorld':
```
query HelloWorld {
  Article(model: {path: "/hello-world"}) {
    headline
    subheadline
  }
}
```

Test the query by pressing the execute/play button. The data appear should appear on the right rail and should look like this:
```
{
  "data": {
    "Article": {
      "headline": "Hello World",
      "subheadline": "Welcome to Brightspot"
    }
  }
}
```

In the GraphQL Explorer, with our query set up and working, create the first REST Map. Click on the cog on the top right of the GraphQL Explorer page, there should be three options, 'Persisted Query Extension', 'Schema' and finally, the one we will select: 
'Create REST Mapping'.

Once selected, a pop up form will appear. The form has the sections 'REST Endpoint', 'REST Mapping Name', 'REST Mapping Method(s)', 'REST Mapping Path' and 'GraphQL Query'

The 'REST Endpoint' should be new so will be pre-selected with 'Create New...' Otherwise there would be a selection of Endpoints to choose this new Mapping to belong to.

'REST Mapping Name'  Name this 'Hello World', leave the 'REST Mapping Method(s)' as a GET request and 'REST Mapping Path' should be auto generated from the name to '/hello-world'.

Click on the 'CREATE' button. As this is the first Mapping, there will be a new form titled: 'New REST GraphQL Mapping API'.

Under name, put:
Articles

There are a few things to notice:

After entering the name, the 'Path Prefix' section will automatically generate '/articles'

As there is only one GraphQL API Endpoint set up in this example, the 'GraphQL Endpoint' section has a dropdown list and 'Article API' is currently selected.

Access is set to 'Inherit' which will be based on the Endpoint selected.

Hit save, notice the 'Paths' section at the bottom will have generated:'/articles/hello-world'.

Repeat the process for another query, this time, it will be for a POST request. Instead of baking the path variable. Click the $ symbol next to path, which will change the query to take in a variable.

Change the query name to Brightspot. The query should look like this:

```
query Brightspot($path: String) {
  Article(path: $path) {
    headline
    subheadline
  }
}
```

At the bottom of the explorer, pull up the 'QUERY VARIABLES' section and put in the variable, it will look like this:

```
{
  "path": "/brightspot"
}
```

Test the query and see the output on the right:

```
{
  "data": {
    "Article": {
      "headline": "Brightspot",
      "subheadline": "The most complete CMS solution available today"
    }
  }
}
```
Creat the REST Mapping for the query. The form will be completed but change the request from GET to POST.

The next page should look the same but now there is a new path at the bottom of the mapping api endpoint:
/articles/brightspot

*You can test your GET endpoint quickly by going into your browser and visiting:
'http://localhost/articles/hello-world'*

Now we can test this in the inluded React App.

CD to the 'app' directory in the terminal and run:
```
yarn && yarn start
```
Navigate to `http://localhost:3000/` in your web browser and see the text from your published content.

Click on the button, it should use the function (POST_BRIGHTSPOT) to call the Brightspot data using the POST request.

**Notes on Files and Code**

## GET_HELLO api call

`GET_HELLO.tsx` is located in the `/api` directory with the following code. It is the api call that will use the GET request to return the data:

```js
const GET_HELLO = async () => {
  const data = await fetch('http://localhost/articles/hello-world').then(res => res.json())
    return data.data
}

export default GET_HELLO
```

## POST_BRIGHTSPOT api call

`POST_BRIGHTSPOT.tsx` in the `/api` directory with the following code is the api call that will send a POST request to return the data we will want:

```js
const POST_BRIGHTSPOT = async () => {
    const formData = new FormData()
    formData.append("path", "brightspot")
    const data = await fetch('http://localhost/articles/brightspot', {
        method: 'POST',
        body: formData
    }).then(res => res.json())
    return data.data
}

export default POST_BRIGHTSPOT
```

## Codegen

The codegen.yaml file receives types from the GraphQL endpoint. This will be run before deploying to the server so that we get the advantage of the type system without exposing the GraphQL API to the user.

Script:
```
yarn codegen
```

This will overwrite everytime the script is run, it will pick up the schemas from the GraphQL Endpoint, it will take the queries to find the schemas within the endpoint that are needed. It will then write into the previously created `/generated/graphql.tsx` file.

It will only use the neccessary plugins to get ahold of the types needed.

Notice the `/generated/graphql.tsx` file has a bunch of stuff in it. The focus at this stage is:
```js
export type Article = Content & Record_Interface & {
  __typename?: 'Article';
  _id?: Maybe<Scalars['ID']>;
  cms_content?: Maybe<Content_ObjectModificationCmsContentField>;
  headline?: Maybe<Scalars['String']>;
  subheadline?: Maybe<Scalars['String']>;
};
```

Whenever the schema is changed, it will be caught here with another run of codegen before deploying the build. To lookout for any changes.

Learn more about Codegen here:
*https://www.graphql-code-generator.com/docs/getting-started*


## Index.tsx

This file is where 'ApolloClient' is set up.