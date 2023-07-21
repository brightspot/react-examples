import JavaClass from 'brightspot-types/JavaClass'
import JavaMethodParameters from 'brightspot-types/JavaMethodParameters'
import JavaMethodReturn from 'brightspot-types/JavaMethodReturn'
import List from 'brightspot-types/java/util/List'

import CurrentSite from 'brightspot-types/com/psddev/cms/page/CurrentSite'
import DirectoryStatic from 'brightspot-types/com/psddev/cms/db/Directory$Static'
import Query from 'brightspot-types/com/psddev/dari/db/Query'
import Site from 'brightspot-types/com/psddev/cms/db/Site'
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
  @CurrentSite
  site?: Site

  @JavaMethodParameters()
  @JavaMethodReturn(List.Of(SectionViewModel))
  getSections(): List<SectionViewModel> {
    let query = Query.from(Section.getClass())
    
    query.where(DirectoryStatic.hasPathPredicate())
    
    if (this.site) {
      query.and(this.site.itemsPredicate())
    } else {
      query.and('cms.site.owner = missing')
    }

    let sections = query.selectAll()

    return this.createViews(
      SectionViewModel.getClass(),
      sections
    )
  }
}
