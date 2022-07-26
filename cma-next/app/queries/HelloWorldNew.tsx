import { gql } from '@apollo/client'

const HELLO_WORLD_NEW = gql`
mutation HelloWorldMutation($toolUser: ToolUser, $title: String, $text: String = "") 
{
  brightspot_example_HelloWorldSave(toolUser: $toolUser, 
    diffs: {brightspot_example_HelloWorldDiff: {title: $title, text: $text}}) {
    title
    text
    _id
  }
}
`

export default HELLO_WORLD_NEW