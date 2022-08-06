import Content from "../../../brightspot-types/com/psddev/cms/db/Content";
import JavaClass from "../../../brightspot-types/JavaClass";
import JavaField from "../../../brightspot-types/JavaField";
import Page from './Page'
import Indexed from "../../../brightspot-types/com/psddev/dari/db/Recordable$Indexed";


@JavaClass('brightspot.example.Article')
export default class Article extends Content.Of() {

  @JavaField()
  headline?: string

  @JavaField()
  body?: string
  
  @JavaField()
  @Indexed()
  page?: Page 

  getLabel():string {
    return this.headline || ''
  }
}

