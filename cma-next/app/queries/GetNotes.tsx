import { gql } from '@apollo/client'

const GET_NOTES = gql`
query GetNotes {
  brightspot_example_NoteQuery {
    items {
      title
      text
      _id
      _globals {
        com_psddev_cms_db_Content_ObjectModification {
          updateUser {
            username
          }
        }
      }
    }
  }
}

`

export default GET_NOTES;