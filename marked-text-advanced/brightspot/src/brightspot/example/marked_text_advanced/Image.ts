import JavaClass from 'brightspot-types/JavaClass'
import JavaField from 'brightspot-types/JavaField'

import Content from 'brightspot-types/com/psddev/cms/db/Content'
import DisplayName from 'brightspot-types/com/psddev/dari/db/Recordable$DisplayName'
import PreviewField from 'brightspot-types/com/psddev/dari/db/Recordable$PreviewField'
import StorageItem from 'brightspot-types/com/psddev/dari/util/StorageItem'

import Optional from 'brightspot-types/java/util/Optional'

PreviewField({ value: 'file' })
DisplayName({ value: 'Image' })
export default class Image extends JavaClass(
  'brightspot.example.marked_text_advanced.Image',
  Content
) {
  @JavaField(String)
  title: string

  @JavaField(StorageItem)
  file: StorageItem

  @JavaField(String)
  caption: string

  @JavaField(String)
  credit: string

  @JavaField(String)
  altText: string

  getTitlePlaceHolder(): string {
    return Optional.ofNullable(
      this.file.getMetadata().get('originalFilename').toString()
    ).orElse(null)
  }
}
