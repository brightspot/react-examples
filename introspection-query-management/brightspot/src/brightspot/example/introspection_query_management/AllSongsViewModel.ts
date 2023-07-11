import JavaClass from 'brightspot-types/JavaClass'
import JavaMethodParameters from 'brightspot-types/JavaMethodParameters'
import JavaMethodReturn from 'brightspot-types/JavaMethodReturn'
import List from 'brightspot-types/java/util/List'

import Query from 'brightspot-types/com/psddev/dari/db/Query'
import ViewInterface from 'brightspot-types/com/psddev/cms/view/ViewInterface'
import ViewModel from 'brightspot-types/com/psddev/cms/view/ViewModel'

import IntrospectionQueryManagementEndpoint from './IntrospectionQueryManagementEndpoint'
import Song from './Song'
import SongViewModel from './SongViewModel'

@ViewInterface
export default class AllSongsViewModel extends JavaClass(
  'brightspot.example.introspection_query_management.AllSongsViewModel',
  ViewModel.Of(IntrospectionQueryManagementEndpoint)
) {
  @JavaMethodParameters()
  @JavaMethodReturn(List.Of(SongViewModel))
  getSongs(): List<SongViewModel> {
    return this.createViews(
      SongViewModel.getClass(),
      Query.from(Song.getClass()).selectAll()
    )
  }
}
