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
import styles from './Navbar.module.css'

type Props = {
  getItems: Function
  numResults: number | null
  setNumResults: Dispatch<SetStateAction<null>>
}

const Navbar = ({ getItems, numResults, setNumResults }: Props) => {
  const inputRef = useRef<null | HTMLInputElement>(null)
  const [error, setError] = useState({ isError: false, message: '' })

  useEffect(() => {
    const timeId = setTimeout(() => {
      setError({ isError: false, message: '' })
    }, 3000)
    return () => {
      clearTimeout(timeId)
    }
  }, [error.isError])

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      if (e.key === 'Escape') {
        e.currentTarget.blur()
        setNumResults(null)
        if (inputRef?.current?.value) {
          inputRef.current.value = ''
        }
      }
    }
  }

  const handleSearch = () => {
    if (!inputRef?.current?.value) {
      getItems()
    }
    const timer = setTimeout(async () => {
      if (inputRef?.current?.value) {
        console.log('you are here!! running use effect')
        getItems(inputRef?.current?.value)
      }
    }, 700)
    return () => {
      clearTimeout(timer)
    }
  }

  if (error.isError) console.error(error.message)
  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <div className={styles.headerLogo}>
          <BsPencilSquare className={styles.pencilIcon} />
          <h2 className={styles.headerLogoTitle}>Notes</h2>
        </div>
        {error.isError && <span className={styles.error}>{error.message}</span>}
        <div className={styles.searchItems}>
          <button
            className={styles.clearButton}
            onClick={() => {
              setNumResults(null)
              if (inputRef?.current?.value) {
                inputRef.current.value = ''
                getItems()
              }
            }}
          >
            <IoClose className={styles.clearIcon} />
          </button>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              inputRef?.current?.blur()
            }}
          >
            <div className={styles.searchContainer}>
              <FiSearch className={styles.searchIcon} />
              <input
                ref={inputRef}
                className={styles.searchInput}
                type="text"
                name="title"
                id="title"
                placeholder="Search"
                onChange={handleSearch}
                onKeyDown={onKeyDown}
              />
            </div>
          </form>
        </div>
      </div>
      {inputRef?.current?.value && (
        <span
          className={styles.searchValueText}
        >{`Number of search results for "${inputRef?.current?.value}": `}</span>
      )}
      {inputRef?.current?.value && numResults && (
        <span className={styles.searchValueText}>{numResults}</span>
      )}
    </header>
  )
}

export default Navbar
