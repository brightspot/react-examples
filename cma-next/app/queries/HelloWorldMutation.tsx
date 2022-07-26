import { gql } from '@apollo/client'

export const HELLO_WORLD_UPDATE_TITLE_AND_TEXT = gql`
mutation HelloWorldMutation($toolUser: ToolUser, 
  $text: String, $title: String, $id: DiffId) {
  brightspot_example_HelloWorldSave(toolUser: $toolUser, 
    diffs: {brightspot_example_HelloWorldDiff: {text: $text, title: $title}, 
      id: $id}, id: $id) {
    title
    text
    _id
  }
}
`

export const HELLO_WORLD_UPDATE_TITLE = gql`
mutation HelloWorldMutation($toolUser: ToolUser, $title: String, $id: DiffId) {
  brightspot_example_HelloWorldSave(toolUser: $toolUser, 
    diffs: {brightspot_example_HelloWorldDiff: {title: $title}, id: $id}, id: $id) {
    title
    text
    _id
  }
}
`

export const HELLO_WORLD_UPDATE_TEXT = gql`
mutation HelloWorldMutation($toolUser: ToolUser, $text: String, $id: DiffId) {
  brightspot_example_HelloWorldSave(toolUser: $toolUser, 
    diffs: {brightspot_example_HelloWorldDiff: {text: $text}, id: $id}, id: $id) {
    title
    text
    _id
  }
}

`


