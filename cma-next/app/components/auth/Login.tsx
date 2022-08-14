import { gql } from '@apollo/client'

const CHECK_USER = gql`
  query VerifyUser($arguments: [String]) {
    com_psddev_cms_db_ToolUserQuery(
      where: { predicate: "username = ?", arguments: $arguments }
    ) {
      items {
        username
        name
        avatar {
          publicUrl
        }
        email
        getRoleName
      }
    }
  }
`

export default CHECK_USER
