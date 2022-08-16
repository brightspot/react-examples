import { gql } from '@apollo/client'

const CREATE_AND_UPDATE_NOTE = gql`
  mutation UpdateNoteTitleAndText(
    $toolUser: ToolUser
    $id: DiffId
    $text: String
    $title: String
  ) {
    brightspot_example_cma_next_NoteSave(
      toolUser: $toolUser
      diffs: {
        id: $id
        brightspot_example_cma_next_NoteDiff: { text: $text, title: $title }
      }
      id: $id
    ) {
      _id
      text
      title
      _globals {
        com_psddev_cms_db_Content_ObjectModification {
          updateDate
          updateUser {
            username
          }
          publishDate
          publishUser {
            username
          }
        }
      }
    }
  }
`

export default CREATE_AND_UPDATE_NOTE
