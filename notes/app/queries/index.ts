import { gql } from '@apollo/client'

const CREATE_AND_UPDATE_NOTE = gql`
  mutation CreateAndUpdateNote(
    $toolUser: ToolUser
    $id: DiffId
    $description: String
    $title: String
  ) {
    brightspot_example_notes_NoteSave(
      toolUser: $toolUser
      diffs: {
        id: $id
        brightspot_example_notes_NoteDiff: {
          description: $description
          title: $title
        }
      }
      id: $id
    ) {
      _id
      description
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

const GET_NOTES = gql`
  query GetNotes(
    $arguments: [String]
    $predicate: String = "* matches ?"
    $offset: Long = 0
    $limit: Int = 10
  ) {
    brightspot_example_notes_NoteQuery(
      sorts: { order: descending, options: "cms.content.updateDate" }
      where: { predicate: $predicate, arguments: $arguments }
      offset: $offset
      limit: $limit
    ) {
      items {
        title
        description
        _id
        _globals {
          com_psddev_cms_db_Content_ObjectModification {
            updateDate
            publishDate
            publishUser {
              username
            }
            updateUser {
              username
            }
          }
        }
      }
      pageInfo {
        count
        limit
      }
    }
  }
`

const DELETE_NOTE = gql`
  mutation DeleteNote($id: ID = "") {
    brightspot_example_notes_NoteDelete(id: $id, permanently: true) {
      _id
      description
      title
    }
  }
`

export { CREATE_AND_UPDATE_NOTE, GET_NOTES, DELETE_NOTE }
