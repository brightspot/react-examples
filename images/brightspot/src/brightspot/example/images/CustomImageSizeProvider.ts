import ImageSize from 'brightspot-types/com/psddev/cms/image/ImageSize'
import ImageSizeProvider from 'brightspot-types/com/psddev/cms/image/ImageSizeProvider'
import List from 'brightspot-types/java/util/List'

import JavaClass from 'brightspot-types/JavaClass'
import JavaSet from 'brightspot-types/java/util/Set'
import ArrayList from 'brightspot-types/java/util/ArrayList'

export default class CustomImageSizeProvider extends JavaClass(
  'brightspot.example.images.CustomImageSizeProvider',
  Object,
  ImageSizeProvider
) {
  //TODO:
  // private final ImageSizeProvider previousProvider;

  // public SothebysImageSizeProvider(ImageSizeProvider previousProvider) {
  //     this.previousProvider = previousProvider;
  // }
  [`get(java.util.List,java.lang.String)`](
    contexts: List<string>,
    field: string
  ): ImageSize {
    //TODO:
    // return previousProvider != null ? previousProvider.get(contexts, field) : null;
    return null
  }

  [`getAll()`](): JavaSet<ImageSize> {
    const SEARCH_RESULT_LIST_PROMO_SMALL = ImageSize.builder()
      .displayName('Search Result Promo Small')
      .internalName('search-result-list-promo')
      .width(421)
      .height(421)
      .build()

    const SEARCH_RESULT_PROMO_LANDSCAPE = ImageSize.builder()
      .displayName('Search Result Promo Landscape')
      .internalName('search-result-promo-landscape')
      .width(338)
      .height(150)
      .build()

    const SEARCH_RESULT_PROMO_PORTRAIT = ImageSize.builder()
      .displayName('Search Result Promo Portrait')
      .internalName('search-result-promo-portrait')
      .width(338)
      .height(375)
      .build()

    const SEARCH_RESULT_LIST_PROMO_UNCROPPED = ImageSize.builder()
      .displayName('Search Result Promo (Uncropped)')
      .internalName('search-result-list-promo-uncropped')
      .maximumHeight(421)
      .maximumWidth(421)
      .build()

    let result = new ArrayList<ImageSize>()
    result.add(SEARCH_RESULT_LIST_PROMO_SMALL)
    result.add(SEARCH_RESULT_PROMO_LANDSCAPE)
    result.add(SEARCH_RESULT_PROMO_PORTRAIT)
    result.add(SEARCH_RESULT_LIST_PROMO_UNCROPPED)
    return result
  }
}
