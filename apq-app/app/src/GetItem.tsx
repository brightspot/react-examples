import { gql } from '@apollo/client'

const GET_ITEM = gql`
  query GetItem($title: String) {
    ApqItem(model: { title: $title }) {
      title
      body
    }
  }
`

export default GET_ITEM
