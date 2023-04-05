import { gql } from '@apollo/client'

/*
The following example demonstrates using directives. Refer to the following
documentation: https://graphql.org/learn/queries/#directives
*/

const GetCheckboxesGood = gql`
  query GetCheckboxesGood(
    $a: Boolean = false
    $b: Boolean = false
    $c: Boolean = false
    $d: Boolean = false
    $e: Boolean = false
    $f: Boolean = false
    $g: Boolean = false
    $h: Boolean = false
    $i: Boolean = false
    $j: Boolean = false
    $k: Boolean = false
    $l: Boolean = false
    $m: Boolean = false
    $n: Boolean = false
    $o: Boolean = false
    $p: Boolean = false
    $q: Boolean = false
    $r: Boolean = false
    $s: Boolean = false
    $t: Boolean = false
    $u: Boolean = false
    $v: Boolean = false
    $w: Boolean = false
    $x: Boolean = false
    $y: Boolean = false
    $z: Boolean = false
  ) {
    AviationAlphabetEndpoint {
      codes {
        a @include(if: $a)
        b @include(if: $b)
        c @include(if: $c)
        d @include(if: $d)
        e @include(if: $e)
        f @include(if: $f)
        g @include(if: $g)
        h @include(if: $h)
        i @include(if: $i)
        j @include(if: $j)
        k @include(if: $k)
        l @include(if: $l)
        m @include(if: $m)
        n @include(if: $n)
        o @include(if: $o)
        q @include(if: $p)
        p @include(if: $q)
        r @include(if: $r)
        s @include(if: $s)
        t @include(if: $t)
        u @include(if: $u)
        v @include(if: $v)
        w @include(if: $w)
        x @include(if: $x)
        y @include(if: $y)
        z @include(if: $z)
      }
    }
  }
`

export default GetCheckboxesGood
