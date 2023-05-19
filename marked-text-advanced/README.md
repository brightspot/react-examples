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

`marked-text-advanced/app/src/components/MarkedText`

- `MarkedTextComponent` This component passes the body of the Article (MarkedText) as well as the Visitor object to the `markedTextTraversal` function import from the Brightspot Marked Text library, it handles which rich-text component to use based on the mark data's type. This is how the callback function for `visitMark` knows what to return:

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

- [HtmlRichTextComponent](app/src/components/MarkedText/HtmlRichTextComponent.tsx) This component is set up similarly to the render function in Marked Text: Intro, though there are extra helper functions added to deal with the attributes added in this example.

- [ImageRichTextComponent](app/src/components/MarkedText/ImageRichTextComponent.tsx) This compenent expect the type `ImageRichTextElement` defined in the [types file](app/src/types.ts) to then destructure the properties to render. Similarly to the `HtmlRichTextComponent`, it has a helper to deal with the property `image.entries` which is an array of keys and values.

- [LinkRichTextComponent](app/src/components/MarkedText/LinkRichTextComponent.tsx) This compenent expect the type `LinkRichTextElement` defined in the [types file](app/src/types.ts) to then destructure the properties to render.

## Troubleshooting

Refer to the [Common Issues](/README.md) section in the respository README for assistance.
