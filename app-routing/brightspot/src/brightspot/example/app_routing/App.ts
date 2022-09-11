import Content from 'brightspot-types/com/psddev/cms/db/Content'
import Indexed from 'brightspot-types/com/psddev/dari/db/Recordable$Indexed'
import JavaClass from 'brightspot-types/JavaClass'
import JavaField from 'brightspot-types/JavaField'
import JavaRequired from 'brightspot-types/com/psddev/dari/db/Recordable$Required'

export default class App extends JavaClass(
  'brightspot.example.app_routing.App',
  Content
) {
  @JavaField(String)
  @JavaRequired
  @Indexed({ unique: true })
  title: string
}
