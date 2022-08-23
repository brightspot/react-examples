import JavaClass from 'brightspot-types/JavaClass'
import JavaField from 'brightspot-types/JavaField'
import DisplayName from 'brightspot-types/com/psddev/dari/db/Recordable$DisplayName'
import JavaRequired from 'brightspot-types/com/psddev/dari/db/Recordable$Required'
import Content from 'brightspot-types/com/psddev/cms/db/Content'

@DisplayName({ value: 'Hello GraphQL CDA' })
export default class HelloWorld extends JavaClass(
  'brightspot.example.hello_graphql_cda.HelloWorld',
  Content
) {
  @JavaRequired
  @JavaField(String)
  title?: string

  @JavaField(String)
  description?: string
}
