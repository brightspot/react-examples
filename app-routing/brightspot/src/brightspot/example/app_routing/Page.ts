import Content from 'brightspot-types/com/psddev/cms/db/Content'
import JavaClass from 'brightspot-types/JavaClass'
import Indexed from 'brightspot-types/com/psddev/dari/db/Recordable$Indexed'
import JavaField from 'brightspot-types/JavaField'

import App from './App'

export default class Page extends JavaClass(
  'brightspot.example.app_routing.Page',
  Content
) {
  @JavaField(String)
  @Indexed({ unique: true })
  name?: string

  @JavaField(App)
  app?: App

  getLabel(): string {
    return this.name || ''
  }
}
