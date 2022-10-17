import JavaClass from 'brightspot-types/JavaClass'
import JavaMethodParameters from 'brightspot-types/JavaMethodParameters'
import JavaMethodReturn from 'brightspot-types/JavaMethodReturn'
import List from 'brightspot-types/java/util/List'

import ViewInterface from 'brightspot-types/com/psddev/cms/view/ViewInterface'
import ViewModel from 'brightspot-types/com/psddev/cms/view/ViewModel'
import Query from 'brightspot-types/com/psddev/dari/db/Query'

import Movie from './Movie'
import MovieViewModel from './MovieViewModel'
import MovieEndpoint from './SchemaVersioningMovieEndpoint'

@ViewInterface
export default class AllMovies extends JavaClass(
  'brightspot.example.graphql_schema_versioning.AllMovies',
  ViewModel.Of(MovieEndpoint)
) {
  @JavaMethodParameters()
  @JavaMethodReturn(List.Of(MovieViewModel))
  getSections(): List<MovieViewModel> {
    return this.createViews(
      MovieViewModel.class,
      Query.from(Movie.class).selectAll()
    ) as unknown as List<MovieViewModel>
  }
}
