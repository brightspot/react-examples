import JavaClass from 'brightspot-types/JavaClass'
import JavaMethodParameters from 'brightspot-types/JavaMethodParameters'
import JavaMethodReturn from 'brightspot-types/JavaMethodReturn'
import List from 'brightspot-types/java/util/List'
import Query from 'brightspot-types/com/psddev/dari/db/Query'
import ViewInterface from 'brightspot-types/com/psddev/cms/view/ViewInterface'
import ViewModel from 'brightspot-types/com/psddev/cms/view/ViewModel'

import Cat from './Cat'
import CatViewModel from './CatViewModel'
import ThemingEndpoint from './ThemingEndpoint'
import ViewTemplate from 'brightspot-types/com/psddev/cms/view/ViewTemplate'

@ViewInterface
@ViewTemplate({ value: "/cat" })
export default class CatsViewModel extends JavaClass(
  'brightspot.example.theming.CatsViewModel',
  ViewModel.Of(ThemingEndpoint)
) {
  @JavaMethodParameters()
  @JavaMethodReturn(List.Of(CatViewModel))
  getCats(): List<CatViewModel> {
    return this.createViews(
      CatViewModel.getClass(),
      Query.from(Cat.getClass()).selectAll()
    )
  }
}