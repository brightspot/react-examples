import { gql } from '@apollo/client'

export default gql`
  query GetFunFactById($id: ID) {
    FunFact(model: { id: $id }) {
      text
    }
  }
`
