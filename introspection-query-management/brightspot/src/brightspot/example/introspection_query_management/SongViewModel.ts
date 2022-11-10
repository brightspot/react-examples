import JavaClass from 'brightspot-types/JavaClass'
import JavaMethodParameters from 'brightspot-types/JavaMethodParameters'
import JavaMethodReturn from 'brightspot-types/JavaMethodReturn'

import ViewInterface from 'brightspot-types/com/psddev/cms/view/ViewInterface'
import ViewModel from 'brightspot-types/com/psddev/cms/view/ViewModel'

import Song from './Song'

@ViewInterface
export default class SongViewModel extends JavaClass(
  'brightspot.example.introspection_query_management.SongViewModel',
  ViewModel.Of(Song)
) {
  @JavaMethodParameters()
  @JavaMethodReturn(String)
  getName(): string {
    return this.model.name
  }

  @JavaMethodParameters()
  @JavaMethodReturn(String)
  getArtist(): string {
    return this.model.artist
  }

  @JavaMethodParameters()
  @JavaMethodReturn(String)
  getAlbum(): string {
    return this.model.album
  }

  @JavaMethodParameters()
  @JavaMethodReturn(String)
  getGenre(): string {
    return this.model.genre
  }

  @JavaMethodParameters()
  @JavaMethodReturn(String)
  getYear(): string {
    return this.model.year
  }

  @JavaMethodParameters()
  @JavaMethodReturn(Number)
  getTrackNumber(): number {
    return this.model.trackNumber
  }
  @JavaMethodParameters()
  @JavaMethodReturn(Number)
  getRating(): number {
    return this.model.rating
  }

  @JavaMethodParameters()
  @JavaMethodReturn(Number)
  getBpm(): number {
    return this.model.bpm
  }

  @JavaMethodParameters()
  @JavaMethodReturn(String)
  getInternalNote(): string {
    return this.model.internalNote
  }
}
