import Class from 'brightspot-types/java/lang/Class'
import JavaClass from 'brightspot-types/JavaClass'
import JavaMethodParameters from 'brightspot-types/JavaMethodParameters'
import JavaMethodReturn from 'brightspot-types/JavaMethodReturn'
import List from 'brightspot-types/java/util/List'

import DirectoryStatic from 'brightspot-types/com/psddev/cms/db/Directory$Static'
import Query from 'brightspot-types/com/psddev/dari/db/Query'
import ViewInterface from 'brightspot-types/com/psddev/cms/view/ViewInterface'
import ViewModel from 'brightspot-types/com/psddev/cms/view/ViewModel'

import BrightspotRoutingEndpoint from './BrightspotRoutingEndpoint'
import Section from './Section'
import SectionViewModel from './SectionViewModel'

@ViewInterface
export default class AllSectionsViewModel extends JavaClass(
  'brightspot.example.brightspot_routing.AllSectionsViewModel',
  ViewModel.Of(BrightspotRoutingEndpoint)
) {
  @JavaMethodParameters()
  @JavaMethodReturn(List.Of(SectionViewModel))
  getSections(): List<SectionViewModel> {
    return this.createViews(
      SectionViewModel.getClass() as Class<SectionViewModel>,
      Query.from(Section.getClass())
        .where(DirectoryStatic.hasPathPredicate())
        .selectAll()
    ) as List<SectionViewModel>
  }
}
