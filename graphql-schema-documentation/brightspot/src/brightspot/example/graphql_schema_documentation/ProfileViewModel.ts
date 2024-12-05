import JavaClass from 'brightspot-types/JavaClass'
import JavaMethodParameters from 'brightspot-types/JavaMethodParameters'
import JavaMethodReturn from 'brightspot-types/JavaMethodReturn'

import ViewInterface from 'brightspot-types/com/psddev/cms/view/ViewInterface'
import ViewModel from 'brightspot-types/com/psddev/cms/view/ViewModel'

import Profile from './Profile'

import Javadoc from 'brightspot-types/com/psddev/dari/db/Javadoc'

@Javadoc({
  value:
    '<strong>Profile</strong><img src="https://pics.freeicons.io/uploads/icons/png/4850898981548233623-128.png" alt="profile_image"/>',
})
@ViewInterface
export default class ProfileViewModel extends JavaClass(
  'brightspot.example.graphql_schema_documentation.ProfileViewModel',
  ViewModel.Of(Profile)
) {
  @Javadoc({ value: `<strong>A Profile's Display Name</strong>` })
  @JavaMethodParameters()
  @JavaMethodReturn(String)
  getDisplayName(): string {
    return this.model.displayName
  }

  @JavaMethodParameters()
  @JavaMethodReturn(String)
  getFavoriteSport(): string {
    return this.model.favouriteSport
  }

  @JavaMethodParameters()
  @JavaMethodReturn(String)
  getFavoriteBook(): string {
    return this.model.favouriteBook
  }

  @JavaMethodParameters()
  @JavaMethodReturn(String)
  getFavoriteSong(): string {
    return this.model.favouriteSong
  }

  @JavaMethodParameters()
  @JavaMethodReturn(String)
  getFavoriteFood(): string {
    return this.model.favouriteFood
  }
}
