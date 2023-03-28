import { gql } from '@apollo/client'

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
