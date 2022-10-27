import JavaClass from 'brightspot-types/JavaClass'
import JavaField from 'brightspot-types/JavaField'

import Content from 'brightspot-types/com/psddev/cms/db/Content'
import DisplayName from 'brightspot-types/com/psddev/dari/db/Recordable$DisplayName'
import DirectoryItem from 'brightspot-types/com/psddev/cms/db/Directory$Item'
import JavaRequired from 'brightspot-types/com/psddev/dari/db/Recordable$Required'
import Long from 'brightspot-types/java/lang/Long'
import Site from 'brightspot-types/com/psddev/cms/db/Site'
import Utils from 'brightspot-types/com/psddev/dari/util/Utils'
import Indexed from 'brightspot-types/com/psddev/dari/db/Recordable$Indexed'

@DisplayName({ value: 'Member (REST)' })
export default class Member extends JavaClass(
  'brightspot.example.restification.Member',
  Content,
  DirectoryItem
) {
  @JavaRequired
  @JavaField(String)
  @Indexed
  displayName?: string

  @JavaField(String)
  firstName?: string

  @JavaField(String)
  lastName?: string

  @JavaField(String)
  email?: string

  @JavaField(Long)
  phoneNumber?: number;

  [`createPermalink(com.psddev.cms.db.Site)`](site: Site): string {
    return Utils.toNormalized(this.displayName)
  }
}
