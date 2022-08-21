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
  searchResults: string[]
  setSearchResults: Dispatch<SetStateAction<string[]>>
}

const Header = ({ setSearchResults, searchResults }: Props) => {
  const inputRef = useRef<null | HTMLInputElement>(null)
  const [error, setError] = useState({ isError: false, message: '' })
  const [query, setQuery] = useState('')

  useEffect(() => {
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
    function handleClickOutside(e: MouseEvent) {
      if (inputRef.current && !inputRef.current.contains(e.target as Node)) {
        setQuery('')
      }
    }
  }, [setQuery])

  useEffect(() => {
    const timeId = setTimeout(() => {
      setError({ isError: false, message: '' })
      setQuery('')
    }, 3000)
    return () => {
      clearTimeout(timeId)
    }
  }, [error.isError])

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      if (e.key === 'Escape') {
        e.currentTarget.blur()
        setQuery('')
        setSearchResults([])
        if (inputRef?.current?.value) {
          inputRef.current.value = ''
        }
      }
    }
  }

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (inputRef?.current?.value === query && query !== '') {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_HOST}/api/notes/${query}`,
          {
            headers: {
              'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify(query),
          }
        )

        if (!response.ok) {
          setError({
            isError: true,
            message: 'cannot search' + response.statusText,
          })
          throw new Error()
        }

        const data = await response.json()
        if (data.brightspot_example_cma_next_NoteQuery) {
          const array = data.brightspot_example_cma_next_NoteQuery?.items.map(
            (item: {
              text: string
              _id: string
              title: string
              _typename: string
            }) => item._id
          )
          setSearchResults(array)
        }
      }
      if (!inputRef?.current?.value && query === '') {
        setQuery('')
        setSearchResults([])
      }
    }, 500)
    return () => {
      clearTimeout(timer)
    }
  }, [query, inputRef, setSearchResults])

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
              setSearchResults([])
              setQuery('')
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
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onKeyDown}
              />
            </div>
          </form>
        </div>
      </div>
      {query && (
        <span
          className={styles.searchValueText}
        >{`Number of search results for "${query}": `}</span>
      )}
      {query && searchResults && (
        <span className={styles.searchValueText}>{searchResults.length}</span>
      )}
    </header>
  )
}

export default Header
