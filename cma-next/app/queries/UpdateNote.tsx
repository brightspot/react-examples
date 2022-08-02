import { gql } from '@apollo/client'

export const UPDATE_NOTE_TITLE_AND_TEXT = gql`
mutation UpdateNoteTitleAndText($toolUser: ToolUser, $id: DiffId = "", $text: String = "", $title: String = "") {
  brightspot_example_NoteSave(toolUser: $toolUser, diffs: {id: $id, brightspot_example_NoteDiff: {text: $text, title: $title}}, id: $id) {
    _id
    text
    title
  }
}
`

export const UPDATE_NOTE_TITLE = gql`
mutation UpdateNoteTitle($toolUser: ToolUser, $id: DiffId = "", $title: String = "") {
  brightspot_example_NoteSave(toolUser: $toolUser, diffs: {id: $id, brightspot_example_NoteDiff: {title: $title}}, id: $id) {
    _id
    text
    title
  }
}
`

export const UPDATE_NOTE_TEXT = gql`
mutation UpdateNoteText($toolUser: ToolUser, $id: DiffId = "", $text: String = "") {
  brightspot_example_NoteSave(toolUser: $toolUser, diffs: {id: $id, brightspot_example_NoteDiff: {text: $text}}, id: $id) {
    _id
    text
    title
  }
}
`


