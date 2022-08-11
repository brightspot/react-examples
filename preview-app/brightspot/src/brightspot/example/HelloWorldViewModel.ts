import ViewModel from '../../../brightspot-types/com/psddev/cms/view/ViewModel'
import HelloWorld from './HelloWorld'
import JavaClass from '../../../brightspot-types/JavaClass'
import ViewInterface from '../../../brightspot-types/com/psddev/cms/view/ViewInterface'
import Optional from '../../../brightspot-types/java/util/Optional'
import PageEntryView from '../../../brightspot-types/com/psddev/cms/view/PageEntryView'
import JavaMethodParameters from '../../../brightspot-types/JavaMethodParameters'
import JavaMethodReturn from '../../../brightspot-types/JavaMethodReturn'

@ViewInterface
export default class HelloWorldViewModel extends JavaClass(
  'brightspot.example.HelloWorldViewModel',
  ViewModel<HelloWorld>,
  PageEntryView
) {
  @JavaMethodParameters()
  @JavaMethodReturn(String)
  getTitle(): string {
    if (this.model) {
      return Optional.ofNullable(this.model.getTitle()).orElse('')
    } else if (!this.model) {
      return 'testTitle'
    }
    return 'testTitle'
  }

  @JavaMethodParameters()
  @JavaMethodReturn(String)
  getText(): string {
    if (this.model) {
      return Optional.ofNullable(this.model.getText()).orElse('')
    } else if (!this.model) {
      return 'testText'
    }
    return 'testText'
  }
}
