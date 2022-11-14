export const ArticleMarkQuery = `
query ArticleMarkQuery($path: String) {
  Article(model: {path: $path}) {
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
          ... on ExternalContentRichTextElement {
            __typename
            type
            version
            title
            authorName
            authorUrl
            providerName
            providerUrl
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
          ... on ImageRichTextElement {
            __typename
            withBorder
            withBackground
            stretched
            fileUrl
            alt
          }
        }
      }
    }
  }
}
`
