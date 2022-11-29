import JavaClass from 'brightspot-types/JavaClass'
import JavaMethodParameters from 'brightspot-types/JavaMethodParameters'
import JavaMethodReturn from 'brightspot-types/JavaMethodReturn'

import ViewInterface from 'brightspot-types/com/psddev/cms/view/ViewInterface'
import ViewModel from 'brightspot-types/com/psddev/cms/view/ViewModel'

import FunFact from './FunFact'

@ViewInterface
export default class FunFactViewModel extends JavaClass(
  'brightspot.example.client_authentication_ssr.FunFactViewModel',
  ViewModel.Of(FunFact)
) {
  @JavaMethodParameters()
  @JavaMethodReturn(String)
  getText(): string {
    return this.model.text
  }
}
