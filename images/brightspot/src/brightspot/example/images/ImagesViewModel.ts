import JavaClass from 'brightspot-types/JavaClass'
import JavaMethodParameters from 'brightspot-types/JavaMethodParameters'
import JavaMethodReturn from 'brightspot-types/JavaMethodReturn'

import List from 'brightspot-types/java/util/List'
import Query from 'brightspot-types/com/psddev/dari/db/Query'
import ViewInterface from 'brightspot-types/com/psddev/cms/view/ViewInterface'
import ViewModel from 'brightspot-types/com/psddev/cms/view/ViewModel'

import Image from './Image'
import ImageViewModel from './ImageViewModel'
import ImagesEndpoint from './ImagesEndpoint'

@ViewInterface
export default class ImagesViewModel extends JavaClass(
  'brightspot.example.images.ImagesViewModel',
  ViewModel.Of(ImagesEndpoint)
) {
  @JavaMethodParameters()
  @JavaMethodReturn(List.Of(ImageViewModel))
  getCats(): List<ImageViewModel> {
    return this.createViews(
      ImageViewModel.getClass(),
      Query.from(Image.getClass()).selectAll()
    )
  }
}