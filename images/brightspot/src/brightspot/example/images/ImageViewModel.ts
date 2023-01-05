import JavaClass from 'brightspot-types/JavaClass'
import JavaMethodParameters from 'brightspot-types/JavaMethodParameters'
import JavaMethodReturn from 'brightspot-types/JavaMethodReturn'

import ViewInterface from 'brightspot-types/com/psddev/cms/view/ViewInterface'
import ViewModel from 'brightspot-types/com/psddev/cms/view/ViewModel'

import Image from './Image'

import ImageSize from 'brightspot-types/com/psddev/cms/image/ImageSize'
import JavaMap from 'brightspot-types/java/util/Map'
import ImageAttributes from 'brightspot-types/com/psddev/graphql/cda/annotation/ImageAttributes'

@ViewInterface
export default class ImageViewModel extends JavaClass(
  'brightspot.example.images.ImageViewModel',
  ViewModel.Of(Image)
) {
  @JavaMethodParameters()
  @JavaMethodReturn(String)
  getTitle(): string {
    return this.model.title
  }

  @ImageAttributes
  @JavaMethodParameters()
  @JavaMethodReturn(JavaMap)
  getFile(): JavaMap<string, unknown> {
    const result = ImageSize['getAttributes(com.psddev.dari.util.StorageItem)'](
      this.model.file
    )
    console.log('result: ', result)
    return result
  }

  @JavaMethodParameters()
  @JavaMethodReturn(String)
  getAltText(): string {
    return this.model.altText
  }

  @JavaMethodParameters()
  @JavaMethodReturn(String)
  getId(): string {
    return this.model.id.toString()
  }
}
