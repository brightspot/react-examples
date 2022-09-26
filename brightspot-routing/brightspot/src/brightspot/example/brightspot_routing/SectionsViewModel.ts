import Class from 'brightspot-types/java/lang/Class'
import JavaClass from 'brightspot-types/JavaClass'
import JavaMethodParameters from 'brightspot-types/JavaMethodParameters'
import JavaMethodReturn from 'brightspot-types/JavaMethodReturn'
import List from 'brightspot-types/java/util/List'

import Query from 'brightspot-types/com/psddev/dari/db/Query'
import ViewInterface from 'brightspot-types/com/psddev/cms/view/ViewInterface'
import ViewModel from 'brightspot-types/com/psddev/cms/view/ViewModel'

import BrightspotRoutingEndpoint from './BrightspotRoutingEndpoint'
import Section from './Section'
import SectionViewModel from './SectionViewModel'

@ViewInterface
export default class SectionsViewModel extends JavaClass(
  'brightspot.example.brightspot_routing.SectionsViewModel',
  ViewModel.Of(BrightspotRoutingEndpoint)
) {
  @JavaMethodParameters()
  @JavaMethodReturn(List.Of(SectionViewModel))
  getSections(): List<SectionViewModel> {
    return super.createViews(
      SectionViewModel.class as Class<SectionViewModel>,
      Query.from(Section.class).selectAll()
    ) as unknown as List<SectionViewModel>
  }
}
