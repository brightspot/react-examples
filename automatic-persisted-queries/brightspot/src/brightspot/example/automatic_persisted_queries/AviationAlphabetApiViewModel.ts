import JavaClass from 'brightspot-types/JavaClass'
import JavaMethodParameters from 'brightspot-types/JavaMethodParameters'
import JavaMethodReturn from 'brightspot-types/JavaMethodReturn'

import ViewInterface from 'brightspot-types/com/psddev/cms/view/ViewInterface'
import ViewModel from 'brightspot-types/com/psddev/cms/view/ViewModel'

import ApqItem from './ApqItem'
import AviationAlphabetCodesViewModel from './AviationAlphabetCodesViewModel'
import CreateViewAsStep from 'brightspot-types/org/jooq/CreateViewAsStep'
import AviationAlphabetConverterViewModel from './AviationAlphabetConverterViewModel'

@ViewInterface
export default class AviationAlphabetApiViewModel extends JavaClass(
  'brightspot.example.automatic_persisted_queries.AviationAlphabetApiViewModel',
  ViewModel.Of(AviationAlphabetCodesViewModel)
) {
  @JavaMethodParameters()
  @JavaMethodReturn(AviationAlphabetCodesViewModel)
  getCodes(): AviationAlphabetCodesViewModel {
    return this.CreateView(AviationAlphabetCodesViewModel.getClass(), this.model)
  }

  @JavaMethodParameters()
  @JavaMethodReturn(AviationAlphabetConverterViewModel)
  getConverter(): AviationAlphabetConverterViewModel {
    return this.CreateView(AviationAlphabetConverterViewModel.getClass(), this.model)
  }
}
