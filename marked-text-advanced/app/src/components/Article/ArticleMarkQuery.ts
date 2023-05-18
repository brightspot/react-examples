export const ArticleMarkQuery = `
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
  href
  target
}
`
