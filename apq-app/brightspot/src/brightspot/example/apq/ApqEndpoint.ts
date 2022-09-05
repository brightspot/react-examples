import Class from 'brightspot-types/java/lang/Class'
// import ContentDeliveryApiEndpoint from 'brightspot-types/com/psddev/graphql/cda/ContentDeliveryApiEndpoint'
import ContentDeliveryEntryPointField from 'brightspot-types/com/psddev/graphql/cda/ContentDeliveryEntryPointField'
import GraphQLApiAccessOption from 'brightspot-types/com/psddev/graphql/GraphQLApiAccessOption'
import GraphQLApiAccessOptionImplicit from 'brightspot-types/com/psddev/graphql/GraphQLApiAccessOptionImplicit'
import GraphQLCorsConfiguration from 'brightspot-types/com/psddev/graphql/GraphQLCorsConfiguration'
import JavaClass from 'brightspot-types/JavaClass'
import JavaSet from 'brightspot-types/java/util/Set'
import List from 'brightspot-types/java/util/List'
import Singleton from 'brightspot-types/com/psddev/dari/db/Singleton'
import CustomContentDeliveryApiEndpoint from 'brightspot-types/com/psddev/graphql/cda/CustomContentDeliveryApiEndpoint'

import ArticleViewModel from './ArticleViewModel'
import PersistedQueryProtocol from 'brightspot-types/com/psddev/graphql/pqp/PersistedQueryProtocol'
import CustomGraphQLCorsConfiguration from 'brightspot-types/com/psddev/graphql/CustomGraphQLCorsConfiguration'

export default class ApqEndpoint extends JavaClass(
  'brightspot.example.apq.ApqEndpoint',
  CustomContentDeliveryApiEndpoint,
  Singleton
) {
  persistedQueryProtocol: PersistedQueryProtocol
  getName(): string {
    return 'My cool endpoint'
  }
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

  setPersistedQueryProtocol(
    persistedQueryProtocol: PersistedQueryProtocol
  ): void {
    this.persistedQueryProtocol = persistedQueryProtocol
  }

  getApiAccessOption(): GraphQLApiAccessOption {
    return new GraphQLApiAccessOptionImplicit()
  }
}
