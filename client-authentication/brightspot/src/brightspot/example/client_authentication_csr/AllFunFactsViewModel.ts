import JavaClass from 'brightspot-types/JavaClass'
import JavaMethodParameters from 'brightspot-types/JavaMethodParameters'
import JavaMethodReturn from 'brightspot-types/JavaMethodReturn'
import List from 'brightspot-types/java/util/List'

import Query from 'brightspot-types/com/psddev/dari/db/Query'
import ViewInterface from 'brightspot-types/com/psddev/cms/view/ViewInterface'
import ViewModel from 'brightspot-types/com/psddev/cms/view/ViewModel'

import ClientAuthEndpoint from './ClientAuthEndpoint'
import FunFact from './FunFact'
import FunFactViewModel from './FunFactViewModel'

@ViewInterface
export default class AllFunFactsViewModel extends JavaClass(
  'brightspot.example.client_authentication.AllFunFactsViewModel',
  ViewModel.Of(ClientAuthEndpoint)
) {
  @JavaMethodParameters()
  @JavaMethodReturn(List.Of(FunFactViewModel))
  getFunFacts(): List<FunFactViewModel> {
    return this.createViews(
      FunFactViewModel.getClass(),
      Query.from(FunFact.getClass()).selectAll()
    )
  }
}
