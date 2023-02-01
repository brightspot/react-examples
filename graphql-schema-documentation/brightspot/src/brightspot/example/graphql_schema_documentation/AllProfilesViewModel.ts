import JavaClass from 'brightspot-types/JavaClass'
import JavaMethodParameters from 'brightspot-types/JavaMethodParameters'
import JavaMethodReturn from 'brightspot-types/JavaMethodReturn'
import List from 'brightspot-types/java/util/List'

import Query from 'brightspot-types/com/psddev/dari/db/Query'
import ViewInterface from 'brightspot-types/com/psddev/cms/view/ViewInterface'
import ViewModel from 'brightspot-types/com/psddev/cms/view/ViewModel'

import Profile from './Profile'
import ProfileViewModel from './ProfileViewModel'
import GraphQLSchemaDocumentationEndpoint from './GraphQLSchemaDocumentationEndpoint'

@ViewInterface
export default class AllProfilesViewModel extends JavaClass(
  'brightspot.example.graphql_schema_documentation.AllProfilesViewModel',
  ViewModel.Of(GraphQLSchemaDocumentationEndpoint)
) {
  @JavaMethodParameters()
  @JavaMethodReturn(List.Of(ProfileViewModel))
  getProfiles(): List<ProfileViewModel> {
    return this.createViews(
      ProfileViewModel.getClass(),
      Query.from(Profile.getClass()).selectAll()
    )
  }
}
