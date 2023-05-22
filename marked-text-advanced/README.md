# MarkedText - Advanced

Marked Text is a JSON representation of a Brightspot RTE field. It contains all the metadata for rich-text objects and is structured to account for nested tags, represented cleanly without prior knowledge of the entire state. This makes it well-suited to the GraphQL ecosystem, and allows for maintaining the integrity of its type system.

> _Note_: If you're new to Marked Text, please refer to the example [Marked Text: Intro](../marked-text).

This example demonstrates querying Marked Text with more complex rich text element types (e.g. images and link) and rendering them using Brightspot's Marked Text Library.

## What you will learn

1. [Query for Marked Text objects containing complex types of Rich Text Elements](#1-query-for-marked-text-objects-containing-complex-types-of-rich-text-elements)
2. [Render complex rich text elements with the Marked Text Library](#2-render-complex-rich-text-elements-with-the-marked-text-library)

## Running the example application

> **_Note_** Just starting? Refer to the [README](/README.md) at the root of the `react-examples` repository for details on running example applications in depth.

### Install dependencies

Run the following command from the `marked-text-advanced/app` directory:

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

To use the added rich text elements within the RTE field:

- Image rich text element select the images icon <img alt="Rich Text Image Icon" src="images/images-icon.png" width=20>.

- Link rich text element, highlight text you would like to link and select the link icon <img alt="Rich Text Link Icon" src="images/link-icon.png" width=20>.

## How everything works

`marked-text-advanced/app/src/components/Article`

#### 1. Query for Marked Text objects containing complex types of Rich Text Elements

- `ArticleContainer` calls the [fetchArticle](app/src/api/index.ts) function to return the Article. It passes the returned Marked Text body to the [MarkedTextComponent](app/src/components/MarkedText/MarkedTextComponent.tsx)
- `ArticleMarkQuery` The query for the article to return the headline, subheadline and body that contains the Marked Text object. The query has been setup to use [fragments](https://graphql.org/learn/queries/#fragments) to contain the rich text elements:

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

#### 2. Render complex rich text elements with the Marked Text Library

[app/src/components/MarkedText](app/src/components/MarkedText) directory:

- `MarkedTextComponent` This component imports the `markedTextTraversal` function from the Brightspot Marked Text library. This function takes two arguments: the body of the Article returned from the GraphQL API represented as a MarkedText, and an implementation of the Visitor object. The Visitor object contains two properties, `visitText` and `visitMark`, whose values are callback functions used to transform the MarkedText into the desired output.

  The `visitText` callback is executed when text is reached. The text will always be a leaf node of the tree. Implementations can transform the text into an object of the implementors choosing and return it. If the text has a parent `Mark`, the transformed text will be returned as array item when the parent mark is visited. If null is returned, it will be omitted from the result.

  The `visitMark` callback is executed when a `Mark` is reached. This is a post-order traversal, the children array contains the already visited and transformed `text` and `Mark` nodes. Implementations can transform the `mark` and `children` into an object of the implementors choosing and return it. If the `mark` has a parent `Mark`, the transformed `Mark` will be returned as a an array item when the parent `mark` is visited.

  In this example, during traversal, when arriving at `visitText`, the text placed within a [React `Fragment`](https://react.dev/reference/react/Fragment). When arriving at `visitMark`, the call back function uses the `__typename` property that is inside of the `data` property of the `mark` to map each possible rich text element to the corresponding Component i.e. `HtmlRichTextComponent`, `ImageRichTextComponent` and `LinkRichTextComponent`:

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

## Troubleshooting

Refer to the [Common Issues](/README.md) section in the respository README for assistance.
