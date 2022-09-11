import Content from 'brightspot-types/com/psddev/cms/db/Content'
import JavaClass from 'brightspot-types/JavaClass'
import Indexed from 'brightspot-types/com/psddev/dari/db/Recordable$Indexed'
import JavaField from 'brightspot-types/JavaField'

import App from './App'
import JavaRequired from 'brightspot-types/com/psddev/dari/db/Recordable$Required'

export default class Page extends JavaClass(
  'brightspot.example.app_routing.Page',
  Content
) {
  @JavaField(String)
  @Indexed({ unique: true })
  @JavaRequired
  name: string

  @JavaField(App)
  @JavaRequired
  app: App

  getLabel(): string {
    return this.name || ''
  }

  // getPageId(): string {
  //   return this['getId()'].toString()
  // }
}
