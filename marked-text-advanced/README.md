# MarkedText - Advanced

This example highlights how to use JS Classes and the Brightspot GraphQL API to create content with a Rich Text Editor (RTE) field and then retrieve that field to render in a front-end application and demonstrates the use of the Brightspot MarkedText library. The RTE will also be able to handle images and external content.

## What you will learn

1. How to query for MarkedText via GraphQL.
2. How to set content types and GraphQL in Brightspot that can:
   - Use a RTE field as opposed to strings
   - Use a RteMarkedTextViewModel to return the RTE field as a MarkedText object
3. How to create a front-end application with [React](https://reactjs.org/) that implements Brightspot's MarkedText library.

## Running the example application

Refer to the [README](/README.md) at the root of the `react-examples` repository for details on running example applications in depth. Make sure you have the Docker instance for the example applications running, then follow the quick-start steps starting in the `marked-text-advanced` directory:

To upload JS Classes in Brightspot (http://localhost/cms):

```sh
cd brightspot
yarn
npx brightspot types download
npx brightspot types upload src

```

To run the front end:

```sh
cd app
yarn
yarn start
```

The front-end application opens automatically in the browser.

## Using the example application

Publish an Article with the headline **Marked Text**, the rest is up to you. Once published, the front end will render this article.

> **_Note:_** You may change the headline to that of your choosing, but be sure to change the variable 'path' on line 23 of `src/api/index.tsx` in the app directory to match.

This example allows users to upload images, and then place them in the RTE field:

1. Publish an Image content type.
2. Return to an Article and then click on the image icon located on the toolbar (the icon placed last on the toolbar).

The library `@brightspot/marked-text` uses the `markedTextTraversal` function with two arguments, the body of `MarkedText` containing the text and marks, and a Visitor object with two callback functions provided from the app. The library is using a [post order traversal](https://www.geeksforgeeks.org/iterative-postorder-traversal).

## How everything works

JS Classes give you the power to customize Brightspot, add new classes, create endpoints, and much more with JavaScript. One powerful feature Brightspot provides is ease of content modeling and querying for content data with GraphQL.

Navigate to `brightspot/src/examples/marked-text-advanced`. This directory contains the JS Classes files that are uploaded to Brightspot.

`marked-text-advanced/app/src/components/Article`

- `ArticleContainer` This component makes a call to the endpoint from the `marked-text-advanced/app/src/api` to return the Article with the headline **Marked Text**, if the headline is different, change the path variable on line 23 of `marked-text-advanced/app/src/api/index.ts` . It then passes the returned `MarkedText` body to the `MarkedTextComponent`
- `ArticleMarkQuery` This is where the query is made for the article to return the headline, subheadline and body that contains the text and marks (MarkedText).

`marked-text-advanced/app/src/components/MarkedText`

- `MarkedTextComponent` This component handles what kind of RichTextElement/RteMark it receives to direct it to the correct rich-text component. This is how the callback function for `visitMark` knows what to return.
- `visitText` This function is called during traversal that returns the text within React Fragments.
- `HtmlRichTextComponent` This component is used during traversal to handle `RteHtmlElement` marks.
- `ExternalContentRichTextComponent` This component is used during traversal to handle `ExternalContentRichTextElement` marks.
- `ImageRichTextComponent`This component is used during traversal to handle `ImageRichTextElement` marks.

#### Points to note in JS Classes files:

`Article.ts` This file has the following code to use a RTE field rather than one of the standard primitives used in other examples:

```js
  @RichText({
    toolbar: CustomRichTextToolbar.getClass(),
    lines: 5,
  })
```

`ArticleViewModel.ts` unlike some other examples is utilizing am imported view model called `RteMarkedTextViewModel` which takes the body to parse into text and marks:

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

Feel free to use any of the following in this example: bold, italics, underline, superscript, subscript, strikethrough and bullet points. The GraphQL schema in the example above also includes two custom elements:

1. ExternalContentRichTextElement, which works by pasting external links with embeds such as YouTube videos or Flikr images.
2. ImageRichTextElement, allowing you to create an Image content type and use the image button in the toolbar to add the image to the RTE to later retrieve on the front end.

## Troubleshooting

Refer to the [Common Issues](/README.md) section in the respository README for assistance.