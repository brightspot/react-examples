import RteMarkDataView from 'brightspot-types/com/psddev/cms/mark/view/RteMarkDataView'
import ViewInterface from 'brightspot-types/com/psddev/cms/view/ViewInterface'
import ViewModel from 'brightspot-types/com/psddev/cms/view/ViewModel'
import JavaClass from 'brightspot-types/JavaClass'
import ImageRichTextElement from './ImageRichTextElement'

import ImageSize from 'brightspot-types/com/psddev/cms/image/ImageSize'
import JavaMap from 'brightspot-types/java/util/Map'
import CharSequence from 'brightspot-types/java/lang/CharSequence'

@ViewInterface
export default class ImageRichTextElementViewModel extends JavaClass(
  'brightspot.example.marked_text.ImageRichTextElementViewModel',
  ViewModel.Of(ImageRichTextElement),
  RteMarkDataView
) {
  getFileUrl(): string {
    let image = this.model.getImage()
    let file = image.getFile()
    let publicUrl = file.getPublicUrl()

    return publicUrl ? publicUrl : null
  }

  getImage(): JavaMap {
    let image = this.model.getImage()
    let imageSize = ImageSize.getAttributes(image.getFile())

    return imageSize ? imageSize : null
  }

  getAlt(): string {
    let image = this.model.getImage()
    let altText = image.getAlt()
    return altText ? altText : null
  }

  //   getCaption(): RteMarkedTextViewModel {
  //       let image = this.model.getImage()
  //       return this.createView(
  //           RteMarkedTextViewModel.class,
  //           createWithDefau
  //         )
  //       return Optional.ofNullable(model.getImage())
  //           .map(image -> createView(MarkedTextViewModel.class,
  //               MarkedTextFactory.createWithDefaultPreprocessors(image.getCaption())))
  //           .orElse(null);
  //   }

  getCredit(): CharSequence {
    let image = this.model.getImage()
    return image.getCredit() ? image.getCredit() : null
  }

  getWithBorder(): boolean {
    return this.model.isWithBorder()
  }

  getStretched(): boolean {
    return this.model.isStretched()
  }

  getWithBackground(): boolean {
    return this.model.isWithBackground()
  }
}
