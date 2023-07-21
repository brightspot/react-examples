import JavaClass from 'brightspot-types/JavaClass'
import JavaMethodParameters from 'brightspot-types/JavaMethodParameters'
import JavaMethodReturn from 'brightspot-types/JavaMethodReturn'

import ViewInterface from 'brightspot-types/com/psddev/cms/view/ViewInterface'
import ViewModel from 'brightspot-types/com/psddev/cms/view/ViewModel'

import Memo from './Memo'

@ViewInterface
export default class MemoViewModel extends JavaClass(
  'brightspot.example.cors_configuration.MemoViewModel',
  ViewModel.Of(Memo)
) {
  @JavaMethodParameters()
  @JavaMethodReturn(String)
  getSubject(): string {
    return this.model.subject
  }

  @JavaMethodParameters()
  @JavaMethodReturn(String)
  getMessage(): string {
    return this.model.message
  }
}
