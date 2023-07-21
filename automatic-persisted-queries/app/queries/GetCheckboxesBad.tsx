import { gql } from '@apollo/client'

/*
 dynamic strings in queries not recommended since the the APQ hash will change, resulting in 
 two queries being sent (a GET and then a POST)
*/

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
