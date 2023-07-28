# MarkedText - Advanced

This example application demonstrates querying MarkedText with complex rich-text element types (such as images and links), and rendering the results using Brightspot's MarkedText Library.

> **_Note:_** If you're new to MarkedText, refer to the introductory example [Marked Text](../marked-text).

## What you will learn

* [Query for MarkedText objects containing complex types of rich-text elements](#step-1-query-for-markedtext-objects-containing-complex-types-of-rich-text-elements)
* [Render complex rich-text elements with the MarkedText Library](#step-2-render-complex-rich-text-elements-with-the-markedtext-library)

## Running the example application

> **_Note:_** Just starting? Refer to the [README](/README.md) at the root of the `react-examples` repository for details on running example applications.

### Install dependencies

Run the following command from the `marked-text-advanced/app/` directory:

```sh
yarn
```
Wait until a message similar to `✨ Done in 5.03s` appears.

Generate types:

```sh
yarn codegen
```

## Using the example application

Before performing the following steps, do the following:

1. Publish an Article if you haven't already done so.
1. Add an image to the Article's rich-text field by clicking <img alt="Rich Text Image Icon" src="images/images-icon.png" width=20> in the RTE toolbar.
1. Add a hyperlink to the Article's rich-text body by highlighting text and clicking <img alt="Rich Text Link Icon" src="images/link-icon.png" width=20> in the RTE toolbar.

## How everything works

### Step 1. Query for MarkedText objects containing complex types of rich-text elements

- `ArticleContainer` calls the [fetchArticle](app/src/api/index.ts) function to return the Article. It passes the returned `MarkedText` body to the [MarkedTextComponent](app/src/components/MarkedText/MarkedTextComponent.tsx).
- `ArticleMarkQuery` The query for the article to return the headline, subheadline and body that contains the `MarkedText` object. The query has been setup to use [fragments](https://graphql.org/learn/queries/#fragments) to contain the rich text elements.

  ```gql
  query ArticleMarkQuery {
    Article {
      headline
      body {
        text
        marks {
          start
          end
          descendants
          data {
            ...HtmlElement
            ...ImageElement
            ...LinkElement
          }
        }
      }
    }
  }

  fragment HtmlElement on RteHtmlElement {
    __typename
    name
    attributes {
      name
      value
    }
  }

  fragment ImageElement on ImageRichTextElement {
    __typename
    fileUrl
    alt
    image {
      entries {
        key
        value
      }
    }
    caption
    credit
  }

  fragment LinkElement on LinkRichTextElement {
    __typename
    target
    href
    body
  }
  ```

### Step 2. Render complex rich text elements with the MarkedText library

The following components are in the [app/src/components/MarkedText](app/src/components/MarkedText) directory.

#### [MarkedTextComponent]((app/src/components/MarkedText/MarkedTextComponent.tsx))
This component imports the `markedTextTraversal` function from the Brightspot MarkedText library. This function takes two arguments: the body of the Article returned from the GraphQL API represented as a `MarkedText`, and an implementation of the `Visitor` object. The `Visitor` object contains two properties, `visitText` and `visitMark`, whose values are callback functions used to transform the `MarkedText` into the desired output.

In this example, during traversal, when running the `visitText` callback, the text is encapsulated within a [React `Fragment`](https://react.dev/reference/react/Fragment). When arriving at `visitMark`, the callback function uses the `__typename` property inside the `mark.data` property to map each possible rich-text element to the corresponding component `HtmlRichTextComponent`, `ImageRichTextComponent` and `LinkRichTextComponent`.

```js
markedTextTraversal(markedText, {
  visitText: (text) => <Fragment key={key++}>{text}</Fragment>,
  visitMark: (mark, children: ReactNode[]) => {
    switch (mark.data.__typename) {
      case 'RteHtmlElement':
        return (
          <HtmlRichTextComponent
            key={key++}
            markData={mark.data as RteHtmlElement}
            children={children}
          />
        )
      case 'ImageRichTextElement':
        return (
          <ImageRichTextComponent
            key={key++}
            markData={mark.data as ImageRichTextElement}
          />
        )
      case 'LinkRichTextElement':
        return (
          <LinkRichTextComponent
            key={key++}
            markData={mark.data as LinkRichTextElement}
            children={children}
          />
        )
      default:
        return <Fragment key={key++}></Fragment>
    }
  },
})
```

#### [HtmlRichTextComponent](app/src/components/MarkedText/HtmlRichTextComponent.tsx)
This component uses helper functions to check if `markData` contains a void element, merge attributes into a single key-value object, and convert attribute strings into [React-compliant camelCase](https://react.dev/learn/writing-markup-with-jsx#3-camelcase-salls-most-of-the-things).

#### [ImageRichTextElement](app/src/components/MarkedText/ImageRichTextElement.tsx)

This component has a similar helper function as `HtmlRichTextComponent` to merge image attributes into a single key-value object.

> **_Note:_** The [`HtmlRichTextComponent`](app/src/components/MarkedText/HtmlRichTextElement.tsx) and [`LinkRichTextElement`](app/src/components/MarkedText/LinkRichTextElement.tsx) are passed `children`, but [`ImageRichTextElement`](app/src/components/MarkedText/ImageRichTextElement.tsx) are not. This changes based on your rich text element, whether they should ever have children or not.

## Troubleshooting

Refer to the [Common Issues](/README.md) section in the respository README for assistance.
