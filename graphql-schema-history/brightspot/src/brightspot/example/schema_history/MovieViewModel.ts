import JavaClass from 'brightspot-types/JavaClass'
import JavaMethodParameters from 'brightspot-types/JavaMethodParameters'
import JavaMethodReturn from 'brightspot-types/JavaMethodReturn'

import ViewInterface from 'brightspot-types/com/psddev/cms/view/ViewInterface'
import ViewModel from 'brightspot-types/com/psddev/cms/view/ViewModel'

import Movie from './Movie'

@ViewInterface
export default class MovieViewModel extends JavaClass(
  'brightspot.example.schema_history.MovieViewModel',
  ViewModel.Of(Movie)
) {
  @JavaMethodParameters()
  @JavaMethodReturn(String)
  getTitle(): string {
    return this.model.title
  }

  @JavaMethodParameters()
  @JavaMethodReturn(String)
  getDescription(): string {
    return this.model.description
  }

  // Add New Fields:
  // @JavaMethodParameters()
  // @JavaMethodReturn(Number)
  // getReleaseYear(): number {
  //   return this.model.releaseYear
  // }

  // @JavaMethodParameters()
  // @JavaMethodReturn(String)
  // getDirector(): string {
  //   return this.model.director
  // }
}
