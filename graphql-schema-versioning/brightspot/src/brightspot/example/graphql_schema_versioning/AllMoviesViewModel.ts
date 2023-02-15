import JavaClass from 'brightspot-types/JavaClass'
import JavaMethodParameters from 'brightspot-types/JavaMethodParameters'
import JavaMethodReturn from 'brightspot-types/JavaMethodReturn'
import List from 'brightspot-types/java/util/List'

import Query from 'brightspot-types/com/psddev/dari/db/Query'
import ViewInterface from 'brightspot-types/com/psddev/cms/view/ViewInterface'
import ViewModel from 'brightspot-types/com/psddev/cms/view/ViewModel'

import Movie from './Movie'
import MovieEndpoint from './SchemaVersioningMovieEndpoint'
import MovieViewModel from './MovieViewModel'

@ViewInterface
export default class AllMoviesViewModel extends JavaClass(
  'brightspot.example.graphql_schema_versioning.AllMoviesViewModel',
  ViewModel.Of(MovieEndpoint)
) {
  @JavaMethodParameters()
  @JavaMethodReturn(List.Of(MovieViewModel))
  getMovies(): List<MovieViewModel> {
    return this.createViews(
      MovieViewModel.getClass(),
      Query.from(Movie.getClass()).selectAll()
    )
  }
}
