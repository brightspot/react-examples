import { gql } from '@apollo/client'

/*
GraphQL variables are recommended since the resulting APQ hash does not change and therefore after being sent once to the server
will always result in one GET request. 
*/
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
