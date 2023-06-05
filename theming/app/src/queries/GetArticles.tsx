import { gql } from '@apollo/client'

const GET_ARTICLES = gql`
  query GetArticles {
    ThemingArticles {
      themingArticles {
        _viewTemplate
        _style {
          alignment
          sampleColor
          sampleNumber
          showHappyFace
        }
        body
        headline
        slug
      }
    }
    _Theme {
      bodyFont
      buttonStyle
      primaryColor
      primaryTextColor
      secondaryColor
      secondaryTextColor
    }
  }
`

export default GET_ARTICLES
