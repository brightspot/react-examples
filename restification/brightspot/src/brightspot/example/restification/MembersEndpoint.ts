import JavaClass from 'brightspot-types/JavaClass'
import JavaSet from 'brightspot-types/java/util/Set'
import List from 'brightspot-types/java/util/List'

import ContentManagementApiEndpointV1 from 'brightspot-types/com/psddev/graphql/cma/ContentManagementApiEndpointV1'
import ContentManagementEntryPointField from 'brightspot-types/com/psddev/graphql/cma/ContentManagementEntryPointField'
import DisplayName from 'brightspot-types/com/psddev/dari/db/Recordable$DisplayName'
import GraphQLCorsConfiguration from 'brightspot-types/com/psddev/graphql/GraphQLCorsConfiguration'
import Singleton from 'brightspot-types/com/psddev/dari/db/Singleton'

import Member from './Member'

@DisplayName({ value: 'Members API: Restification' })
export default class MembersEndpoint extends JavaClass(
  'brightspot.example.restification.MembersEndpoint',
  ContentManagementApiEndpointV1,
  Singleton
) {
  [`getEntryFields()`](): List<ContentManagementEntryPointField> {
    let entryPointField1 = new ContentManagementEntryPointField(
      Member.getClass(),
      true
    )
    return [
      entryPointField1,
    ] as unknown as List<ContentManagementEntryPointField>
  }
  getPaths(): JavaSet<string> {
    return ['/graphql/management/members'] as unknown as JavaSet<string>
  }

  updateCorsConfiguration(corsConfiguration: GraphQLCorsConfiguration): void {
    super.updateCorsConfiguration(corsConfiguration)
    corsConfiguration.addAllowedOrigin('*')
  }
}
