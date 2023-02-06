import Content from 'brightspot-types/com/psddev/cms/db/Content'
import DisplayName from 'brightspot-types/com/psddev/dari/db/Recordable$DisplayName'
import Indexed from 'brightspot-types/com/psddev/dari/db/Recordable$Indexed'
import JavaClass from 'brightspot-types/JavaClass'
import JavaField from 'brightspot-types/JavaField'
import JavaRequired from 'brightspot-types/com/psddev/dari/db/Recordable$Required'

@DisplayName({ value: 'Test Section' })
export default class Section extends JavaClass(
  'brightspot.example.null_checks.Section',
  Content,
) {
  @JavaField(String)
  @JavaRequired
  name: string

  @JavaField(String)
  @Indexed({ unique: true })
  @JavaRequired
  slug: string;
}
