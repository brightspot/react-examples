## Installing JS Classes
In a separate terminal window, start at the root of the repository, cd into `<example directory name>` -> `brightspot`.  then run `yarn`. Next, run `npx brightspot login` to login. After logging in, run `npx brightspot types download`. Finally, run `npx brightspot types upload src`. Navigate to the cms (http://localhost/cms) and verify that the content successfully uploaded. You can verify which content to expect by checking the `src/brightspot/example` directory.  


To compile an existing project, from the `brightspot` directory:

```
yarn
npx brightspot config server http://localhost/cms
npx brightspot login
npx brightspot types download

# You will see some files in src/brightspot/example directory. Run the following:

npx brightspot types upload src
```

Once complete, return to the README for the example to continue.
## Installation

Refer to [INSTALL.md](INSTALL.md).

## Running Brightspot

Refer to [RUNNING.md](RUNNING.md).

Once Brightspot is running, login to the CMS using any credentials at: `localhost/cms`
## GraphQL RESTification

In this example we will demonstrate how to set up GraphQL Queries into individual REST API Endpoints.

## Step 1: Publish Article Content

We can publish new 'Article' content by clicking on the
*+* icon at the top of the page, on the right of the search bar and selecting 'Article' or by simply selecting 'Article' of the 'Quick Start' menu.

You will see that 'Headline' is required.

Let's type in:
Hello World

In the Subheadline field:
Welcome to Brightspot!

Now, on the top right, lets publish our content.

Repeat the same steps with the 'Headline' to be:
Brightspot

and the Subheadline field:
The most complete CMS solution available today

## Step 2 Building your Query and Create REST Mapping

To see the API in action, navigate to Developer → GraphQL Explorer from the burger menu, and select Article API (CDA) from the Select GraphQL Endpoint dropdown. You'll be presented with the GraphiQL Explorer UI with the GraphQL schema loaded into it. In the explorer panel in the left rail you'll see a GraphQL query field named 'Article'. Previously in other examples, this would accept arguments of either id or path but as we are starting with a GET request, we will bake the path directly into the query. Lets open Article and check path, next to path you will be enter some text for the path. Put in '/hello-world'. 

We then will check the headline and text box. Your final query should look like this after changing 'MyQuery' to 'HelloWorld':
```
query HelloWorld {
  Article(path: "/hello-world") {
    headline
    subheadline
  }
}
```

Test the query by pressing the execute/play icon
<button style="border-radius: 30px"><svg width="30" height="30"><path d="M 11 9 L 24 16 L 11 23 z"></path></svg></button> You should see our data appear on the right rail.

It should look like this:
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

In the GraphQL Explorer, with our query set up and working. We can create our first REST Map. Click on the cog on the top right of your GraphQL Explorer page, you will see three options, 'Persisted Query Extension', 'Schema' and finally, the one we will select: 
'Create REST Mapping'.

Once selected, you will have a pop up form:

The form has the sections 'REST Endpoint', 'REST Mapping Name', 'REST Mapping Method(s)', 'REST Mapping Path' and 'GraphQL Query'

The 'REST Endpoint' should be new so will be pre-selected with 'Create New...' Otherwise you would have a selection of Endpoints you would like this new Mapping to belong to.

'REST Mapping Name'  We are going to call this 'Hello World', we will leave the 'REST Mapping Method(s)' as a GET request and 'REST Mapping Path' should be auto generated from our name to '/hello-world'.

We will now click on the 'CREATE' button. As this is our first Mapping, we will be given a new form titled: 'New REST GraphQL Mapping API'.

Under name, we will put:
Articles

There are a few things to notice:

After we put in our name, the 'Path Prefix' section will automatically generate '/articles'

As we only have one GraphQL API Endpoint set up in this example, you will see the 'GraphQL Endpoint' section has a dropdown list and 'Article API' is currently selected.

Access is set to 'Inherit' which will be based on the Endpoint selected.

Once we hit save, the 'Paths' section at the bottom will have generated:'/articles/hello-world'.

Repeat the process for our another query, this time, it will be for a POST request. Instead of baking in our path variable. We will just click the $ symbol next to path, which will change the query to take in a variable.

You can name your query anything, we are going to change its name to Brightspot. The query should look like this:

```
query Brightspot($path: String) {
  HelloWorld(path: $path) {
    headline
    subheadline
  }
}
```

At the bottom of the explorer you can pull up the 'QUERY VARIABLES' section and put in the variable, it will look like this:

```
{
  "path": "/brightspot"
}
```

Test your query and you should see the output on the right:

```
{
  "data": {
    "HelloWorld": {
      "headline": "Brightspot",
      "subheadline": "The most complete CMS solution available today"
    }
  }
}
```
Creat the REST Mapping for your query. Your form will be completed for you but we are just going to change the request from GET to POST.

The next page should look the same but now we have a new path at the bottom of the mapping api endpoint:
/articles/brightspot

*You can test your GET endpoint quickly by going into your browser and visiting:
'http://localhost/articles/hello-world'*

Now we can test this in the inluded React App.

CD to the 'app' directory in your terminal and run:
```
yarn && yarn start
```
Navigate to `http://localhost:3000/` in your web browser and you will see the text from your published content.

If you click on out button, it should use the function (POST_BRIGHTSPOT) to call our Brightspot data using the POST request.

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

The codegen.yaml file receives our types from our GraphQL endpoint. This will be run before deploying to the server so that we get the advantage of the type system without exposing the GraphQL API to the user.

Script:
```
yarn codegen
```

This will overwrite everytime our script is run, it will pick up the schemas from our GraphQL Endpoint, it will take our queries to find the schemas within our endpoint that we need. It will then right into our previously created `/generated/graphql.tsx` file.

It will only use the neccessary plugins to get ahold of the types we need.

You will see our `/generated/graphql.tsx` file has a bunch of stuff in it. What we care about at this stage is:
```js
export type Article = Content & Record_Interface & {
  __typename?: 'Article';
  _id?: Maybe<Scalars['ID']>;
  cms_content?: Maybe<Content_ObjectModificationCmsContentField>;
  headline?: Maybe<Scalars['String']>;
  subheadline?: Maybe<Scalars['String']>;
};
```

Whenever we change the schema, it will be caught here with another run of codegen before deploying your build. So we can watch out for any changes.

Learn more about Codegen here:
*https://www.graphql-code-generator.com/docs/getting-started*


## Index.tsx

This file is where we set up 'ApolloClient'
