import JavaClass from "../../../../brightspot-types/JavaClass";
import Content from "../../../../brightspot-types/com/psddev/cms/db/Content";
import JavaField from "../../../../brightspot-types/JavaField";
import JavaRequired from "../../../../brightspot-types/com/psddev/dari/db/Recordable$Required";
import Site from "../../../../brightspot-types/com/psddev/cms/db/Site";
import DirectoryItem from "../../../../brightspot-types/com/psddev/cms/db/Directory$Item";

export default class HelloWorld extends JavaClass(
  "brightspot.example.hello_graphql_cda.HelloWorld",
  Content,
  DirectoryItem
) {
  @JavaRequired
  @JavaField(String)
  title?: string;

  @JavaField(String)
  text?: string;

  getTitle(): string {
    return this.title || "";
  }

  getText(): string {
    return this.text || "";
  }

  createPermalink(site: Site): string {
    const Utils = Java.type("com.psddev.dari.util.Utils");
    return Utils.toNormalized(this.title);
  }
}
