## GraphQL RESTification

This example will demonstrate how to set up GraphQL Queries into individual REST API Endpoints using the [Brightspot GraphQL API](https://www.brightspot.com/documentation/brightspot-cms-developer-guide/latest/graphql-api).

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
yarn codegen
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

and a third with the 'headline':
Success

and the Subheadline:
You successfully sent a POST request!

## Step 2 Building the Query and Create REST Mapping

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

In the GraphQL Explorer, with the query set up and working, create the first REST Map. Click on the cog on the top right of the GraphQL Explorer page, there should be three options, 'Persisted Query Extension', 'Schema' and finally, select: 
'Create REST Mapping'.

Once selected, a pop up form will appear. The form has the sections 'REST Endpoint', 'REST Mapping Name', 'REST Mapping Method(s)', 'REST Mapping Path' and 'GraphQL Query'

The 'REST Endpoint' should be new so will be pre-selected with 'Create New...' Otherwise there would be a selection of Endpoints to choose this new Mapping to belong to.

'REST Mapping Name'  Name this 'Hello World', leave the 'REST Mapping Method(s)' as a GET request and 'REST Mapping Path' should be auto generated from the name to '/hello-world'.

Click on the 'CREATE' button. As this is the first Mapping, there will be a new form titled: 'New REST GraphQL Mapping API'.

Under name, put:
Articles

There are a few things to notice:

After entering the name, the 'Path Prefix' section will automatically generate '/articles'

As there is only one GraphQL API Endpoint set up in this example, the 'GraphQL Endpoint' section has a dropdown list and 'GraphQL REST API' is currently selected.

Access is set to 'Inherit' which will be based on the Endpoint selected.

Hit save, notice the 'Paths' section at the bottom will have generated:'/articles/hello-world'.

Repeat the process for another query, this time, do not fill in path. Click the $ symbol next to path, which will change the query to take in a variable. This will be a GET request that will take parameters.

Change the query name to Brightspot. The query should look like this:

```
query Brightspot($path: String) {
  Article(model: {path: $path}) {
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
Create the REST Mapping for the query. The form will be auto completed.

Repeat the process for one last query, this time, it will be for a POST request. Like the previous query, instead of filling the path variable. Click the $ symbol next to path, which will change the query to take in a variable.

Change the query name to Article. The query should look like this:

```
query Article($path: String) {
  Article(path: $path) {
    headline
    subheadline
  }
}
```

At the bottom of the explorer, pull up the 'QUERY VARIABLES' section and put in the variable, it will look like this:

```
{
  "path": "/success"
}
```

Test the query and see the output on the right:

```
{
  "data": {
    "Article": {
      "headline": "Success",
      "subheadline": "You successfully made a POST request."
    }
  }
}
```
Create the REST Mapping for the query. The form will be completed but change the request from GET to POST.

The next page should look the same but now there is a new path at the bottom of the mapping api endpoint:
/articles/success

*You can test the GET endpoint quickly by going into the browser and visiting:
'http://localhost/articles/hello-world'*

Test this in the inluded React App.

CD to the 'app' directory in the terminal and run:
```
yarn && yarn codegen && yarn start
```
Navigate to `http://localhost:3000/` in the web browser and see the text from the published content.

Type in the path created earlier for the POST query 'brightspot' to call the Brightspot data using the POST request, though this will work for any article created with the relevant path.

**Notes on Files and Code**

## GET_HELLO call

`GET_HELLO` function located in `src/api` has the following code. It is the  call that will use the GET request to return the data:

```js
const GET_HELLO = () =>
  fetch('http://localhost/articles/hello-world').then((res) => res.json())
```

`GET_HELLO_WITH_PARAMS` function located in `src/api` has the following code. It is the  call that will use the GET request using parameters to return the data:
```js
const GET_HELLO_WITH_PARAMS = (params: string) =>
  fetch(`http://localhost/articles/get-dynamic?path=${params}`).then((res) =>
    res.json()
  )
```

## POST_ARTICLE call

`POST_ARTICLE` function located in `src/api` has the following code that takes the input of the user to make a call that with send a POST request to return the data requested:

```js
const POST_ARTICLE = async (input: string) => {
  const formData = new FormData()
  formData.append('path', input)
  return fetch('http://localhost/articles/article', {
    method: 'POST',
    body: formData,
  }).then((res) => res.json())
}
```

The post function creates a FormData interface that is used to construct a key of 'path' with the value of the input but the user and sends this to our endpoint to return the article requested.

## HelloWorldArticle functional component

The HelloWorldArticle has the following functions:

`getHelloWorldArticle` will get the Hello World article to display. it returns the response to the `useEffect` then handles the response based on whether there is an error or not.

```js
const getHelloWorldArticle = async () => await GET_HELLO()
```

## utils

The `utils` folder contains the file `utils.tsx` which contains the following functions reused throughout the article components:

`getArticle` gets called within the `ArticleComponent`. It will trigger once the user inputs some text and get the article if there are any matches.

```js
const getArticle = async (input: string | null, setData: Function) => {
  if (input) {
    GET_HELLO_WITH_PARAMS(input)
      .then((res) => handleResponse(res, setData))
      .catch((error: Error) => handleError(error, setData))
  }
}
```

`handleResponse` function, it takes in the response from both the previous get or post functions, along with the setData function from either components and handles the return object.

```js
const handleResponse = (res: any, setData: Function): void => {
  let article: Article | undefined
  let errors: string[] = []

  if (res?.data?.Article) {
    article = {
      headline: res.data.Article.headline,
      subheadline: res.data.Article.subheadline,
    }
  }
  if (res.errors) {
    for (let error of res.errors) {
      errors.push(error.message)
    }
  }

  article =
    res?.data?.Article !== null
      ? article
      : (article = {
          headline: 'Article not found',
          subheadline: 'No article matches the path entered',
        })
  setData({
    article,
    errors,
  })
}
```

`handleError` is being used to set any error messages returned from the requests made and uses the component who called it's `setData` function to update the state:

```js
const handleError = (error: Error, setData: Function): void => {
  setData({ errors: [error.message] })
}
```

`useEffect` is being used in the `HelloWorldArticle` component on page load to make a get request using `getHelloWorldArticle` to display the Hello World article made in this example or if it is unable to successfully retrieve the data, it will receive errors to display.

```js
  useEffect(() => {
    getHelloWorldArticle()
      .then((res) => handleResponse(res))
      .catch((error: Error) => handleError(error))
  }, [])
```

## Codegen

The codegen.yaml file receives types from the GraphQL endpoint. This will be run before deploying to the server to gain the advantage of the type system without exposing the GraphQL API to the user.

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
