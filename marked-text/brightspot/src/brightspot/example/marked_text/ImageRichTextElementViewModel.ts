import CharSequence from 'brightspot-types/java/lang/CharSequence'
import JavaClass from 'brightspot-types/JavaClass'
import JavaMap from 'brightspot-types/java/util/Map'
import JavaMethodParameters from 'brightspot-types/JavaMethodParameters'
import JavaMethodReturn from 'brightspot-types/JavaMethodReturn'

import ImageSize from 'brightspot-types/com/psddev/cms/image/ImageSize'
import RteMarkDataView from 'brightspot-types/com/psddev/cms/mark/view/RteMarkDataView'
import ViewInterface from 'brightspot-types/com/psddev/cms/view/ViewInterface'
import ViewModel from 'brightspot-types/com/psddev/cms/view/ViewModel'

import ImageRichTextElement from './ImageRichTextElement'
import Optional from 'brightspot-types/java/util/Optional'

@ViewInterface
export default class ImageRichTextElementViewModel extends JavaClass(
  'brightspot.example.marked_text.ImageRichTextElementViewModel',
  ViewModel.Of(ImageRichTextElement),
  RteMarkDataView
) {
  @JavaMethodParameters()
  @JavaMethodReturn(String)
  getFileUrl(): string {
    return Optional.ofNullable(this.model.image.file.getPublicUrl()).orElse(
      null
    )
  }

  @JavaMethodParameters()
  @JavaMethodReturn(JavaMap)
  getImage(): JavaMap {
    return Optional.ofNullable(
      ImageSize.getAttributes(this.model.image.file)
    ).orElse(null)
  }

  @JavaMethodParameters()
  @JavaMethodReturn(String)
  getAlt(): string {
    return Optional.ofNullable(this.model.image.altText).orElse(null)
  }

  @JavaMethodParameters()
  @JavaMethodReturn(String)
  getCaption(): string {
    return Optional.ofNullable(this.model.image.caption).orElse(null)
  }

  @JavaMethodParameters()
  @JavaMethodReturn(CharSequence)
  getCredit(): CharSequence {
    return Optional.ofNullable(this.model.image.credit).orElse(null)
  }

  @JavaMethodParameters()
  @JavaMethodReturn(Boolean)
  getWithBorder(): boolean {
    return this.model.withBorder
  }

  @JavaMethodParameters()
  @JavaMethodReturn(Boolean)
  getStretched(): boolean {
    return this.model.stretched
  }

  @JavaMethodParameters()
  @JavaMethodReturn(Boolean)
  getWithBackground(): boolean {
    return this.model.withBackground
  }
}
