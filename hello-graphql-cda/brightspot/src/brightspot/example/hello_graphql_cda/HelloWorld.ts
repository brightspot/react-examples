import JavaClass from 'brightspot-types/JavaClass'
import JavaField from 'brightspot-types/JavaField'

import DisplayName from 'brightspot-types/com/psddev/dari/db/Recordable$DisplayName'
import JavaRequired from 'brightspot-types/com/psddev/dari/db/Recordable$Required'
import Utils from 'brightspot-types/com/psddev/dari/util/Utils'

import Content from 'brightspot-types/com/psddev/cms/db/Content'
import DirectoryItem from 'brightspot-types/com/psddev/cms/db/Directory$Item'
import Site from 'brightspot-types/com/psddev/cms/db/Site'

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
    return Utils.toNormalized(this.title)
  }
}
