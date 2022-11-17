import JavaClass from 'brightspot-types/JavaClass'
import JavaField from 'brightspot-types/JavaField'
import LinkedHashMap from 'brightspot-types/java/util/LinkedHashMap'
import Map from 'brightspot-types/java/util/Map'
import UUID from 'brightspot-types/java/util/UUID'

import IconName from 'brightspot-types/com/psddev/cms/db/ToolUi$IconName'
import Tag from 'brightspot-types/com/psddev/cms/db/RichTextElement$Tag'
import DisplayName from 'brightspot-types/com/psddev/dari/db/Recordable$DisplayName'
import ObjectUtils from 'brightspot-types/com/psddev/dari/util/ObjectUtils'
import Query from 'brightspot-types/com/psddev/dari/db/Query'
import RichTextElement from 'brightspot-types/com/psddev/cms/db/RichTextElement'
import Required from 'brightspot-types/com/psddev/dari/db/Recordable$Required'
import ToolPageContext from 'brightspot-types/com/psddev/cms/tool/ToolPageContext'

import Image from './Image'
import IOException from 'brightspot-types/java/io/IOException'

@DisplayName({ value: 'Image' })
@Tag({
  value: ImageRichTextElement.TAG_NAME,
  block: true,
  initialBody: 'Image',
  position: -50.0,
  preview: true,
  readOnly: true,
  root: true,
  tooltip: 'Add Image',
})
@IconName({ value: 'photo' })
export default class ImageRichTextElement extends JavaClass(
  'brightspot.example.marked_text.ImageRichTextElement',
  RichTextElement
) {
  @JavaField(String)
  static TAG_NAME: string = 'bsp-image'

  @JavaField(String)
  static IMAGE_STATE_ATTRIBUTE: string = 'data-image-state'

  @JavaField(String)
  static IMAGE_ATTRIBUTE: string = 'data-image'

  @JavaField(String)
  static WITH_BORDER_ATTRIBUTE: string = 'data-border'

  @JavaField(String)
  static STRETCHED_ATTRIBUTE: string = 'data-stretched'

  @JavaField(String)
  static WITH_BACKGROUND_ATTRIBUTE: string = 'data-background'

  @Required
  @JavaField(Image)
  image: Image

  @JavaField(Boolean)
  withBorder: boolean

  @JavaField(Boolean)
  stretched: boolean

  @JavaField(Boolean)
  withBackground: boolean;

  [`fromAttributes(java.util.Map)`](attributes: Map<string, string>): void {
    if (attributes !== null) {
      let imageAttr = attributes.get(ImageRichTextElement.IMAGE_ATTRIBUTE)

      let id = ObjectUtils.to(UUID.class, imageAttr)

      let res = Query.fromAll().where('_id = ?', id).first()

      let val = Image.getClass().isInstance(res)

      if (val) {
        this.image = Image.getClass().cast(res)
      } else {
        this.image = null
      }

      let dataBorder = attributes.get(
        ImageRichTextElement.WITH_BORDER_ATTRIBUTE
      )

      this.withBorder = dataBorder ? true : false

      let dataStretched = attributes.get(
        ImageRichTextElement.STRETCHED_ATTRIBUTE
      )

      this.stretched = dataStretched ? true : false

      let dataBackground = attributes.get(
        ImageRichTextElement.WITH_BACKGROUND_ATTRIBUTE
      )

      this.withBackground = dataBackground ? true : false
    } else {
      this.image = null
    }
  }

  [`toAttributes()`](): Map<string, string> {
    let attributes: Map<string, string> = new LinkedHashMap<string, string>()

    if (this.image != null) {
      attributes.put(
        ImageRichTextElement.IMAGE_ATTRIBUTE,
        this.image.getId().toString()
      )
    }

    if (this.withBorder) {
      attributes.put(
        ImageRichTextElement.WITH_BORDER_ATTRIBUTE,
        this.withBorder.toString()
      )
    }

    if (this.stretched) {
      attributes.put(
        ImageRichTextElement.STRETCHED_ATTRIBUTE,
        this.stretched.toString()
      )
    }

    if (this.withBackground) {
      attributes.put(
        ImageRichTextElement.WITH_BACKGROUND_ATTRIBUTE,
        this.withBackground.toString()
      )
    }

    return attributes
  }

  toBody(): string {
    let image = this.image
    if (image !== null) {
      return image.title
    } else {
      return 'Image'
    }
  }

  writePreviewHtml(page: ToolPageContext): void {
    let image = this.image.file

    if (image != null) {
      let imageUrl: string = page.getPreviewThumbnailUrl(image)
      if (imageUrl != null) {
        page.writeElement('img', 'src', imageUrl, 'height', 300)
      }
    }
  }
}
