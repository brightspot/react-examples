import List from 'brightspot-types/java/util/List'

import JavaClass from 'brightspot-types/JavaClass'
import JavaMethodParameters from 'brightspot-types/JavaMethodParameters'
import JavaMethodReturn from 'brightspot-types/JavaMethodReturn'
import Query from 'brightspot-types/com/psddev/dari/db/Query'
import ViewInterface from 'brightspot-types/com/psddev/cms/view/ViewInterface'
import ViewModel from 'brightspot-types/com/psddev/cms/view/ViewModel'

import AppRoutingEndpoint from './AppRoutingEndpoint'
import Section from './Section'
import SectionViewModel from './SectionViewModel'

@ViewInterface
export default class SectionsViewModel extends JavaClass(
  'brightspot.example.app_routing.SectionsViewModel',
  ViewModel.Of(AppRoutingEndpoint)
) {
  @JavaMethodParameters()
  @JavaMethodReturn(List.Of(SectionViewModel))
  getSections(): List<SectionViewModel> {
    return super.createViews(
      SectionViewModel.class,
      Query.from(Section.class).selectAll()
    ) as unknown as List<SectionViewModel>
  }
}