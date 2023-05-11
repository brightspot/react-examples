import JavaClass from 'brightspot-types/JavaClass'

import AbstractRestManagementApi from 'brightspot-types/com/psddev/cms/api/AbstractRestManagementApi'
import Singleton from 'brightspot-types/com/psddev/dari/db/Singleton'

export default class RestManagementEndpoint extends JavaClass(
  'brightspot.example.ssg_with_webhooks.RestManagementEndpoint',
  AbstractRestManagementApi,
  Singleton
) {
  [`getName()`](): string {
    return 'Rest Management Endpoint'
  }
  [`getPath()`](): string {
    return '/api/rest/cma'
  }
}
