import Content from "../../../brightspot-types/com/psddev/cms/db/Content";
import DirectoryItem from "../../../brightspot-types/com/psddev/cms/db/Directory$Item"
import Site from "../../../brightspot-types/com/psddev/cms/db/Site";
import JavaClass from "../../../brightspot-types/JavaClass";
import JavaField from "../../../brightspot-types/JavaField";

@JavaClass('brightspot.example.App')
export default class App extends Content.implements(DirectoryItem) {

  @JavaField()
  title?: string

  createPermalink(site: Site): string {
    const Utils = Java.type('com.psddev.dari.util.Utils')
    return Utils.toNormalized(this.getTitle())
  }
}