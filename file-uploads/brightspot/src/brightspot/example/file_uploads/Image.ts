import JavaClass from 'brightspot-types/JavaClass'
import JavaField from 'brightspot-types/JavaField'

import Content from 'brightspot-types/com/psddev/cms/db/Content'
import StorageItem from 'brightspot-types/com/psddev/dari/util/StorageItem'
import MimeTypes from 'brightspot-types/com/psddev/dari/db/Recordable$MimeTypes'

export default class Image extends JavaClass(
  'brightspot.example.file_uploads.Image',
  Content
) {
  @JavaField(StorageItem)
  @MimeTypes({ value: '+image/' })
  file: StorageItem
}
