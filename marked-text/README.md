# MarkedText

## What is Rich Text?

Rich Text allows for more exciting text formatting, support bold, italics, underline and more. Brightspot users will be familiar with the WYSIWYG rich-text-editor (RTE) when creating various content.

## What is Marked Text?

Marked Text is the API response data object representation from a rich-text-editor field. To take this content into any front end of your choosing, there needs to be a way to grab that content but still have the power to manipulate and customize the content.

A MarkedText object gives developers the option to retrieve data from an RTE field as a structured object versus a string of HTML. The structure of the MarkedText object allows for infinitely nested tags to be represented cleanly without prior knowledge of the entire state and without needing to parse the plain text elements of the string.

Marked Text gives you the power to use the content published in Brightspot's RTE, but in a way that doesn't limit how you present it. To do that, the data response from Brightspot’s GraphQL API comes in a manageable JSON structure.

For example, consider the following body text:

**Marked** _Text_

In MarkedText format:

```json
{
  "text": "Marked Text",
  "marks": [
    {
      "start": 0,
      "end": 11,
      "descendants": 2,
      "data": {
        "__typename": "RteHtmlElement",
        "name": "p",
        "attributes": []
      }
    },
    {
      "start": 0,
      "end": 6,
      "descendants": 0,
      "data": {
        "__typename": "RteHtmlElement",
        "name": "b",
        "attributes": []
      }
    },
    {
      "start": 7,
      "end": 11,
      "descendants": 0,
      "data": {
        "__typename": "RteHtmlElement",
        "name": "i",
        "attributes": []
      }
    }
  ]
}
```

## Brightspot MarkedText Library

Brightspot provides to you a traversal algorithm, used in the example above, to save you time writing your own.

## Marked Text Example

This example highlights how to use JS Classes and the Brightspot GraphQL API to create content with a RTE Field and then retrieve that field to render in a front-end application and the use of the Brightspot MarkedText library.

## What you will learn

1. How to query for MarkedText via GraphQL.
2. How to set content types and GraphQL in Brightspot that can:
   - Use a RTE field as opposed to strings
   - Use a RteMarkedTextViewModel to return the RichText Field as a MarkedText Object
3. How to create a front-end application with [React](https://reactjs.org/) that implements Brightspot's MarkedText library.

## Running the example application

Refer to the [README](/README.md) at the root of the `react-examples` repository for details on running example applications in depth. Make sure you have the Docker instance for the example applications running, then follow the quick-start steps starting in the `marked-text` directory:

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

Publish an Article with the headline **Marked Text**. Once published, the front end will render this article.

> **Note:** You may change the headline to that of your choosing but be sure to change the variable 'path' on line 57 of Article.tsx in the app directory to match.

The library `@brightspot/marked-text` uses the `markedTextTraversal` function with two arguments, the body of `MarkedText` containing the text and marks, and a Visitor object with two callback functions provided from the app. The library is using a [post order traversal](https://www.geeksforgeeks.org/iterative-postorder-traversal).

## How everything works

JS Classes give you the power to customize Brightspot, add new classes, create endpoints, and much more with JavaScript (TypeScript). One powerful feature Brightspot provides is ease of content modeling and querying for content data with GraphQL.

Navigate to `brightspot/src/examples/marked-text`. This directory contains the JS Classes files that are uploaded to Brightspot.

`marked-text/app/src/components/Article.tsx`

- `Article` This component makes a call to the endpoint to return the article with the headline **Marked Text**, if the headline is different, change the path variable here. The return is passing the body of the Article (MarkedText) as well as the Visitor object to the `markedTextTraversal` call with two keys pointing to two callback functions, `visitText` and `visitMark`. Within each `visitText` a JSX element is returned with the text inside. Once a mark is reached, a React Element is created when the traversal reaches `visitMark` within which its children are placed.
- `ArticleMarkQuery` This is where the query is made for the article to return the headline and body that contains the text and marks (MarkedText).

#### Points to note in JS Classes files:

`Article.ts` This file has the following code to use a RTE field rather than one of the standard primitives used in other examples:

```js
  @RichText({
    toolbar: CustomRichTextToolbar.getClass(),
    lines: 5,
  })
```

`ArticleViewModel.ts` This file unlike some other examples, is utilizing an imported view model called `RteMarkedTextViewModel`, which takes the body to parse into text and marks:

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

Feel free to use any of the following in this example: bold, italics, underline, superscript, subscript, strikethrough, bullet points or even tables to later retrieve on the front end.

## Troubleshooting

Refer to the [Common Issues](/README.md) section in the respository README for assistance.
