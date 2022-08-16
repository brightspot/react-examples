import { gql } from '@apollo/client'

const GET_NOTES = gql`
  query Search($arguments: [String]) {
    brightspot_example_cma_next_NoteQuery(
      where: { predicate: "* matches ?", arguments: $arguments }
    ) {
      items {
        text
        _id
        title
        _globals {
          com_psddev_cms_db_Content_ObjectModification {
            publishUser {
              username
            }
            publishDate
            updateUser {
              username
            }
            updateDate
          }
        }
      }
    }
  }
`

export default GET_NOTES
