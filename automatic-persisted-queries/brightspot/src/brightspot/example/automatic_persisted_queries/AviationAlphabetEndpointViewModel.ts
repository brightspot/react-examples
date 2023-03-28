import JavaClass from 'brightspot-types/JavaClass'
import JavaMethodParameters from 'brightspot-types/JavaMethodParameters'
import JavaMethodReturn from 'brightspot-types/JavaMethodReturn'

import ViewInterface from 'brightspot-types/com/psddev/cms/view/ViewInterface'
import ViewModel from 'brightspot-types/com/psddev/cms/view/ViewModel'
import ViewResponse from 'brightspot-types/com/psddev/cms/view/ViewResponse'

import AviationAlphabetCodesViewModel from './AviationAlphabetCodesViewModel'
import AviationAlphabetConverterViewModel from './AviationAlphabetConverterViewModel'
import AviationAlphabetEndpoint from './AviationAlphabetEndpoint'

@ViewInterface
export default class AviationAlphabetEndpointViewModel extends JavaClass(
  'brightspot.example.automatic_persisted_queries.AviationAlphabetEndpointViewModel',
  ViewModel.Of(AviationAlphabetEndpoint)
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

  onCreate(response: ViewResponse) {
    super.onCreate(response)
    if (this.model.cacheControl) {
      response.addHeader('Cache-Control', this.model.cacheControl)
    } else {
      response.addHeader('Cache-Control', 'max-age=0')
    }
  }
}
