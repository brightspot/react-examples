import Content from "../../../brightspot-types/com/psddev/cms/db/Content";
import DirectoryItem from "../../../brightspot-types/com/psddev/cms/db/Directory$Item"
import JavaClass from "../../../brightspot-types/JavaClass";
import JavaField from "../../../brightspot-types/JavaField";
import ToolUiReadOnly from "../../../brightspot-types/com/psddev/cms/db/ToolUi$ReadOnly"
import Site from "../../../brightspot-types/com/psddev/cms/db/Site";
import Page from "./Page";
import Indexed from "../../../brightspot-types/com/psddev/dari/db/Recordable$Indexed";

export default class Article extends JavaClass('brightspot.example.Article', Content, DirectoryItem) {

  @JavaField
  @Indexed()
  page?: Page

  @JavaField
  headline?: string

  @JavaField
  body?: string

  @JavaField
  @ToolUiReadOnly()
  url?: string

  beforeCommit():void {
    this.url = this.getPermalink()
  }

  createPermalink(site: Site): string {
    const Utils = Java.type('com.psddev.dari.util.Utils')
    return Utils.toNormalized(this.headline)
  }
}