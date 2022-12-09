export const ArticleMarkQuery = `
query ArticleMarkQuery($path: String) {
  Article(model: {path: $path}) {
    headline
    subheadline
    body {
      text
      marks {
        start
        end
        descendants
        data {
          ...HtmlElement
          ...ExternalContentElement
          ...ImageElement
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

fragment ExternalContentElement on ExternalContentRichTextElement {
  __typename
  type
  version
  title
  authorName
  authorUrl
  providerName
  providerUrl
  originalUrl
  thumbnailUrl
  thumbnailWidth
  thumbnailHeight
  markedHtml {
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
  withBorder
  withBackground
  stretched
}
`
