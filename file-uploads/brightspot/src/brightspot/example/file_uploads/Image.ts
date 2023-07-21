import JavaClass from 'brightspot-types/JavaClass'
import JavaField from 'brightspot-types/JavaField'

import Content from 'brightspot-types/com/psddev/cms/db/Content'
import MimeTypes from 'brightspot-types/com/psddev/dari/db/Recordable$MimeTypes'
import StorageItem from 'brightspot-types/com/psddev/dari/util/StorageItem'

export default class Image extends JavaClass(
  'brightspot.example.file_uploads.Image',
  Content
) {
  @JavaField(String)
  name?: string

  @JavaField(StorageItem)
  @MimeTypes({ value: '+image/' })
  file: StorageItem

  beforeSave(): void {
    if (!this.name) {
      const url = this.file.getSecurePublicUrl()
      this.name = url.slice(url.lastIndexOf('/')).slice(1)
    }
  }
}
