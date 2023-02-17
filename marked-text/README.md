# Marked Text

Marked Text is a JSON representation of a Brightspot rich-text-editor field. It contains all of the metadata for rich-text objects. The structure of the MarkedText object accounts for nested tags, represented cleanly without prior knowledge of the entire state. This is conducive to the GraphQL ecosystem.

This flattened data structure is an asset but needs to be handled to render to any front end and with the flexibility to be customized. This example introduces [Brightspot's Marked Text Library](#brightspots-marked-text-library) as a solution.

## What you will learn

1. How to query for MarkedText via GraphQL.
2. How to set content types and GraphQL in Brightspot that can use a RTE field
3. How to create a front-end application with [React](https://reactjs.org/) that uses Brightspot's MarkedText library.

## Running the example application

Refer to the [README](/README.md) at the root of the `react-examples` repository for details on running example applications in depth. Make sure you have the Docker instance for the example applications running, then follow the quick-start steps starting in the `marked-text` directory:

To upload JS Classes in Brightspot (http://localhost/cms):

```sh
cd brightspot
yarn
npx brightspot types download
npx brightspot types upload src

```

To run the front end, run the following commands from the `marked-text/app` directory::

```sh
cd app
yarn
yarn start
```

The front-end application opens automatically in the browser.

## Using the example application

Publish an Article. Once published, the front end will render this article.

## How everything works

JS Classes give you the power to customize Brightspot, add new classes, create endpoints, and much more with JavaScript (TypeScript). One powerful feature Brightspot provides is ease of content modeling and querying for content data with GraphQL.

`brightspot/src/examples/marked-text`. This directory contains the JS Classes files that are uploaded to Brightspot:

`Article.ts` This is the content type used to create the Article.

- The body of the content type uses `@RichText` decorator to change this to a rich-text field, importing the `CustomRichToolbar` as its toolbar:

```js
  @RichText({
    toolbar: CustomRichTextToolbar.getClass(),
    inline: false,
    lines: 5,
  })
```

`CustomRichTextToolbar.ts` This is the custom toolbar for this example, setup to use rich-text HTML elements.

`ArticleViewModel.ts`:

- `RteMarkedText` This class has a method `getIntanceFromRichText` that takes the model (Article) and the rich text field from the model, to return a `RteMarkedText` object. It does this by converting html from the field and running them through rich text preprocessors.
- `RteMarkedTextViewModel` Rather than the body returning a string, it returns a `RteMarkedTextViewModel` which will represent the marked text object that is passed to the front end via the GraphQL response. This view model returns its `text` and `marks`.

```js
  @JavaMethodParameters()
  @JavaMethodReturn(RteMarkedTextViewModel)
  getBody(): RteMarkedTextViewModel {
    return this.createView(
      RteMarkedTextViewModel.class,
      new RteMarkedText(this.model, this.model.body)
      RteMarkedText.getInstanceFromRichText(this.model, this.model.body)
    )
  }
```

`marked-text/app/src/components/Article.tsx`. This file contains the front-end logic to focus on in this example.

- `Article` This component makes a call to the endpoint to return the article. The return is passing the body of the Article (MarkedText) as well as the Visitor object to the `markedTextTraversal` function import from the Brightspot Marked Text library.
- `ArticleMarkQuery` This is where the query is made for the article to return the headline and body that contains the text and marks (MarkedText).

## Brightspot's Marked Text Library

Consider the following Marked Text object from the API response:

```json
{
  "text": "Brightspot",
  "marks": [
    {
      "start": 0,
      "end": 10,
      "descendants": 1,
      "data": {
        "__typename": "RteHtmlElement",
        "name": "p",
        "attributes": [
          {
            "name": "class",
            "value": "cms-textAlign-center"
          }
        ]
      }
    },
    {
      "start": 0,
      "end": 10,
      "descendants": 0,
      "data": {
        "__typename": "RteHtmlElement",
        "name": "b",
        "attributes": []
      }
    }
  ]
}
```

Brightspot provides a function that makes it easy to render the Marked Text data structure.

The library `@brightspot/marked-text` serves `markedTextTraversal`, a function that requires two arguments, the `MarkedText` object containing the text and marks (shown above), and a Visitor object with two callback functions provided from the app.

`markedTextTraversal`:

```js
export function markedTextTraversal<M extends T, T extends N, N>(
  text: MarkedText | undefined,
  visitor: MarkedTextVisitor<M, T, N>
): N[] {
  return text ? new MarkedTextPostOrderTraversal(text, visitor).traverse() : []
}
```

This example application's Visitor object, `visitText` returns a JSX Fragment with the text inside. `visitMark` returns a React Element within which its children are placed:

```js
{
  visitText: (text) => <Fragment key={key++}>{text}</Fragment>,
  visitMark: (mark, children: ReactNode[]) => {
    const element = mark.data as HtmlElement
    const isVoidElement = voidElements.includes(element.name)

    const attrs = element.attributes.reduce((a, b) => {
      const n: string = attrSwitch(b.name)
      return { ...a, [n]: b.value }
    }, {})

    return React.createElement(
      element.name,
      { ...attrs, key: `k-${key++}` },
      isVoidElement ? null : children
    )
  },
}
```

The library is using a [post order traversal](https://www.geeksforgeeks.org/iterative-postorder-traversal). As the data structure is flattened, it's only appropriate to use this method of traversal and it also simplifies the usage with React or any front-end library/framework.

## Troubleshooting

Refer to the [Common Issues](/README.md) section in the respository README for assistance.
