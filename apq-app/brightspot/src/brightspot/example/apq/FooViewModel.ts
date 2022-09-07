import JavaClass from 'brightspot-types/JavaClass'
import JavaMethodParameters from 'brightspot-types/JavaMethodParameters'
import JavaMethodReturn from 'brightspot-types/JavaMethodReturn'
import ViewInterface from 'brightspot-types/com/psddev/cms/view/ViewInterface'
import ViewModel from 'brightspot-types/com/psddev/cms/view/ViewModel'

import Foo from './Foo'

@ViewInterface
export default class FooViewModel extends JavaClass(
  'brightspot.example.apq.FooViewModel',
  ViewModel.Of(Foo)
) {
  @JavaMethodParameters()
  @JavaMethodReturn(String)
  getFoo(): string {
    return this.model.foo || 'test title'
  }

  @JavaMethodParameters()
  @JavaMethodReturn(String)
  getBody(): string {
    return this.model.bar || ' test body'
  }
}
