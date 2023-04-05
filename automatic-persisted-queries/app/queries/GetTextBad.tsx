import { gql } from '@apollo/client'

// hardcoded query argument values are not recommended

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
