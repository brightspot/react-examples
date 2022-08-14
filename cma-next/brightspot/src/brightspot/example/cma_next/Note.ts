import JavaClass from "../../../../brightspot-types/JavaClass";
import Content from "../../../../brightspot-types/com/psddev/cms/db/Content";
import JavaField from "../../../../brightspot-types/JavaField";
export default class Note extends JavaClass(
  "brightspot.example.cma_next.Note",
  Content
) {
  @JavaField(String)
  title?: string;

  @JavaField(String)
  text?: string;

  getLabel(): string {
    return this.title || "";
  }
}
