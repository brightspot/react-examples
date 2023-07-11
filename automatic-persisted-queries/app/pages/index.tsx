import type { NextPage } from 'next'
import { useState, useEffect, ChangeEvent } from 'react'
import styles from '../styles/Home.module.css'
import { TextData, CheckboxesData } from '../lib/types'
import { alphabetArray, getCheckboxesData, getTextData } from '../lib/helpers'

const Home: NextPage = () => {
  const [textData, setTextData] = useState<TextData | null>(null)
  const [checkboxesData, setCheckboxesData] = useState<CheckboxesData | null>(
    null
  )
  const [error, setError] = useState({ isError: false, message: '' })
  const [text, setText] = useState('')
  const [checkedLetters, setCheckedLetters] = useState<string[]>([])
  const [checkboxesQueryType, setCheckoxesQueryType] =
    useState('checkboxesGood')
  const [textQueryType, setTextQueryType] = useState('textGood')
  const [textTime, setTextTime] = useState<number | null>(null)
  const [checkboxesTime, setCheckboxesTime] = useState<number | null>(null)

  const handleTextType = (e: ChangeEvent<HTMLInputElement>) => {
    setTextQueryType(e.target.value)
  }

  const handleCheckboxesType = (e: ChangeEvent<HTMLInputElement>) => {
    setCheckoxesQueryType(e.target.value)
  }

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      if (!checkedLetters.includes(e.target.value)) {
        setCheckedLetters([...checkedLetters, e.target.value])
      }
    } else {
      const index = checkedLetters.indexOf(e.target.value)
      if (index > -1) {
        setCheckedLetters(
          checkedLetters.filter((item) => item !== e.target.value)
        )
      }
    }
  }

  useEffect(() => {
    getTextData(textQueryType, text, setTextData, setError, setTextTime)
  }, [text, textQueryType])

  useEffect(() => {
    getCheckboxesData(
      checkboxesQueryType,
      checkedLetters,
      setCheckboxesData,
      setError,
      setCheckboxesTime
    )
  }, [checkedLetters, checkboxesQueryType])

  if (error.isError) {
    return (
      <div className={styles.generalErrorContainer}>
        <h4>{error.message}</h4>
      </div>
    )
  }

  return (
    <div className={styles.main}>
      <h1 className={styles.title}>Aviation Alphabet Converter</h1>
      <span>{`Cache control: ${
        textData?.cacheControl
          ? textData.cacheControl
          : checkboxesData?.cacheControl
          ? checkboxesData.cacheControl
          : ''
      }`}</span>
      <div className={styles.card}>
        <div className={styles.controls}>
          <div className={styles.cardTop}>
            <fieldset>
              <legend>Select query type</legend>
              <label className={styles.radioLabel}>
                <input
                  type="radio"
                  name="textType"
                  defaultChecked={textQueryType === 'textGood'}
                  value="textGood"
                  onChange={(e) => handleTextType(e)}
                />
                Good
              </label>
              <label className={styles.radioLabel}>
                <input
                  type="radio"
                  name="textType"
                  value="textBad"
                  className={styles.radioInput}
                  onChange={(e) => handleTextType(e)}
                />
                Bad
              </label>
            </fieldset>
            <button onClick={() => setText('')}>Reset</button>
          </div>
          {textData?.errors &&
            textData.errors.map((error: { message: string }, i: number) => {
              return (
                <div className={styles.errorText} key={i}>
                  {error.message}
                </div>
              )
            })}
          <div className={styles.executionDetailsContainer}>
            {textData?.httpMethod && (
              <p
                className={styles.details}
                data-success={textData.httpMethod === 'get' ? 'success' : null}
              >
                {textData.httpMethod.toUpperCase()}
              </p>
            )}
            {textData?.xCache && (
              <p
                className={styles.details}
                data-success={
                  textData.xCache === 'HIT from localhost' ? 'success' : null
                }
              >{`${textData.xCache} | ${textTime} ms`}</p>
            )}
          </div>
        </div>
        <label htmlFor="text">Input letters to convert:</label>
        <input
          className={styles.textInput}
          type="text"
          id="text"
          value={text}
          onChange={(e) => setText(e.target.value || '')}
        />
        <div className={styles.textOutput}>
          {textData?.AviationAlphabetEndpoint?.converter?.output}
        </div>
      </div>
      <div className={styles.card}>
        <div className={styles.controls}>
          <div className={styles.cardTop}>
            <fieldset>
              <legend>Select query type</legend>
              <label className={styles.radioLabel}>
                <input
                  type="radio"
                  name="checkboxesType"
                  value="checkboxesGood"
                  className={styles.radioInput}
                  defaultChecked={checkboxesQueryType === 'checkboxesGood'}
                  onChange={(e) => handleCheckboxesType(e)}
                />
                Good
              </label>
              <label className={styles.radioLabel}>
                <input
                  type="radio"
                  name="checkboxesType"
                  value="checkboxesBad"
                  className={styles.radioInput}
                  onChange={(e) => handleCheckboxesType(e)}
                />
                Bad
              </label>
            </fieldset>
            <button onClick={() => setCheckedLetters([])}>Reset</button>
          </div>
          {checkboxesData?.errors &&
            checkboxesData.errors.map(
              (error: { message: string }, i: number) => {
                return (
                  <div className={styles.errorText} key={i}>
                    {error.message}
                  </div>
                )
              }
            )}
          <div className={styles.executionDetailsContainer}>
            {checkboxesData?.httpMethod && (
              <p
                className={styles.details}
                data-success={
                  checkboxesData.httpMethod === 'get' ? 'success' : null
                }
              >
                {checkboxesData.httpMethod.toUpperCase()}
              </p>
            )}
            {checkboxesData?.xCache && (
              <p
                className={styles.details}
                data-success={
                  checkboxesData.xCache === 'HIT from localhost'
                    ? 'success'
                    : null
                }
              >{`${checkboxesData.xCache} | ${checkboxesTime} ms`}</p>
            )}
          </div>
        </div>
        <div className={styles.checkboxesContainer}>
          <table>
            <tbody>
              <tr>
                <th>Check to convert letter:</th>
                <th className={styles.tableHeadRight}>Converted value:</th>
              </tr>
              {alphabetArray.map((letter: string) => {
                return (
                  <tr key={letter} className={styles.checkboxRow}>
                    <td className={styles.checkboxCell}>
                      <label htmlFor={letter} className={styles.checkboxLabel}>
                        <input
                          type="checkbox"
                          id={letter}
                          value={letter}
                          onChange={(e) => handleCheckboxChange(e)}
                          className={styles.checkboxInput}
                          checked={checkedLetters.includes(letter)}
                        />
                        {letter}
                      </label>
                    </td>
                    <td className={styles.checkboxOutput}>
                      <p>
                        {
                          checkboxesData?.AviationAlphabetEndpoint?.codes[
                            `${letter}`
                          ]
                        }
                      </p>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Home
