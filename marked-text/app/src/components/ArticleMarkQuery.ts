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
            }
            }
        }
    }
`
