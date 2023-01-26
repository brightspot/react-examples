import JavaClass from 'brightspot-types/JavaClass'
import JavaMethodParameters from 'brightspot-types/JavaMethodParameters'
import JavaMethodReturn from 'brightspot-types/JavaMethodReturn'

import ViewInterface from 'brightspot-types/com/psddev/cms/view/ViewInterface'
import ViewModel from 'brightspot-types/com/psddev/cms/view/ViewModel'

import AviationAlphabetApi from './AviationAlphabetApi'
import WebParameter from 'brightspot-types/com/psddev/dari/web/annotation/WebParameter'
import JavaField from 'brightspot-types/JavaField'

@ViewInterface
export default class AviationAlphabetConverterViewModel extends JavaClass(
  'brightspot.example.automatic_persisted_queries.AviationAlphabetConverterViewModel',
  ViewModel.Of(AviationAlphabetApi)
) {
  @JavaField(String)
  @WebParameter
  text: string

  @JavaMethodParameters()
  @JavaMethodReturn(String)
  getOutput() {
    let stringBuilder = []
    if (this.text === null) {
      return null
    }
    let isLastCharacterFound = false
    const charArray = this.text.split('')

    for (const char of charArray) {
      const word = this.model.getLetterOutputFromText(char)
      if (word === null) {
        if (isLastCharacterFound && char !== ' ') {
          stringBuilder.push(' ')
        }
        stringBuilder.push(char)
        isLastCharacterFound = false
      } else {
        if (
          stringBuilder.length > 0 &&
          stringBuilder[stringBuilder.length - 1] !== ' '
        ) {
          stringBuilder.push(' ')
        }
        stringBuilder.push(word)
        isLastCharacterFound = true
      }
    }
    return stringBuilder.join('').trim()
  }
}
