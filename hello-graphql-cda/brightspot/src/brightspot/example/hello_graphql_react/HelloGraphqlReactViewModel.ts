import JavaClass from 'brightspot-types/JavaClass'
import JavaMethodParameters from 'brightspot-types/JavaMethodParameters'
import JavaMethodReturn from 'brightspot-types/JavaMethodReturn'
import ViewInterface from 'brightspot-types/com/psddev/cms/view/ViewInterface'
import ViewModel from 'brightspot-types/com/psddev/cms/view/ViewModel'
import PageEntryView from 'brightspot-types/com/psddev/cms/view/PageEntryView'

import HelloGraphqlReact from './HelloGraphqlReact'

@ViewInterface
export default class HelloGraphqlReactViewModel extends JavaClass(
  'brightspot.example.hello_graphql_react.HelloGraphqlReactViewModel',
  ViewModel.Of(HelloGraphqlReact),
  PageEntryView
) {
  @JavaMethodParameters()
  @JavaMethodReturn(String)
  getTitle(): string {
    return this.model.title
  }

  @JavaMethodParameters()
  @JavaMethodReturn(String)
  getDescription(): string {
    return this.model.description
  }
}
