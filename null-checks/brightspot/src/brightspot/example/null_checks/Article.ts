import Content from 'brightspot-types/com/psddev/cms/db/Content'
import Indexed from 'brightspot-types/com/psddev/dari/db/Recordable$Indexed'
import JavaClass from 'brightspot-types/JavaClass'
import JavaField from 'brightspot-types/JavaField'
import JavaRequired from 'brightspot-types/com/psddev/dari/db/Recordable$Required'

import Section from './Section'
import DisplayName from 'brightspot-types/com/psddev/dari/db/Recordable$DisplayName'

@DisplayName({ value: 'Test Article' })
export default class Article extends JavaClass(
  'brightspot.example.null_checks.Article',
  Content
) {
  @JavaField(String)
  @JavaRequired
  headline: string

  @JavaField(String)
  @Indexed({ unique: true })
  @JavaRequired
  slug: string

  @JavaField(Section)
  @Indexed
  section: Section
}
