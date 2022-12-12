import { gql } from '@apollo/client'

const GET_DOGS_AND_CATS = gql`
  query GetDogsAndCats {
    Dogs {
      dogs {
        _viewTemplate
        age
        breed
        color
        name
        userName
        gender
        description
        _style {
          bulletStyle
        }
      }
    }
    Cats {
      cats {
        _viewTemplate
        age
        breed
        name
        userName
        color
        gender
        description
        _style {
          bulletStyle
        }
      }
      _theme {
        NavBarAlignment
        bodyFont
        primaryColor
        primaryTextColor
        secondaryColor
        secondaryTextColor
        buttonStyle
      }
    }
  }
`

export default GET_DOGS_AND_CATS
