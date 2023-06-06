import { gql } from '@apollo/client'

const GET_ARTICLES = gql`
  query GetArticles {
    ThemingArticles {
      themingArticles {
        _viewTemplate
        _style {
          showHappyFace
          happyFaceColor
        }
        body
        headline
        slug
      }
    }
    _Theme {
      bodyFont
      alignment
      primaryColor
      primaryTextColor
      secondaryColor
      secondaryTextColor
    }
  }
`

export default GET_ARTICLES
