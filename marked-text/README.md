# MarkedText

This example highlights how to use JS Classes and the Brightspot GraphQL API to create content with a Rich Text Editor (RTE) to then render the content in a front-end application. This example demonstrates the use of the Brightspot MarkedText library.

## What you will learn

1. How to query for marks and text via GraphQL
2. How to set content types and GraphQL in Brightspot that can:
   - Use RichText as opposed to regular strings
   - Use a MarkedTextViewModel to return the RichText Marks
3. How to create a front-end application with [React](https://reactjs.org/) that implements Brightspot's MarkedText library

## Running the example application

Refer to the [README](/README.md) at the root of the `react-examples` repository for details on running example applications in depth. Make sure you have the Docker instance for the example applications running, then follow the quick-start steps starting in the `marked-text` directory:

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
yarn start
```

The front-end application will open automatically in the browser.

## Using the example application

Publish an Article with the headline **Marked Text**, the rest is up to you. Once published, the front end will render this article.

`marked-text/app/brightspot-marked-text` contains the types necessary for the app and the library itself. The library `marked-text.ts` is called using the `markedText` function with three arguments the body of `MarkedText` containing the text and marks, a callback function provided from the app and the type of traversal it would like to use when parsing the marks. In this example, being a React application it made sense to use a [post order traversal](https://www.geeksforgeeks.org/iterative-postorder-traversal).

`marked-text/app/src/components/`

- `ArticleContainer` This component makes a call to the endpoint to return the article with the headline **Marked Text**, if the headline is different, change the path variable here. This is also where the callback function is created to pass to the **MarkedText** library to traverse and parse the marks.
- `ArticleMarkQuery` This is where the query is made for the article to return the headline, subheadline and body that contains the text and marks.
- `StyledComponents` This component handles each mark to return it to it's correct HTML form

## How everything works

JS Classes give you the power to customize Brightspot, add new classes, create endpoints, and much more with JavaScript (TypeScript). One powerful feature Brightspot provides is ease of content modeling and querying for content data with GraphQL.
Navigate to `brightspot/src/examples/marked-text`. This directory contains the JS Classes files that are uploaded to Brightspot.

#### Points to note in JS Classes files:

`Article.ts` has the following code to use a RichTextToolbar rather than one of the standard primitives used in other examples:

```js
  @RichText({
    toolbar: GuideFieldRichTextToolbar.class,
    lines: 5,
  })
```

`ArticleViewModel.ts` unlike some other examples is utilizing am imported ViewModel called `MarkedTextViewModel` which takes the body to parse into text and marks:

```js
  @JavaMethodParameters()
  @JavaMethodReturn(MarkedTextViewModel)
  getBody(): MarkedTextViewModel {
    return this.createView(MarkedTextViewModel.class, this.model.body)
  }
```

## Try it yourself

Feel free to use any of the following in this example: bold, italics, underline, superscript, subscript, strikethrough and bullet points.

## Troubleshooting

Refer to the [Common Issues](/README.md) section in the respository README for assistance.
