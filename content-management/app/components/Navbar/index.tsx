import styles from './Navbar.module.css'
import React, { useState, useRef, useEffect } from 'react'

import { FiSearch } from 'react-icons/fi'
import { IoClose } from 'react-icons/io5'
import { BsPencilSquare } from 'react-icons/bs'

import { Brightspot_Example_Content_Management_Note } from '../../generated/graphql'

type Props = {
  getItems: (
    pageNumber: number,
    predicate: boolean,
    queryItem?: string,
    newItem?: Brightspot_Example_Content_Management_Note
  ) => void
  pageNumber: number
}

const Navbar = ({ getItems, pageNumber }: Props) => {
  const inputRef = useRef<null | HTMLInputElement>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const timeId = setTimeout(() => {
      setError(null)
    }, 3000)
    return () => {
      clearTimeout(timeId)
    }
  }, [error])

  const handleSearch = (value: string) => {
    getItems(pageNumber, false, value)
  }

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
              getItems(pageNumber, false)
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
              onChange={(e) => {
                handleSearch(e.target.value)
              }}
            />
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar
