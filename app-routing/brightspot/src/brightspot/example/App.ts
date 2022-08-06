import JavaClass from '../../../brightspot-types/JavaClass'
import Content from '../../../brightspot-types/com/psddev/cms/db/Content'
import JavaField from '../../../brightspot-types/JavaField'
import JavaRequired from '../../../brightspot-types/com/psddev/dari/db/Recordable$Required'
import Site from '../../../brightspot-types/com/psddev/cms/db/Site'
import DirectoryItem from "../../../brightspot-types/com/psddev/cms/db/Directory$Item"
import Article from './Article'

@JavaClass('brightspot.example.App')
export default class App extends Content.implements(DirectoryItem) {

 @JavaRequired()
  @JavaField()
  title?: string

  getTitle(): string {
    return this.title || ''
  }

  createPermalink(site: Site): string {
    const Utils = Java.type('com.psddev.dari.util.Utils')
    return Utils.toNormalized(this.getTitle())
  }
}


