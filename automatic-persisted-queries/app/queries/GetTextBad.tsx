import { gql } from '@apollo/client'

/* 
hardcoded query argument values are not recommended since the the APQ hash will change, 
resulting in two queries being sent (a GET and then a POST)
*/

const GetTextBad = (text: string) => gql`
query GetTextBad {
  AviationAlphabetEndpoint {
    converter(text: "${text}") {
      output
      text
    }
  }
}
`

export default GetTextBad
