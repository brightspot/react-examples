import JavaClass from 'brightspot-types/JavaClass'
import JavaMethodParameters from 'brightspot-types/JavaMethodParameters'
import JavaMethodReturn from 'brightspot-types/JavaMethodReturn'

import ViewInterface from 'brightspot-types/com/psddev/cms/view/ViewInterface'
import ViewModel from 'brightspot-types/com/psddev/cms/view/ViewModel'

import AviationAlphabetEndpoint from './AviationAlphabetEndpoint'

@ViewInterface
export default class AviationAlphabetCodesViewModel extends JavaClass(
  'brightspot.example.automatic_persisted_queries.AviationAlphabetCodesViewModel',
  ViewModel.Of(AviationAlphabetEndpoint)
) {
  @JavaMethodParameters()
  @JavaMethodReturn(String)
  getA(): string {
    return this.model.getAlphabetLetterCode('A')
  }

  @JavaMethodParameters()
  @JavaMethodReturn(String)
  getB(): string {
    return this.model.getAlphabetLetterCode('B')
  }

  @JavaMethodParameters()
  @JavaMethodReturn(String)
  getC(): string {
    return this.model.getAlphabetLetterCode('C')
  }

  @JavaMethodParameters()
  @JavaMethodReturn(String)
  getD(): string {
    return this.model.getAlphabetLetterCode('D')
  }
  @JavaMethodParameters()
  @JavaMethodReturn(String)
  getE(): string {
    return this.model.getAlphabetLetterCode('E')
  }

  @JavaMethodParameters()
  @JavaMethodReturn(String)
  getF(): string {
    return this.model.getAlphabetLetterCode('F')
  }

  @JavaMethodParameters()
  @JavaMethodReturn(String)
  getG(): string {
    return this.model.getAlphabetLetterCode('G')
  }

  @JavaMethodParameters()
  @JavaMethodReturn(String)
  getH(): string {
    return this.model.getAlphabetLetterCode('H')
  }

  @JavaMethodParameters()
  @JavaMethodReturn(String)
  getI(): string {
    return this.model.getAlphabetLetterCode('I')
  }

  @JavaMethodParameters()
  @JavaMethodReturn(String)
  getJ(): string {
    return this.model.getAlphabetLetterCode('J')
  }

  @JavaMethodParameters()
  @JavaMethodReturn(String)
  getK(): string {
    return this.model.getAlphabetLetterCode('K')
  }

  @JavaMethodParameters()
  @JavaMethodReturn(String)
  getL(): string {
    return this.model.getAlphabetLetterCode('L')
  }

  @JavaMethodParameters()
  @JavaMethodReturn(String)
  getM(): string {
    return this.model.getAlphabetLetterCode('M')
  }

  @JavaMethodParameters()
  @JavaMethodReturn(String)
  getN(): string {
    return this.model.getAlphabetLetterCode('N')
  }

  @JavaMethodParameters()
  @JavaMethodReturn(String)
  getO(): string {
    return this.model.getAlphabetLetterCode('O')
  }

  @JavaMethodParameters()
  @JavaMethodReturn(String)
  getP(): string {
    return this.model.getAlphabetLetterCode('P')
  }

  @JavaMethodParameters()
  @JavaMethodReturn(String)
  getQ(): string {
    return this.model.getAlphabetLetterCode('Q')
  }

  @JavaMethodParameters()
  @JavaMethodReturn(String)
  getR(): string {
    return this.model.getAlphabetLetterCode('R')
  }

  @JavaMethodParameters()
  @JavaMethodReturn(String)
  getS(): string {
    return this.model.getAlphabetLetterCode('S')
  }

  @JavaMethodParameters()
  @JavaMethodReturn(String)
  getT(): string {
    return this.model.getAlphabetLetterCode('T')
  }

  @JavaMethodParameters()
  @JavaMethodReturn(String)
  getU(): string {
    return this.model.getAlphabetLetterCode('U')
  }

  @JavaMethodParameters()
  @JavaMethodReturn(String)
  getV(): string {
    return this.model.getAlphabetLetterCode('V')
  }

  @JavaMethodParameters()
  @JavaMethodReturn(String)
  getW(): string {
    return this.model.getAlphabetLetterCode('W')
  }

  @JavaMethodParameters()
  @JavaMethodReturn(String)
  getX(): string {
    return this.model.getAlphabetLetterCode('X')
  }

  @JavaMethodParameters()
  @JavaMethodReturn(String)
  getY(): string {
    return this.model.getAlphabetLetterCode('Y')
  }

  @JavaMethodParameters()
  @JavaMethodReturn(String)
  getZ(): string {
    return this.model.getAlphabetLetterCode('Z')
  }
}
