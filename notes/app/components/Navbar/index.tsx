import { FiSearch } from 'react-icons/fi'
import { IoClose } from 'react-icons/io5'
import React, {
  useState,
  useRef,
  Dispatch,
  SetStateAction,
  useEffect,
} from 'react'
import { BsPencilSquare } from 'react-icons/bs'
import { Data } from '../../pages'
import useDebounce from '../../lib/useDebounce'
import styles from './Navbar.module.css'

type Props = {
  getItems: (
    pageNumber: number,
    predicate: boolean,
    queryItem?: string,
    newItem?: Data
  ) => void
  numResults: number | null
  pageNumber: number
  setNumResults: Dispatch<SetStateAction<number | null>>
}

const Navbar = ({ getItems, numResults, setNumResults, pageNumber }: Props) => {
  const inputRef = useRef<null | HTMLInputElement>(null)
  const [error, setError] = useState<string | null>(null)

  const [searchTerm, setSearchTerm] = useState<string>('')
  const debouncedSearchTerm: string = useDebounce<string>(searchTerm, 500)

  useEffect(() => {
    if (debouncedSearchTerm) {
      getItems(1, false, debouncedSearchTerm)
    } else if (!debouncedSearchTerm) {
      getItems(pageNumber, false)
    }
    //TODO: make the dependency array warning go away.....
  }, [debouncedSearchTerm])

  useEffect(() => {
    const timeId = setTimeout(() => {
      setError(null)
    }, 3000)
    return () => {
      clearTimeout(timeId)
    }
  }, [error])

  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <div className={styles.headerLogo}>
          <BsPencilSquare className={styles.pencilIcon} />
          <h2 className={styles.headerLogoTitle}>Notes</h2>
        </div>
        {error && <span className={styles.error}>{error}</span>}
        <div className={styles.searchItems}>
          <button
            className={styles.clearButton}
            onClick={() => {
              setNumResults(null)
              getItems(pageNumber, false)
              setSearchTerm('')
              if (inputRef?.current?.value) {
                inputRef.current.value = ''
              }
            }}
          >
            <IoClose className={styles.clearIcon} />
          </button>
          <div className={styles.searchContainer}>
            <FiSearch className={styles.searchIcon} />
            <input
              ref={inputRef}
              className={styles.searchInput}
              type="text"
              name="search"
              aria-label="Search"
              placeholder="Search"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>
      {searchTerm && (
        <span
          className={styles.searchValueText}
        >{`Number of search results for "${searchTerm}": `}</span>
      )}
      {searchTerm && numResults && (
        <span className={styles.searchValueText}>{numResults}</span>
      )}
    </header>
  )
}

export default Navbar
