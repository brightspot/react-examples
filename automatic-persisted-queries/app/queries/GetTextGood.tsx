import { gql } from '@apollo/client'

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
