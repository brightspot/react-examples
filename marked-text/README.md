# Marked Text

Marked Text is a JSON representation of a Brightspot rich-text-editor (RTE) field, which allows authors to combine plain text, formatting, and embedded objects like images and videos. Marked Text contains all the metadata for rich-text objects and is structure to account for nested tags, represented cleanly without prior knowledge of the entire state. This makes it well-suited to the GraphQL ecosystem.

While this flattened data structure is an asset, it requires handling to render on any front-end and to be customized for greater flexibility. Brightspot developed the [Marked Text Library](#brightspots-marked-text-library), which provides a solution for handling and rendering Marked Text along with the ability to customize its appearance and functionality.

## What you will learn

1. [Creating content types that can use a RTE field](#1-creating-content-types-that-can-use-a-rte-field)
2. [Query for a MarkedText](#2-query-for-markedtext) object via GraphQL.
3. Use Brightspot's [MarkedText library](#3-using-brightspots-marked-text-library).

## Running the example application

> **_Note_** Just starting? Refer to the [README](/README.md) at the root of the `react-examples` repository for details on running example applications in depth.

### Install dependencies

Run the following command from the `marked-text/app` directory:

```sh
$ yarn
```

```
[1/4] 🔍 Resolving packages...
[2/4] 🚚 Fetching packages...
[3/4] 🔗 Linking dependencies...
[4/4] 🔨 Building fresh packages...
✨ Done in 5.03s.
```

## Using the example application

Publish an Article. Once published, the front end will render this article.

## How everything works

#### 1. Creating content types that can use a RTE field

[CustomRichTextToolbar.ts](brightspot/src/brightspot/example/marked_text/CustomRichTextToolbar.ts) This is the custom toolbar used in this example, setup to use rich-text HTML elements.

[Article.ts](brightspot/src/brightspot/example/marked_text/Article.ts): This is the data modal for the `Article` content type used to create the Article.

- The body of the content type uses the `@RichText` decorator to mark the field as a rich-text field, importing the `CustomRichToolbar` as its toolbar:

```js
  @RichText({
    toolbar: CustomRichTextToolbar.getClass(),
    inline: false,
    lines: 5,
  })
```

[ArticleViewModel.ts](brightspot/src/brightspot/example/marked_text/ArticleViewModel.ts) The view model for the `Article`.

- `RteMarkedText` This class has a method `getIntanceFromRichText` that takes the model as well as the rich text field from the model, to return a `RteMarkedText` object. It does this by converting html from the field and running them through rich text preprocessors.
- `RteMarkedTextViewModel` Rather than the body returning a string, it returns a `RteMarkedTextViewModel` which will represent the marked text object that is sent to the front end via the GraphQL response. This field returns its `text` and `marks`.

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

#### 2. Query for MarkedText:

[Article.tsx](app/src/components/Article.tsx). This file contains the front-end logic to focus on in this example.

- [ArticleMarkQuery](app/src/components/Article.tsx#L17) This variable holds the query made for the article to return the headline and body that contains the text and marks (MarkedText) based on the view model:

```
const ArticleMarkQuery = `
  query ArticleMarkedTextQuery {
  Article {
    headline
    body {
      text
      marks {
        start
        end
        descendants
        data {
          ... on RteHtmlElement {
            __typename
            name
            attributes {
              name
              value
            }
          }
        }
      }
    }
  }
}
`
```

#### 3. Using Brightspot's Marked Text Library:

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

The library `@brightspot/marked-text` serves `markedTextTraversal`, a function that requires two arguments, the `MarkedText` object containing the text and marks (shown above), and a Visitor object with two callback functions provided from the implementor.

- [Article](app/src/components/Article.tsx#L73) This component makes a call to the endpoint to return the article. The return is passing the body of the Article (MarkedText) as well as the Visitor object to the `markedTextTraversal` function import from the Brightspot Marked Text library:

```js
{markedTextTraversal(article?.articleData?.body, {
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
})}
```

`markedTextTraversal` is a function that accepts a Marked Text object and a Marked Text Visitor object as input. It uses the visitor object to perform a [post order](https://www.geeksforgeeks.org/iterative-postorder-traversal) tree traversal algorithm on the Marked Text object, and invokes the visitor's callback methods to transform the nodes of the tree. It returns an array of transformed root nodes based on the visitor's implementation.

Additionally, by providing a unified and customizable interface for traversing and transforming Marked Text, this function can simplify the integration of Marked Text with React or any other front-end library or framework.

## Troubleshooting

Refer to the [Common Issues](/README.md) section in the respository README for assistance.
