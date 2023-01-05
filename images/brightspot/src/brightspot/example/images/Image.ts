import JavaClass from 'brightspot-types/JavaClass'
import JavaField from 'brightspot-types/JavaField'

import Content from 'brightspot-types/com/psddev/cms/db/Content'
import Indexed from 'brightspot-types/com/psddev/dari/db/Recordable$Indexed'
import StorageItem from 'brightspot-types/com/psddev/dari/util/StorageItem'
import ReadOnly from 'brightspot-types/com/psddev/cms/db/ToolUi$ReadOnly'
import UUID from 'brightspot-types/java/util/UUID'

export default class Image extends JavaClass(
  'brightspot.example.images.Image',
  Content
) {
  @Indexed({ unique: true })
  @JavaField(String)
  title: string

  @JavaField(StorageItem)
  file: StorageItem

  @JavaField(String)
  altText: string

  @ReadOnly
  @JavaField(UUID)
  id: UUID

  beforeSave(){
    this.id = this.getState().getId()
  }
}
