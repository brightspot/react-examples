import styles from './PaginationBar.module.css'
import { Dispatch, SetStateAction } from 'react'

import { FiChevronRight } from 'react-icons/fi'
import { FiChevronLeft } from 'react-icons/fi'

import { Brightspot_Example_Content_Management_Note } from '../../generated/graphql'

type Props = {
  numberPages: number
  getItems: (
    pageNumber: number,
    predicate: boolean,
    queryItem?: string,
    newItem?: Brightspot_Example_Content_Management_Note
  ) => void
  pageNumber: number
  setPageNumber: Dispatch<SetStateAction<number>>
  maxPageNumberLimit: number
  minPageNumberLimit: number
}

const PaginationBar = ({
  numberPages,
  getItems,
  pageNumber,
  setPageNumber,
  maxPageNumberLimit,
  minPageNumberLimit,
}: Props) => {
  console.log({ numberPages })
  const pages = Array.from(new Array(numberPages), (_, i) => i + 1)
  return (
    <div className={styles.paginationBarContainer}>
      {numberPages > 1 && (
        <ul className={styles.pageNumbers}>
          <li className={styles.pageNumberItem}>
            <button
              className={styles.prevNextBtn}
              disabled={pageNumber === pages[0]}
              onClick={() => getItems(pageNumber - 1, false)}
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
                  tabIndex={0}
                  className={
                    pageNumber === number
                      ? styles.active
                      : styles.pageNumberItem
                  }
                  key={number}
                  onClick={(e) => {
                    setPageNumber(number)
                    getItems(number, false)
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
              onClick={() => getItems(pageNumber + 1, false)}
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
