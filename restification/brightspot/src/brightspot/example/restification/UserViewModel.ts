import JavaClass from 'brightspot-types/JavaClass'
import JavaMethodParameters from 'brightspot-types/JavaMethodParameters'
import JavaMethodReturn from 'brightspot-types/JavaMethodReturn'
import ViewInterface from 'brightspot-types/com/psddev/cms/view/ViewInterface'
import ViewModel from 'brightspot-types/com/psddev/cms/view/ViewModel'

import User from './User'

@ViewInterface
export default class UserViewModel extends JavaClass(
  'brightspot.example.restification.UserViewModel',
  ViewModel.Of(User)
) {
  @JavaMethodParameters()
  @JavaMethodReturn(String)
  getUsername(): string {
    return this.model.username
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
