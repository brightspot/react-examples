import JavaClass from 'brightspot-types/JavaClass'
import JavaMethodParameters from 'brightspot-types/JavaMethodParameters'
import JavaMethodReturn from 'brightspot-types/JavaMethodReturn'

import ViewInterface from 'brightspot-types/com/psddev/cms/view/ViewInterface'
import ViewModel from 'brightspot-types/com/psddev/cms/view/ViewModel'
import PageEntryView from 'brightspot-types/com/psddev/cms/view/PageEntryView'

import HelloWorldEndpoint from './HelloWorldEndpoint'

@ViewInterface
export default class HelloBrightspotViewModel extends JavaClass(
  'brightspot.example.hello_world.HelloWorldViewModel',
  ViewModel.Of(HelloWorldEndpoint),
  PageEntryView
) {
  @JavaMethodParameters()
  @JavaMethodReturn(String)
  getMessage(): string {
    return 'Hello, World!'
  }
}
