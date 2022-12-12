import JavaClass from 'brightspot-types/JavaClass'
import JavaMethodParameters from 'brightspot-types/JavaMethodParameters'
import JavaMethodReturn from 'brightspot-types/JavaMethodReturn'

import Integer from 'brightspot-types/java/lang/Integer'

import StorageItem from 'brightspot-types/com/psddev/dari/util/StorageItem'
import ViewInterface from 'brightspot-types/com/psddev/cms/view/ViewInterface'
import ViewModel from 'brightspot-types/com/psddev/cms/view/ViewModel'
import ViewTemplate from 'brightspot-types/com/psddev/cms/view/ViewTemplate'

import Dog from './Dog'

@ViewInterface
@ViewTemplate({ value: '/dog' })
export default class DogViewModel extends JavaClass(
  'brightspot.example.theming.DogViewModel',
  ViewModel.Of(Dog)
) {
  @JavaMethodParameters()
  @JavaMethodReturn(String)
  getName(): string {
    return this.model.name
  }

  @JavaMethodParameters()
  @JavaMethodReturn(String)
  getUserName(): string {
    return this.model.userName
  }

  @JavaMethodParameters()
  @JavaMethodReturn(String)
  getColor(): string {
    return this.model.color
  }

  @JavaMethodParameters()
  @JavaMethodReturn(String)
  getGender(): string {
    return this.model.gender
  }

  @JavaMethodParameters()
  @JavaMethodReturn(String)
  getBreed(): string {
    return this.model.breed
  }

  @JavaMethodParameters()
  @JavaMethodReturn(Integer)
  getAge(): Integer {
    return this.model.age
  }

  @JavaMethodParameters()
  @JavaMethodReturn(String)
  getDescription(): string {
    return this.model.description
  }

  @JavaMethodParameters()
  @JavaMethodReturn(StorageItem)
  getImage(): StorageItem {
    return this.model.image
  }
}
