import JavaClass from 'brightspot-types/JavaClass'
import JavaField from 'brightspot-types/JavaField'
import DisplayName from 'brightspot-types/com/psddev/dari/db/Recordable$DisplayName'
import Content from 'brightspot-types/com/psddev/cms/db/Content'
import Indexed from 'brightspot-types/com/psddev/dari/db/Recordable$Indexed'

@DisplayName({ value: 'Hello GraphQL React' })
export default class HelloGraphqlReact extends JavaClass(
  'brightspot.example.hello_graphql_react.HelloGraphqlReact',
  Content
) {
  @Indexed({ unique: true })
  @JavaField(String)
  name?: string

  @JavaField(String)
  message?: string
}
