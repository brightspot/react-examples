import Content from "../../../brightspot-types/com/psddev/cms/db/Content";
import DirectoryItem from "../../../brightspot-types/com/psddev/cms/db/Directory$Item"
import JavaClass from "../../../brightspot-types/JavaClass";
import JavaField from "../../../brightspot-types/JavaField";
import Site from "../../../brightspot-types/com/psddev/cms/db/Site";
import Page from './Page'
import Indexed from "../../../brightspot-types/com/psddev/dari/db/Recordable$Indexed";


@JavaClass('brightspot.example.Article')
export default class Article extends Content.implements(DirectoryItem) {

  @JavaField()
  headline?: string

  @JavaField()
  body?: string

  @JavaField()
  @Indexed()
  page?: Page 

  createPermalink(site: Site): string {
    const Utils = Java.type('com.psddev.dari.util.Utils')
    return Utils.toNormalized(this.getHeadline())
  }
}

