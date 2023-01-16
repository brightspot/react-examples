import JavaClass from 'brightspot-types/JavaClass'
import JavaField from 'brightspot-types/JavaField'

import Content from 'brightspot-types/com/psddev/cms/db/Content'
import DirectoryItem from 'brightspot-types/com/psddev/cms/db/Directory$Item'
import DisplayName from 'brightspot-types/com/psddev/dari/db/Recordable$DisplayName'
import Site from 'brightspot-types/com/psddev/cms/db/Site'
import Utils from 'brightspot-types/com/psddev/dari/util/Utils'
import UUID from 'brightspot-types/java/util/UUID'
import ReadOnly from 'brightspot-types/com/psddev/cms/db/ToolUi$ReadOnly'

@DisplayName({ value: 'Memo: CORs Configuration' })
export default class Memo extends JavaClass(
  'brightspot.example.cors_configuration.Memo',
  Content,
  DirectoryItem
) {
  @JavaField(String)
  subject: string

  @JavaField(String)
  message: string

  @ReadOnly
  @JavaField(UUID)
  id: UUID;

  [`createPermalink(com.psddev.cms.db.Site)`](site: Site): string {
    return Utils.toNormalized(this.subject)
  }

  beforeSave() {
    console.log(`🐱 ${this['getState()']().getId()}`)
    this.id = this.getState().getId()
  }
  afterSave() {
    console.log(`🐱 ${this['getState()']().getId()}`)
    this.id = this.getState().getId()
  }
}
