export const ArticleMarkQuery = `
query ArticleMarkQuery($path: String) {
  Article(model: {path: $path}) {
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
