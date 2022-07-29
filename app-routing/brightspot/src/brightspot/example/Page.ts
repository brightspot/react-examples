import JavaClass from '../../../brightspot-types/JavaClass'
import Content from '../../../brightspot-types/com/psddev/cms/db/Content'
import JavaField from '../../../brightspot-types/JavaField'
import DirectoryItem from "../../../brightspot-types/com/psddev/cms/db/Directory$Item"
import App from './App'
import Site from '../../../brightspot-types/com/psddev/cms/db/Site'
import Indexed from '../../../brightspot-types/com/psddev/dari/db/Recordable$Indexed'

@JavaClass('brightspot.example.Page')
export default class Page extends Content.implements(DirectoryItem) {
  
  @JavaField()
  name?: string


  @JavaField()
  @Indexed()
  app?: App

  getLabel():string {
    return this.name || ''
  }



  createPermalink(site: Site): string {
    const Utils = Java.type('com.psddev.dari.util.Utils')
    return Utils.toNormalized(this.getName())
  }
}


