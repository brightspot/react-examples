import { useState } from 'react'
import styles from './PaginationBar.module.css'
import { FiChevronRight } from 'react-icons/fi'
import { FiChevronLeft } from 'react-icons/fi'

type Props = {
  numberPages: number
  getItems: (queryItem?: string, pageNumber?: number) => void
}

const PaginationBar = ({ numberPages, getItems }: Props) => {
  const pages = Array.from(new Array(numberPages), (_, i) => i + 1)
  const [pageNumber, setPageNumber] = useState(1)
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5)
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0)
  const pageNumberList = 5

  const handleNextBtn = (num: number) => {
    setPageNumber(num)
    if (num > maxPageNumberLimit) {
      setMaxPageNumberLimit(maxPageNumberLimit + pageNumberList)
      setMinPageNumberLimit(minPageNumberLimit + pageNumberList)
    }
    getItems('', num)
  }

  const handlePrevBtn = (num: number) => {
    setPageNumber(num)
    if (num % pageNumberList === 0) {
      setMaxPageNumberLimit(maxPageNumberLimit - pageNumberList)
      setMinPageNumberLimit(minPageNumberLimit - pageNumberList)
    }
    getItems('', num)
  }

  return (
    <div className={styles.paginationBarContainer}>
      {numberPages > 1 && (
        <ul className={styles.pageNumbers}>
          <li className={styles.pageNumberItem}>
            <button
              className={styles.prevNextBtn}
              disabled={pageNumber === pages[0]}
              onClick={() => {
                console.log('current page number: ', pageNumber)
                handlePrevBtn(pageNumber - 1)
              }}
            >
              <FiChevronLeft />
            </button>
          </li>
          {minPageNumberLimit >= 1 && (
            <li className={styles.ellipses}> &#8230;</li>
          )}
          {pages.map((number) => {
            if (
              number < maxPageNumberLimit + 1 &&
              number > minPageNumberLimit
            ) {
              return (
                <li
                  className={
                    pageNumber === number
                      ? styles.active
                      : styles.pageNumberItem
                  }
                  key={number}
                  onClick={(e) => {
                    setPageNumber(number)
                    getItems('', number)
                  }}
                >
                  {number}
                </li>
              )
            } else {
              return null
            }
          })}
          {pages.length > maxPageNumberLimit && (
            <li className={styles.ellipses}> &#8230;</li>
          )}
          <li className={styles.pageNumberItem}>
            <button
              className={styles.prevNextBtn}
              onClick={() => handleNextBtn(pageNumber + 1)}
              disabled={pageNumber === pages[pages.length - 1]}
            >
              <FiChevronRight />
            </button>
          </li>
        </ul>
      )}
    </div>
  )
}

export default PaginationBar
