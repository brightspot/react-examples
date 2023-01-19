import List from 'brightspot-types/java/util/List'

import JavaClass from 'brightspot-types/JavaClass'
import JavaMethodParameters from 'brightspot-types/JavaMethodParameters'
import JavaMethodReturn from 'brightspot-types/JavaMethodReturn'
import PersistedQueryProtocol from 'brightspot-types/com/psddev/graphql/pqp/PersistedQueryProtocol'
import Query from 'brightspot-types/com/psddev/dari/db/Query'
import ViewInterface from 'brightspot-types/com/psddev/cms/view/ViewInterface'
import ViewModel from 'brightspot-types/com/psddev/cms/view/ViewModel'
import WebRequest from 'brightspot-types/com/psddev/dari/web/WebRequest'

import SpqEndpoint from './SpqEndpoint'
import SpqItem from './SpqItem'
import SpqItemViewModel from './SpqItemViewModel'
import SpqProtocol from './SpqProtocol'

@ViewInterface
export default class SpqItemsViewModel extends JavaClass(
  'brightspot.example.app_routing.SpqItemsViewModel',
  ViewModel.Of(SpqEndpoint)
) {
  @JavaMethodParameters()
  @JavaMethodReturn(List.Of(SpqItemViewModel))
  getSpqItems(): List<SpqItemViewModel> {
    return this.createViews(
      SpqItemViewModel.getClass(),
      Query.from(SpqItem.getClass()).selectAll()
    ) as unknown as List<SpqItemViewModel>
  }

  @JavaMethodParameters()
  @JavaMethodReturn(String)
  getWhitelistVersionUsed(): string {
    let version = WebRequest.getCurrent().getHeader('X-App-Version')
    const whitelist = Query.from(SpqProtocol.getClass())
      .where('version = ?', version)
      .first() as unknown as PersistedQueryProtocol
    if (whitelist) {
      return version
    }
  }
}
