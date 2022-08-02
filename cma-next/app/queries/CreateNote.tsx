import { gql } from '@apollo/client'

const NEW_NOTE = gql`
mutation NewNote($toolUser: ToolUser, $text: String = "", $title: String="") {
  brightspot_example_NoteSave(toolUser: $toolUser, diffs: {brightspot_example_NoteDiff: {text: $text, title: $title}}) {
    _id
    text
    title
  }
}

`

export default NEW_NOTE