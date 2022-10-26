import JavaClass from 'brightspot-types/JavaClass'
import JavaField from 'brightspot-types/JavaField'

import Content from 'brightspot-types/com/psddev/cms/db/Content'
import Indexed from 'brightspot-types/com/psddev/dari/db/Recordable$Indexed'
import StorageItem from 'brightspot-types/com/psddev/dari/util/StorageItem'
import ReadOnly from 'brightspot-types/com/psddev/cms/db/ToolUi$ReadOnly'

export default class Image extends JavaClass(
  'brightspot.example.images.Image',
  Content
) {
  @Indexed({ unique: true })
  @ReadOnly
  @JavaField(String)
  title: string

  @JavaField(StorageItem)
  file: StorageItem

  @JavaField(String)
  altText: string

  @ReadOnly
  @JavaField(Number)
  height: number

  @ReadOnly
  @JavaField(Number)
  width: number

  beforeSave() {
    const metadata = this.file.getMetadata()
    this.title = (metadata.get('originalFilename') as string) || ''
    this.height = metadata.get('height') as number
    this.width = metadata.get('width') as number
  }
}
