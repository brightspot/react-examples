import RteMarkDataView from 'brightspot-types/com/psddev/cms/mark/view/RteMarkDataView'
import ViewInterface from 'brightspot-types/com/psddev/cms/view/ViewInterface'
import ViewModel from 'brightspot-types/com/psddev/cms/view/ViewModel'
import JavaClass from 'brightspot-types/JavaClass'
import ImageRichTextElement from './ImageRichTextElement'

import ImageSize from 'brightspot-types/com/psddev/cms/image/ImageSize'
import JavaMap from 'brightspot-types/java/util/Map'
import CharSequence from 'brightspot-types/java/lang/CharSequence'
import JavaMethodParameters from 'brightspot-types/JavaMethodParameters'
import JavaMethodReturn from 'brightspot-types/JavaMethodReturn'

@ViewInterface
export default class ImageRichTextElementViewModel extends JavaClass(
  'brightspot.example.marked_text.ImageRichTextElementViewModel',
  ViewModel.Of(ImageRichTextElement),
  RteMarkDataView
) {
  @JavaMethodParameters()
  @JavaMethodReturn(String)
  getFileUrl(): string {
    let image = this.model.getImage()
    let file = image.getFile()
    let publicUrl = file.getPublicUrl()
    return publicUrl ? publicUrl : null
  }

  @JavaMethodParameters()
  @JavaMethodReturn(JavaMap)
  getImage(): JavaMap {
    let image = this.model.getImage()
    let imageSize = ImageSize.getAttributes(image.getFile())
    return imageSize ? imageSize : null
  }

  @JavaMethodParameters()
  @JavaMethodReturn(String)
  getAlt(): string {
    let image = this.model.getImage()
    let altText = image.getAltText()
    return altText ? altText : null
  }

  @JavaMethodParameters()
  @JavaMethodReturn(String)
  getCaption(): string {
    let image = this.model.getImage()
    let caption = image.getCaption()
    return caption ? caption : null
  }
  // getCaption(): RteMarkedTextViewModel {
  //     let image = this.model.getImage()
  //     return this.createView(
  //         RteMarkedTextViewModel.class,
  //         createWithDefau
  //       )
  //     return Optional.ofNullable(model.getImage())
  //         .map(image -> createView(MarkedTextViewModel.class,
  //             MarkedTextFactory.createWithDefaultPreprocessors(image.getCaption())))
  //         .orElse(null);
  // }

  @JavaMethodParameters()
  @JavaMethodReturn(CharSequence)
  getCredit(): CharSequence {
    let image = this.model.getImage()
    return image.getCredit() ? image.getCredit() : null
  }

  @JavaMethodParameters()
  @JavaMethodReturn(Boolean)
  getWithBorder(): boolean {
    return this.model.isWithBorder()
  }

  @JavaMethodParameters()
  @JavaMethodReturn(Boolean)
  getStretched(): boolean {
    return this.model.isStretched()
  }

  @JavaMethodParameters()
  @JavaMethodReturn(Boolean)
  getWithBackground(): boolean {
    return this.model.isWithBackground()
  }
}
