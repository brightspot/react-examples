import JavaClass from 'brightspot-types/JavaClass'
import JavaMethodParameters from 'brightspot-types/JavaMethodParameters'
import JavaMethodReturn from 'brightspot-types/JavaMethodReturn'

import List from 'brightspot-types/java/util/List'
import Query from 'brightspot-types/com/psddev/dari/db/Query'
import ViewInterface from 'brightspot-types/com/psddev/cms/view/ViewInterface'
import ViewModel from 'brightspot-types/com/psddev/cms/view/ViewModel'
import ViewTemplate from 'brightspot-types/com/psddev/cms/view/ViewTemplate'

import Dog from './Dog'
import DogViewModel from './DogViewModel'
import ThemingEndpoint from './ThemingEndpoint'

@ViewInterface
@ViewTemplate({ value: '/dog' })
export default class DogsViewModel extends JavaClass(
  'brightspot.example.theming.DogsViewModel',
  ViewModel.Of(ThemingEndpoint)
) {
  @JavaMethodParameters()
  @JavaMethodReturn(List.Of(DogViewModel))
  getDogs(): List<DogViewModel> {
    return this.createViews(
      DogViewModel.getClass(),
      Query.from(Dog.getClass()).selectAll()
    )
  }
}
