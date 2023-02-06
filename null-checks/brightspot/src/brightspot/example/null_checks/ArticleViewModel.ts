import JavaClass from 'brightspot-types/JavaClass'
import JavaMethodParameters from 'brightspot-types/JavaMethodParameters'
import JavaMethodReturn from 'brightspot-types/JavaMethodReturn'
import ViewInterface from 'brightspot-types/com/psddev/cms/view/ViewInterface'
import ViewModel from 'brightspot-types/com/psddev/cms/view/ViewModel'
import Article from './Article'
import SectionViewModel from './SectionViewModel'

@ViewInterface
export default class ArticleViewModel extends JavaClass(
  'brightspot.example.null_checks.ArticleViewModel',
  ViewModel.Of(Article),

) {

  @JavaMethodParameters()
  @JavaMethodReturn(String)
  getSlug(): string {
    return this.model.slug
  }

  @JavaMethodParameters()
  @JavaMethodReturn(SectionViewModel)
  getSection(): SectionViewModel {
    let foo
    // if (this.model.section) {
     foo = this.createView(SectionViewModel?.getClass(), this.model?.section)
      console.log('FOO!!: ', foo)
      return foo
    // } else {
    //   console.log('NO FOO!', foo)
    //   return
    // }
  }
}
