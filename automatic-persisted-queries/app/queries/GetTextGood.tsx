import { gql } from '@apollo/client'

// GraphQL variables are recommended

const GetTextGood = gql`
  query GetTextGood($text: String) {
    AviationAlphabetEndpoint {
      converter(text: $text) {
        output
        text
      }
    }
  }
`

export default GetTextGood
