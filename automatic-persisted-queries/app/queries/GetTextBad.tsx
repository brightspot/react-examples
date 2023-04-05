import { gql } from '@apollo/client'

// hardcoded query argument values not recommended
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
