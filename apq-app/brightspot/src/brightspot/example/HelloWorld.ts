import JavaClass from '../../../brightspot-types/JavaClass'
import Content from '../../../brightspot-types/com/psddev/cms/db/Content'
import JavaField from '../../../brightspot-types/JavaField'
import JavaRequired from '../../../brightspot-types/com/psddev/dari/db/Recordable$Required'
import Site from '../../../brightspot-types/com/psddev/cms/db/Site'
import DirectoryItem from '../../../brightspot-types/com/psddev/cms/db/Directory$Item'

export default class App extends JavaClass(
  'brightspot.example.HelloWorld',
  Content,
  DirectoryItem
) {
  @JavaRequired()
  @JavaField
  title?: string

  @JavaField
  text?: string

  createPermalink(site: Site): string {
    const Utils = Java.type('com.psddev.dari.util.Utils')
    return Utils.toNormalized(this.title)
  }
}
