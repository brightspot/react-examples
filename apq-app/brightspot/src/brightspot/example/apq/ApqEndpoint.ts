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
import ArticleViewModel from './ArticleViewModel'
import CustomGraphQLCorsConfiguration from 'brightspot-types/com/psddev/graphql/CustomGraphQLCorsConfiguration'
import ArticleHashAlgorithm from './ArticleHashAlgorithm'

import CustomAutomaticPersistedQueryProtocol from 'brightspot-types/com/psddev/graphql/pqp/CustomAutomaticPersistedQueryProtocol'
import PersistedQueryProtocol from 'brightspot-types/com/psddev/graphql/pqp/PersistedQueryProtocol'
// import AutomaticPersistedQueryProtocol from 'brightspot-types/com/psddev/graphql/AutomaticPersistedQueryProtocol'

export default class ApqEndpoint extends JavaClass(
  'brightspot.example.apq.ApqEndpoint',
  ContentDeliveryApiEndpoint,
  Singleton
) {
  getPaths(): JavaSet<string> {
    return ['/graphql/delivery/apq'] as unknown as JavaSet<string>
  }

  [`getQueryEntryFields()`](): List<ContentDeliveryEntryPointField> {
    return [ArticleViewModel.class as Class<ArticleViewModel>].map(
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

  [`getPersistedQueryProtocol()`](): PersistedQueryProtocol {
    let apq = new CustomAutomaticPersistedQueryProtocol()
    // apq.setHashAlgorithm(new ArticleHashAlgorithm())
    const foo = new ArticleHashAlgorithm()
    apq[
      'setHashAlgorithm(com.psddev.graphql.pqp.AutomaticPersistedQueryHashAlgorithm)'
    ](foo)
    // apq['generateQueryExtension(java.lang.String)']()
    // console.log('FOO ', foo)
    // const bar = apq['getHashAlgorithm()']()
    // const baz = bar.generateQueryExtension('test', 'hello')
    // console.log('BAR ', bar)
    // console.log('BAZ ', baz)

    return apq
  }
  getApiAccessOption(): GraphQLApiAccessOption {
    return new GraphQLApiAccessOptionImplicit()
  }
}
