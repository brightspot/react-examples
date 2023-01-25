import Singleton from 'brightspot-types/com/psddev/dari/db/Singleton'
import JavaClass from 'brightspot-types/JavaClass'
import AbstractRestManagementApi from 'brightspot-types/com/psddev/cms/api/AbstractRestManagementApi'

export default class RestManagementTest extends JavaClass(
  'brightspot.example.ssg_with_webhooks.RestManagementTest',
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
