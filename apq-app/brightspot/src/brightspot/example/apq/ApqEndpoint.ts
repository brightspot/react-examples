import Class from 'brightspot-types/java/lang/Class'
import ContentDeliveryApiEndpoint from 'brightspot-types/com/psddev/graphql/cda/ContentDeliveryApiEndpoint'
import ContentDeliveryEntryPointField from 'brightspot-types/com/psddev/graphql/cda/ContentDeliveryEntryPointField'
import GraphQLApiAccessOption from 'brightspot-types/com/psddev/graphql/GraphQLApiAccessOption'
import GraphQLApiAccessOptionImplicit from 'brightspot-types/com/psddev/graphql/GraphQLApiAccessOptionImplicit'
import GraphQLCorsConfiguration from 'brightspot-types/com/psddev/graphql/GraphQLCorsConfiguration'
import JavaClass from 'brightspot-types/JavaClass'
import JavaSet from 'brightspot-types/java/util/Set'
import List from 'brightspot-types/java/util/List'
import Singleton from 'brightspot-types/com/psddev/dari/db/Singleton'
import FooViewModel from './FooViewModel'
import CustomGraphQLCorsConfiguration from 'brightspot-types/com/psddev/graphql/CustomGraphQLCorsConfiguration'
import FooHashAlgorithm from './FooHashAlgorithm'
import Sha256PersistedQueryHashAlgorithm from 'brightspot-types/com/psddev/graphql/pqp/Sha256PersistedQueryHashAlgorithm'

import CustomAutomaticPersistedQueryProtocol from 'brightspot-types/com/psddev/graphql/pqp/CustomAutomaticPersistedQueryProtocol'
import PersistedQueryProtocol from 'brightspot-types/com/psddev/graphql/pqp/PersistedQueryProtocol'
import ClassFinder from 'brightspot-types/com/psddev/dari/util/ClassFinder'

export default class ApqEndpoint extends JavaClass(
  'brightspot.example.apq.ApqEndpoint',
  ContentDeliveryApiEndpoint,
  Singleton
) {
  getPaths(): JavaSet<string> {
    return ['/graphql/delivery/apq'] as unknown as JavaSet<string>
  }
  [`getPersistedQueryProtocol()`](): PersistedQueryProtocol {
    let apq = new CustomAutomaticPersistedQueryProtocol()
    const FooHashAlgorithm = ClassFinder.getClass('brightspot.example.apq.FooHashAlgorithm')
    const fooHash = new FooHashAlgorithm()
    apq.setHashAlgorithm(fooHash)
    apq.setSharedSecret('mandi')
    console.log('YEAH!! ', apq)
    return apq
  }

  [`getQueryEntryFields()`](): List<ContentDeliveryEntryPointField> {
    return [FooViewModel.class as Class<FooViewModel>].map(
      (c) => new ContentDeliveryEntryPointField(c)
    ) as unknown as List<ContentDeliveryEntryPointField>
  }

  setCorsConfiguration(
    corsConfiguration: CustomGraphQLCorsConfiguration
  ): void {
    corsConfiguration['getAllowedOrigins()']()
  }

  updateCorsConfiguration(corsConfiguration: GraphQLCorsConfiguration): void {
    corsConfiguration.addAllowedOrigin('localhost')
  }

  getApiAccessOption(): GraphQLApiAccessOption {
    return new GraphQLApiAccessOptionImplicit()
  }
}
