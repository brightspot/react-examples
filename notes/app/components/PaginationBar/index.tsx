import { Dispatch, SetStateAction, useState } from 'react'
import styles from './PaginationBar.module.css'
import { FiChevronRight } from 'react-icons/fi'
import { FiChevronLeft } from 'react-icons/fi'

type Props = {
  numberPages: number
  pageNumber: number
  setPageNumber: Dispatch<SetStateAction<number>>
}

const PaginationBar = ({ numberPages, pageNumber, setPageNumber }: Props) => {
  const pages = Array.from(new Array(numberPages), (x, i) => i + 1)

  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5)
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0)
  const pageNumberList = 5

  const handleNextBtn = () => {
    setPageNumber(pageNumber + 1)
    if (pageNumber + 1 > maxPageNumberLimit) {
      setMaxPageNumberLimit(maxPageNumberLimit + pageNumberList)
      setMinPageNumberLimit(minPageNumberLimit + pageNumberList)
    }
  }

  const handlePrevBtn = () => {
    setPageNumber(pageNumber - 1)
    if ((pageNumber - 1) % pageNumberList === 0) {
      setMaxPageNumberLimit(maxPageNumberLimit - pageNumberList)
      setMinPageNumberLimit(minPageNumberLimit - pageNumberList)
    }
  }
  return (
    <div className={styles.paginationBarContainer}>
      {numberPages > 1 && (
        <ul className={styles.pageNumbers}>
          <li className={styles.pageNumberItem}>
            <button
              className={styles.prevNextBtn}
              disabled={pageNumber === pages[0]}
              onClick={handlePrevBtn}
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
              onClick={handleNextBtn}
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
