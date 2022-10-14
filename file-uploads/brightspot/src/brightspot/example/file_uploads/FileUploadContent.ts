import JavaClass from 'brightspot-types/JavaClass'
import JavaField from 'brightspot-types/JavaField'

import Content from 'brightspot-types/com/psddev/cms/db/Content'
import StorageItem from 'brightspot-types/com/psddev/dari/util/StorageItem'

export default class FileUploadContent extends JavaClass(
  'brightspot.example.file_uploads.FileUploadContent',
  Content
) {
  @JavaField(String)
  name?: string

  @JavaField(StorageItem)
  file: StorageItem
}
