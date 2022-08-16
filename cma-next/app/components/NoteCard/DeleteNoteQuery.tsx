import { gql } from '@apollo/client'

const DELETE_NOTE = gql`
  mutation DeleteNote($id: ID = "") {
    brightspot_example_cma_next_NoteDelete(id: $id, permanently: true) {
      _id
      text
      title
    }
  }
`

export default DELETE_NOTE
