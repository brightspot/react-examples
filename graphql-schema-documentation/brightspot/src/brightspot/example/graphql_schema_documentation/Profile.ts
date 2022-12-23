import JavaClass from 'brightspot-types/JavaClass'
import JavaField from 'brightspot-types/JavaField'

import Content from 'brightspot-types/com/psddev/cms/db/Content'
import DirectoryItem from 'brightspot-types/com/psddev/cms/db/Directory$Item'
import DisplayName from 'brightspot-types/com/psddev/dari/db/Recordable$DisplayName'
import Required from 'brightspot-types/com/psddev/dari/db/Recordable$Required'
import Site from 'brightspot-types/com/psddev/cms/db/Site'
import Utils from 'brightspot-types/com/psddev/dari/util/Utils'

@DisplayName({ value: 'Profile: GraphQL Schema Documentation' })
export default class Profile extends JavaClass(
  'brightspot.example.graphql_schema_documentation.Profile',
  Content,
  DirectoryItem
) {
  @JavaField(String)
  displayName: string

  @JavaField(String)
  favouriteSport: string

  @JavaField(String)
  favouriteBook: string

  @JavaField(String)
  favouriteSong: string

  @JavaField(String)
  favouriteFood: string;

  [`createPermalink(com.psddev.cms.db.Site)`](site: Site): string {
    return Utils.toNormalized(this.displayName)
  }
}
