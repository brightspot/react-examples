import JavaClass from 'brightspot-types/JavaClass'
import JavaField from 'brightspot-types/JavaField'

import Content from 'brightspot-types/com/psddev/cms/db/Content'
import Indexed from 'brightspot-types/com/psddev/dari/db/Recordable$Indexed'
import Required from 'brightspot-types/com/psddev/dari/db/Recordable$Required'

export default class ApqItem extends JavaClass(
  'brightspot.example.automatic_persisted_queries.ApqItem',
  Content
) {
  @Required
  @JavaField(String)
  @Indexed({ unique: true })
  title: string

  @JavaField(String)
  body?: string
}
