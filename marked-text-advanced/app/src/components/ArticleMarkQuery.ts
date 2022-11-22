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
          ... on ImageRichTextElement {
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
        }
      }
    }
  }
}
`
