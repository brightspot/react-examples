import JavaClass from '../../../../brightspot-types/JavaClass'
import Content from '../../../../brightspot-types/com/psddev/cms/db/Content'
import JavaField from '../../../../brightspot-types/JavaField'
import JavaRequired from '../../../../brightspot-types/com/psddev/dari/db/Recordable$Required'
import Site from '../../../../brightspot-types/com/psddev/cms/db/Site'
import DirectoryItem from '../../../../brightspot-types/com/psddev/cms/db/Directory$Item'
import DisplayName from '../../../../brightspot-types/com/psddev/dari/db/Recordable$DisplayName'

@DisplayName({ value: 'Hello GraphQL CDA' })
export default class HelloWorld extends JavaClass(
  'brightspot.example.hello_graphql_cda.HelloWorld',
  Content,
  DirectoryItem
) {
  @JavaRequired
  @JavaField(String)
  title?: string

  @JavaField(String)
  description?: string

  createPermalink(site: Site): string {
    const Utils = Java.type('com.psddev.dari.util.Utils')
    return Utils.toNormalized(this.title)
  }
}
