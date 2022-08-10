import ViewModel from '../../../brightspot-types/com/psddev/cms/view/ViewModel'
import HelloWorld from './HelloWorld'
import JavaClass from '../../../brightspot-types/JavaClass'
import ViewInterface from '../../../brightspot-types/com/psddev/cms/view/ViewInterface'
import Optional from '../../../brightspot-types/java/util/Optional'
import PageEntryView from '../../../brightspot-types/com/psddev/cms/view/PageEntryView'

  @ViewInterface
  export default class HelloWorldViewModel extends JavaClass(
    'brightspot.example.HelloWorldViewModel',
    ViewModel<HelloWorld>,
    PageEntryView
    ) {
      
    getTitle(): string {
      return Optional.ofNullable(this.model.getTitle()).orElse('')
    }

    getText(): string {
      return Optional.ofNullable(this.model.getText()).orElse('')
    }
  }
