import { gql } from "@apollo/client";

const NEW_NOTE = gql`
  mutation NewNote(
    $toolUser: ToolUser
    $text: String = ""
    $title: String = ""
  ) {
    brightspot_example_cma_next_NoteSave(
      toolUser: $toolUser
      diffs: {
        brightspot_example_cma_next_NoteDiff: { text: $text, title: $title }
      }
    ) {
      text
      title
      _id
    }
  }
`;

export default NEW_NOTE;
