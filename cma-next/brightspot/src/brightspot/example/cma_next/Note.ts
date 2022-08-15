import JavaClass from "../../../../brightspot-types/JavaClass";
import Content from "../../../../brightspot-types/com/psddev/cms/db/Content";
import JavaField from "../../../../brightspot-types/JavaField";
import Indexed from "../../../../brightspot-types/com/psddev/dari/db/Recordable$Indexed";
import JavaRequired from "../../../../brightspot-types/com/psddev/dari/db/Recordable$Required";
export default class Note extends JavaClass(
  "brightspot.example.cma_next.Note",
  Content
) {
  @JavaField(String)
  @JavaRequired
  title?: string;

  @JavaField(String)
  @JavaRequired
  text?: string;

  getLabel(): string {
    return this.title || "";
  }
}
