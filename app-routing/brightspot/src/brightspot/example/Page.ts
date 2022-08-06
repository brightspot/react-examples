import JavaClass from '../../../brightspot-types/JavaClass'
import Content from '../../../brightspot-types/com/psddev/cms/db/Content'
import JavaField from '../../../brightspot-types/JavaField'
import App from './App'
import Indexed from '../../../brightspot-types/com/psddev/dari/db/Recordable$Indexed'

@JavaClass('brightspot.example.Page')
export default class Page extends Content.Of() {
  
  @JavaField()
  name?: string


  @JavaField()
  @Indexed()
  app?: App

  getLabel():string {
    return this.name || ''
  }
}


