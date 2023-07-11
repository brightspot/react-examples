import { CheckboxesData, TextData } from './types'
import React from 'react'

export const alphabetArray = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z',
]

export const getTextData = (
  textQueryType: string,
  text: string,
  setTextData: React.Dispatch<React.SetStateAction<TextData | null>>,
  setError: React.Dispatch<
    React.SetStateAction<{ isError: boolean; message: string }>
  >,
  setTextTime: React.Dispatch<React.SetStateAction<number | null>>
) => {
  if (!text) {
    setTextData(null)
  } else {
    const queryParams = `?text=${text}`
    const start = Date.now()
    let end: number | undefined
    const selectedTextQuery = textQueryType
    fetch(
      `${process.env.NEXT_PUBLIC_HOST}/api/${selectedTextQuery}${queryParams}`
    )
      .then((res) => {
        if (res.status >= 400) {
          setError({
            isError: true,
            message: `${res.status} - ${res.statusText}`,
          })
        }
        return res.json()
      })
      .then((res) => {
        end = Date.now()
        setTextTime(end - start)
        setTextData(res)
      })
      .catch((err: any) => {
        console.log('error requesting data', err)
      })
  }
}

export const getCheckboxesData = (
  checkboxesQueryType: string,
  checkedLetters: string[],
  setCheckboxesData: React.Dispatch<
    React.SetStateAction<CheckboxesData | null>
  >,
  setError: React.Dispatch<
    React.SetStateAction<{ isError: boolean; message: string }>
  >,
  setCheckboxesTime: React.Dispatch<React.SetStateAction<number | null>>
) => {
  if (checkedLetters.length === 0) {
    setCheckboxesData(null)
  } else {
    const queryParams = `?checkboxes=${checkedLetters.join(',')}`
    const start = Date.now()
    let end: number | undefined
    const selectedCheckboxesQuery = checkboxesQueryType
    fetch(
      `${process.env.NEXT_PUBLIC_HOST}/api/${selectedCheckboxesQuery}${queryParams}`
    )
      .then((res) => {
        if (res.status >= 400) {
          setError({
            isError: true,
            message: `${res.status} - ${res.statusText}`,
          })
        }
        return res.json()
      })
      .then((res) => {
        end = Date.now()
        setCheckboxesTime(end - start)
        setCheckboxesData(res)
      })
      .catch((err: any) => {
        console.log('error requesting data', err)
      })
  }
}
