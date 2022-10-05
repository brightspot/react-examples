import JavaClass from 'brightspot-types/JavaClass'
import JavaMethodParameters from 'brightspot-types/JavaMethodParameters'
import JavaMethodReturn from 'brightspot-types/JavaMethodReturn'
import ViewInterface from 'brightspot-types/com/psddev/cms/view/ViewInterface'
import ViewModel from 'brightspot-types/com/psddev/cms/view/ViewModel'

import Member from './Member'

@ViewInterface
export default class MemberViewModel extends JavaClass(
  'brightspot.example.restification.MemberViewModel',
  ViewModel.Of(Member)
) {
  @JavaMethodParameters()
  @JavaMethodReturn(String)
  getDisplayName(): string {
    return this.model.displayName
  }

  @JavaMethodParameters()
  @JavaMethodReturn(String)
  getFirstName(): string {
    return this.model.firstName
  }

  @JavaMethodParameters()
  @JavaMethodReturn(String)
  getLastName(): string {
    return this.model.lastName
  }

  @JavaMethodParameters()
  @JavaMethodReturn(String)
  getEmail(): string {
    return this.model.email
  }

  @JavaMethodParameters()
  @JavaMethodReturn(Number)
  getPhoneNumber(): number {
    return this.model.phoneNumber
  }
}
