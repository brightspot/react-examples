import JavaClass from 'brightspot-types/JavaClass'
import JavaMethodParameters from 'brightspot-types/JavaMethodParameters'
import JavaMethodReturn from 'brightspot-types/JavaMethodReturn'

import ViewInterface from 'brightspot-types/com/psddev/cms/view/ViewInterface'
import ViewModel from 'brightspot-types/com/psddev/cms/view/ViewModel'

import AviationAlphabetCodesViewModel from './AviationAlphabetCodesViewModel'
import AviationAlphabetConverterViewModel from './AviationAlphabetConverterViewModel'
import AviationAlphabetApi from './AviationAlphabetApi'

@ViewInterface
export default class AviationAlphabetApiViewModel extends JavaClass(
  'brightspot.example.automatic_persisted_queries.AviationAlphabetApiViewModel',
  ViewModel.Of(AviationAlphabetApi)
) {
  @JavaMethodParameters()
  @JavaMethodReturn(AviationAlphabetCodesViewModel)
  getCodes(): AviationAlphabetCodesViewModel {
    return this.createView(
      AviationAlphabetCodesViewModel.getClass(),
      this.model
    )
  }

  @JavaMethodParameters()
  @JavaMethodReturn(AviationAlphabetConverterViewModel)
  getConverter(): AviationAlphabetConverterViewModel {
    return this.createView(
      AviationAlphabetConverterViewModel.getClass(),
      this.model
    )
  }
}
