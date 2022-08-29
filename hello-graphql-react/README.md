# Hello React and GraphQL: powered by Brightspot

This example highlights how simple it is to use JS Classes and the [Brightspot GraphQL API](https://www.brightspot.com/documentation/brightspot-cms-developer-guide/latest/graphql-api) for generating a GraphQL Content Delivery API endpoint (CDA).

## Running the example application

Refer to the [README](/README.md) at the root of the `react-examples` repository for details on running example applications in depth. If you have run an example application before, here are the quick-start steps:

1. Make sure you have the docker instance running (`docker-compose up`).
2. Cd into the `brightspot` directory, run `yarn`, `npx brightspot types download`, then `npx brightspot types upload src`.
3. Cd into the `app` directory, run `yarn`, then `yarn start`. The frontend application will automatically open in your browser.

## Using the example application

In Brightspot, create a Hello GraphQL React item. Add your name and a mesage. You can create a permalink as well if you like. After publishing that content, make note of either the permalink or the name, and use that in the frontend application input field. You should see `Hello <your name>` name appear along with the message you entered in Brightspot.

## How everything works

Brightspot makes it incredibly easy to create content that you can then query for using the GraphQL API. In addition, you can change the schema that your GraphQL endpoint provides with ease. While you can do this all editorially, JS Classes make it incredibly simple to create content and schema programatically.

Take a look at the `brightspot` directory. There you will find a directory `hello_graphql_react`. That is where you add all content that you wish to upload to Brightspot. The `HelloGraphqlReact.ts` file is the initial class (see the fields `name` and `message`? Those are the fields available for that content in Brightspot). `HelloGraphqlReactViewModel.ts` is the view model for the class. Finally, the custom endpoint is created with `HelloGraphqlReactEndpoint.ts`.

Pause and look closely at the methods in the endpoint file. You will notice how the CORS configuration is set, as well as the access option to implicit (meaning no API key is needed). In just a few lines of code, you are able to customize your endpoint. You will also notice the path is configured. You can add that path to your `app/.env` file as the endpoint for client access.

## Try it yourself

The following are suggestions for learning more about JS Classes and Brightspot:

1. Add a new field for your Hello Graphql React content: add a color value and use that value to change the color of your content on the front end. Try adding other fields.

2. Add the ` @JavaRequired` decorator above the field of your choice to make the field required. See what happens when you try to leave that field blank in Brightspot.

3. Try changing the path and then check in Brightspot: navigate to `Admin`, `APIs`, and then your endpoint. You will see the endpoint listed there. Make sure to add the new path in your `app/.env` file!

4. Create a Hello Graphql React item with the name `Brightspot` and no message. Look at the `HelloGraphqlReactViewModel.ts` file. Guess what you will see if you enter that name in the frontend input field!

## Troubleshooting

Having issues running the example application? Refer to the [Common Issues](/README.md) section in the respository README for assistance.
