import { gql } from '@apollo/client'

 // dynamic strings in queries not recommended

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
