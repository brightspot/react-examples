import JavaClass from 'brightspot-types/JavaClass'
import JavaMethodParameters from 'brightspot-types/JavaMethodParameters'
import JavaMethodReturn from 'brightspot-types/JavaMethodReturn'
import List from 'brightspot-types/java/util/List'

import Query from 'brightspot-types/com/psddev/dari/db/Query'
import ViewInterface from 'brightspot-types/com/psddev/cms/view/ViewInterface'
import ViewModel from 'brightspot-types/com/psddev/cms/view/ViewModel'

import Member from './Member'
import MemberEndpoint from './MemberEndpoint'
import MemberViewModel from './MemberViewModel'

@ViewInterface
export default class MembersViewModel extends JavaClass(
  'brightspot.example.restification.MembersViewModel',
  ViewModel.Of(MemberEndpoint)
) {
  @JavaMethodParameters()
  @JavaMethodReturn(List.Of(MemberViewModel))
  getMembers(): List<MemberViewModel> {
    return this.createViews(
      MemberViewModel.class,
      Query.from(Member.class).selectAll()
    ) as List<MemberViewModel>
  }
}
