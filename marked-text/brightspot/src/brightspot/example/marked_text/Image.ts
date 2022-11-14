import Content from 'brightspot-types/com/psddev/cms/db/Content'
import Hidden from 'brightspot-types/com/psddev/cms/db/ToolUi$Hidden'
import RichText from 'brightspot-types/com/psddev/cms/db/ToolUi$RichText'
import DynamicPlaceholderMethod from 'brightspot-types/com/psddev/cms/ui/form/DynamicPlaceholderMethod'
import DisplayName from 'brightspot-types/com/psddev/dari/db/Recordable$DisplayName'
import Indexed from 'brightspot-types/com/psddev/dari/db/Recordable$Indexed'
import PreviewField from 'brightspot-types/com/psddev/dari/db/Recordable$PreviewField'
import StorageItem from 'brightspot-types/com/psddev/dari/util/StorageItem'
import JavaClass from 'brightspot-types/JavaClass'
import JavaField from 'brightspot-types/JavaField'

import CustomRichTextToolbar from './CustomRichTextToolbar'

PreviewField({ value: 'file' })
DisplayName({ value: 'Image' })
export default class Image extends JavaClass(
  'brightspot.example.marked_text.Image',
  Content
) {
  @JavaField(String)
  title: string

  @JavaField(StorageItem)
  file: StorageItem

  @RichText({
    toolbar: CustomRichTextToolbar.getClass(),
    lines: 5,
  })
  @JavaField(String)
  caption: string

  @JavaField(String)
  credit: string

  @JavaField(String)
  altText: string

  @Hidden
  @Indexed
  getTitle(): string {
    if (this.title == null) {
      return this.getTitlePlaceHolder()
    }
    return this.title
  }

  setTitle(title: string): void {
    this.title = title
  }

  getFile(): StorageItem {
    return this.file
  }

  setFile(file: StorageItem): void {
    this.file = file
  }

  getCaption(): string {
    return this.caption
  }

  setCaption(caption: string): void {
    this.caption = caption
  }

  getCredit(): string {
    return this.credit
  }

  setCredit(credit: string): void {
    this.credit = credit
  }

  getAltText(): string {
    return this.altText
  }

  setAltText(altText: string): void {
    this.altText = altText
  }

  getLabel(): string {
    return this.title
  }

  getTitlePlaceHolder(): string {
    let file = this.getFile()
    let metaData = file.getMetadata()
    let originalFileName = metaData.get('originalFilename').toString()

    return originalFileName ? originalFileName : null
  }
}
