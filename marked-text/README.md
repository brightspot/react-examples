# MarkedText

This example highlights how to use JS Classes and the Brightspot GraphQL API to create content with a Rich Text Editor (RTE) Field, to then render in a front-end application. This example demonstrates the use of the Brightspot MarkedText library.

## What you will learn

1. How to query for marks and text via GraphQL
2. How to set content types and GraphQL in Brightspot that can:
   - Use Rich Text Editor Field as opposed to regular strings
   - Use a RteMarkedTextViewModel to return the RichText Field as a MarkedText Object
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

_You may change the headline to that of your choosing but be sure to change the variable 'path' on line 61 of ArticleContainer.tsx in the app directory to match_

This example allows users to upload images and then place them in your RTE. Publish an Image content type and then click on the image icon located on the toolbar (the icon placed last on the toolbar).

`marked-text/app/brightspot-marked-text` contains the library code as well as the types. The library `marked-text.ts` is called using the `markedTextTraversal` function with two arguments, the body of `MarkedText` containing the text and marks, and a Visitor object with two callback functions provided from the app. The library is using a [post order traversal](https://www.geeksforgeeks.org/iterative-postorder-traversal).

## How everything works

JS Classes give you the power to customize Brightspot, add new classes, create endpoints, and much more with JavaScript (TypeScript). One powerful feature Brightspot provides is ease of content modeling and querying for content data with GraphQL.
Navigate to `brightspot/src/examples/marked-text`. This directory contains the JS Classes files that are uploaded to Brightspot.

`marked-text/app/src/components/`

- `ArticleContainer` This component makes a call to the endpoint to return the article with the headline **Marked Text**, if the headline is different, change the path variable here. This is also where the `visitorHandler` object is created with two call back functions. This along with the body of the Article are required to pass to the `markedTextTraversal` function from the library to traverse the marks and text.
- `ArticleMarkQuery` This is where the query is made for the article to return the headline, subheadline and body that contains the text and marks.
- `StyledComponents` This file contains a helper component `TypeComponentHandler` that handles what kind of RichTextElement/RteMark it receives to direct it to the correct component. This is how the callback function for `visitMark` knows what to return. It also contains `TextComponent` to just return the text upon calling the `visitText` function during traversal.

#### Points to note in JS Classes files:

`Article.ts` has the following code to use a RichTextToolbar rather than one of the standard primitives used in other examples:

```js
  @RichText({
    toolbar: CustomRichTextToolbar.getClass(),
    lines: 5,
  })
```

`ArticleViewModel.ts` unlike some other examples is utilizing am imported ViewModel called `RteMarkedTextViewModel` which takes the body to parse into text and marks:

```js
  @JavaMethodParameters()
  @JavaMethodReturn(RteMarkedTextViewModel)
  getBody(): RteMarkedTextViewModel {
    return this.createView(
      RteMarkedTextViewModel.class,
      RteMarkedText.getInstanceFromRichText(this.model, this.model.body)
    )
  }
```

## Try it yourself

Feel free to use any of the following in this example: bold, italics, underline, superscript, subscript, strikethrough and bullet points. This example's GraphQL schema is including two custom elements also, ExternalContentRichTextElement which works by pasting external links with embeds such as YouTube videos and ImageRichTextElement, allowing you to create an Image content type and using the image button in the toolbar to add the image to the RTE to later retrieve on the front-end.

## Troubleshooting

Refer to the [Common Issues](/README.md) section in the respository README for assistance.
