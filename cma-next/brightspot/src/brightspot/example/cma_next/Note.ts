import JavaClass from "../../../../brightspot-types/JavaClass";
import Content from "../../../../brightspot-types/com/psddev/cms/db/Content";
import JavaField from "../../../../brightspot-types/JavaField";
export default class Note extends JavaClass(
  "brightspot.example.cma_next.Note",
  Content
) {
  @JavaField
  title?: string;

  @JavaField
  text?: string;

  getLabel(): string {
    return this.title || "";
  }
}
