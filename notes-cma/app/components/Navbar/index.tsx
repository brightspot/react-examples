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
import { Data } from '../../pages'

type Props = {
  setNumberPages: Dispatch<SetStateAction<number>>
  setItems: Dispatch<SetStateAction<Data[]>>
  getItems: Function
}

const Navbar = ({ setNumberPages, setItems, getItems }: Props) => {
  const inputRef = useRef<null | HTMLInputElement>(null)
  const [error, setError] = useState({ isError: false, message: '' })
  const [queryItem, setQueryItem] = useState('')
  const [numResults, setNumResults] = useState(null)

  // useEffect(() => {
  //   document.addEventListener('click', handleClickOutside)
  //   return () => document.removeEventListener('click', handleClickOutside)
  //   function handleClickOutside(e: MouseEvent) {
  //     if (inputRef.current && !inputRef.current.contains(e.target as Node)) {
  //       setQueryItem('')
  //     }
  //   }
  // }, [setQueryItem])

  useEffect(() => {
    const timeId = setTimeout(() => {
      setError({ isError: false, message: '' })
      setQueryItem('')
    }, 3000)
    return () => {
      clearTimeout(timeId)
    }
  }, [error.isError])

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      if (e.key === 'Escape') {
        e.currentTarget.blur()
        setQueryItem('')
        setNumResults(null)
        if (inputRef?.current?.value) {
          inputRef.current.value = ''
        }
      }
    }
  }

  useEffect(() => {
    if (!inputRef?.current?.value) {
      getItems()
    }
    const timer = setTimeout(async () => {
      if (inputRef?.current?.value && queryItem !== '') {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_HOST}/api/notes/${queryItem}`,
          {
            headers: {
              'Content-Type': 'application/json',
            },
            method: 'POST',
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
        if (data?.brightspot_example_cma_next_NoteQuery) {
          setItems(data.brightspot_example_cma_next_NoteQuery?.items)
          sessionStorage.setItem('query', queryItem)
        }
        if (data?.brightspot_example_cma_next_NoteQuery?.pageInfo) {
          const { count, limit } =
            data?.brightspot_example_cma_next_NoteQuery?.pageInfo
          setNumberPages(Math.ceil(count / limit))
          setNumResults(
            data?.brightspot_example_cma_next_NoteQuery?.pageInfo?.count
          )
        }
      }
      if (!inputRef?.current?.value && queryItem === '') {
        setQueryItem('')
      }
    }, 500)
    return () => {
      clearTimeout(timer)
    }
  }, [queryItem, setItems, setNumberPages])

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
              setQueryItem('')
              getItems()
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
                value={queryItem}
                onChange={(e) => {
                  setQueryItem(e.target.value)
                }}
                onKeyDown={onKeyDown}
              />
            </div>
          </form>
        </div>
      </div>
      {queryItem && (
        <span
          className={styles.searchValueText}
        >{`Number of search results for "${queryItem}": `}</span>
      )}
      {queryItem && numResults && (
        <span className={styles.searchValueText}>{numResults}</span>
      )}
    </header>
  )
}

export default Navbar
