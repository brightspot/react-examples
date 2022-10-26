import JavaClass from 'brightspot-types/JavaClass'
import JavaMethodParameters from 'brightspot-types/JavaMethodParameters'
import JavaMethodReturn from 'brightspot-types/JavaMethodReturn'

import ViewInterface from 'brightspot-types/com/psddev/cms/view/ViewInterface'
import ViewModel from 'brightspot-types/com/psddev/cms/view/ViewModel'

import Image from './Image'
import StorageItem from 'brightspot-types/com/psddev/dari/util/StorageItem'
import StorageItemViewModel from './StorageItemViewModel'
import Class from 'brightspot-types/java/lang/Class'

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

  @JavaMethodParameters()
  @JavaMethodReturn(StorageItemViewModel)
  getFile(): StorageItemViewModel {
    // TODO: remove null check once createView null object issue is resolved
    if (this.model.file) {
      return this.createView(
        StorageItemViewModel.class as Class<StorageItemViewModel>,
        this.model.file
      )
    } else return null
  }

  @JavaMethodParameters()
  @JavaMethodReturn(Number)
  getHeight(): number {
    return this.model.height
  }

  @JavaMethodParameters()
  @JavaMethodReturn(Number)
  getWidth(): number {
    return this.model.width
  }

  @JavaMethodParameters()
  @JavaMethodReturn(String)
  getAltText(): string {
    return this.model.altText
  }
}
