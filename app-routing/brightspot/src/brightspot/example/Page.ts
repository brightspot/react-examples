import JavaClass from '../../../brightspot-types/JavaClass'
import Content from '../../../brightspot-types/com/psddev/cms/db/Content'
import JavaField from '../../../brightspot-types/JavaField'
import DirectoryItem from "../../../brightspot-types/com/psddev/cms/db/Directory$Item"
import App from './App'
import Site from '../../../brightspot-types/com/psddev/cms/db/Site'
import Article from './Article'

@JavaClass('brightspot.example.Page')
export default class Page extends Content.implements(DirectoryItem) {
  
  @JavaField()
  title?: string


  @JavaField()
  app?: App

  @JavaField()
  article?: Article 

  getLabel():string {
    return this.title || ''
  }

  createPermalink(site: Site): string {
    const Utils = Java.type('com.psddev.dari.util.Utils')
    return Utils.toNormalized(this.getTitle())
  }
}


