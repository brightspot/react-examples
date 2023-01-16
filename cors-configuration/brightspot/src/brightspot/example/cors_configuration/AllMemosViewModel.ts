import JavaClass from 'brightspot-types/JavaClass'
import JavaMethodParameters from 'brightspot-types/JavaMethodParameters'
import JavaMethodReturn from 'brightspot-types/JavaMethodReturn'
import List from 'brightspot-types/java/util/List'

import Query from 'brightspot-types/com/psddev/dari/db/Query'
import ViewInterface from 'brightspot-types/com/psddev/cms/view/ViewInterface'
import ViewModel from 'brightspot-types/com/psddev/cms/view/ViewModel'

import Memo from './Memo'
import CorsConfigurationEndPoint from './CorsConfigurationEndpoint'
import MemoViewModel from './MemoViewModel'

@ViewInterface
export default class AllMemosViewModel extends JavaClass(
  'brightspot.example.cors_configuration.AllMemosViewModel',
  ViewModel.Of(CorsConfigurationEndPoint)
) {
  @JavaMethodParameters()
  @JavaMethodReturn(List.Of(MemoViewModel))
  getMemos(): List<MemoViewModel> {
    return this.createViews(
      MemoViewModel.getClass(),
      Query.from(Memo.getClass()).selectAll()
    )
  }
}
