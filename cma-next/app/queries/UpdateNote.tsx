import { gql } from '@apollo/client'

export const UPDATE_NOTE = gql`
mutation UpdateNoteTitleAndText($toolUser: ToolUser, $id: DiffId, $text: String, $title: String) {
  brightspot_example_NoteSave(toolUser: $toolUser, diffs: {id: $id, brightspot_example_NoteDiff: {text: $text, title: $title}}, id: $id) {
    _id
    text
    title
  }
}
`

