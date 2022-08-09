import Content from "../../../brightspot-types/com/psddev/cms/db/Content";
import DirectoryItem from "../../../brightspot-types/com/psddev/cms/db/Directory$Item"
import JavaClass from "../../../brightspot-types/JavaClass";
import JavaField from "../../../brightspot-types/JavaField";
import ToolUiReadOnly from "../../../brightspot-types/com/psddev/cms/db/ToolUi$ReadOnly"
import Site from "../../../brightspot-types/com/psddev/cms/db/Site";
import App from "./App";
import Indexed from "../../../brightspot-types/com/psddev/dari/db/Recordable$Indexed";

export default class Page extends JavaClass('brightspot.example.Page', Content, DirectoryItem) {
  
  @JavaField
  @Indexed
  app?: App

  @JavaField
  name?: string

  @JavaField
  @ToolUiReadOnly
  url?: string

  beforeCommit(): void {
    this.url = this.getPermalink()
  }

  createPermalink(site: Site): string {
    const Utils = Java.type('com.psddev.dari.util.Utils')
    return Utils.toNormalized(this.name)
  }
}