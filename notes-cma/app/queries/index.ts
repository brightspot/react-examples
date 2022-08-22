import { gql } from '@apollo/client'

const CREATE_AND_UPDATE_NOTE = gql`
  mutation CreateAndUpdateNote(
    $toolUser: ToolUser
    $id: DiffId
    $description: String
    $title: String
  ) {
    brightspot_example_cma_next_NoteSave(
      toolUser: $toolUser
      diffs: {
        id: $id
        brightspot_example_cma_next_NoteDiff: {
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
  query GetNotes($arguments: [String], $offset: Long = 0) {
    brightspot_example_cma_next_NoteQuery(
      where: { predicate: "* matches ?", arguments: $arguments }
      sorts: { order: descending, options: "title" }
      offset: $offset
      limit: 2
    ) {
      items {
        description
        _id
        title
        _globals {
          com_psddev_cms_db_Content_ObjectModification {
            publishDate
            updateDate
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
        hasNext
        limit
      }
    }
  }
`

const DELETE_NOTE = gql`
  mutation DeleteNote($id: ID = "") {
    brightspot_example_cma_next_NoteDelete(id: $id, permanently: true) {
      _id
      description
      title
    }
  }
`

export { CREATE_AND_UPDATE_NOTE, GET_NOTES, DELETE_NOTE }
