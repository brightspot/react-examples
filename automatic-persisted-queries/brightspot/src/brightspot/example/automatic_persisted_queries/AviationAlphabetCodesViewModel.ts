import JavaClass from 'brightspot-types/JavaClass'
import JavaMethodParameters from 'brightspot-types/JavaMethodParameters'
import JavaMethodReturn from 'brightspot-types/JavaMethodReturn'

import ViewInterface from 'brightspot-types/com/psddev/cms/view/ViewInterface'
import ViewModel from 'brightspot-types/com/psddev/cms/view/ViewModel'

import AviationAlphabetApi from './AviationAlphabetApi'

@ViewInterface
export default class AviationAlphabetCodesViewModel extends JavaClass(
  'brightspot.example.automatic_persisted_queries.AviationAlphabetCodesViewModel',
  ViewModel.Of(AviationAlphabetApi)
) {
  @JavaMethodParameters()
  @JavaMethodReturn(String)
  getA(): string {
    return this.model.word("A")
  }

  getB(): string {
    return this.model.word("A")
  }

  getC(): string {
    return this.model.word("A")
  }

  getD(): string {
    return this.model.word("A")
  }
}
