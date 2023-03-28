import { gql } from '@apollo/client'

const GetCheckboxesBad = (checkedLetters: string) => gql`
query GetCheckboxesBad {
  AviationAlphabetEndpoint {
    codes {
      ${checkedLetters}
    }
  }
}
`

export default GetCheckboxesBad
