import Link from 'next/link'
import styles from './Navbar.module.css'
import { useState } from 'react'
import { useGetAppQuery } from '../../generated/graphql'
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai'
const Navbar = () => {
  const [isNavExpanded, setIsNavExpanded] = useState(false)
  const { data, error } = useGetAppQuery({
    variables: {
      title: process.env.NEXT_PUBLIC_APP_TITLE,
    },
  })

  if (error) console.log(error.message)

  const pageList = data?.App?.allPages

  function handleNavigation() {
    setTimeout(() => {
      setIsNavExpanded(false)
    }, 100)
  }

  return (
    <nav className={styles.navigation}>
      <h2 className={styles.logo}>
        <Link href='/'>
          <a>News</a>
        </Link>
      </h2>
      <button
        className={styles.hamburger}
        onClick={() => setIsNavExpanded(true)}
      >
        <AiOutlineMenu className={styles.hamburgerIcon} />
      </button>
      <div
        className={
          isNavExpanded ? styles.navigationMenuExpanded : styles.navigationMenu
        }
      >
        <button
          className={isNavExpanded ? styles.close : styles.closeHidden}
          onClick={handleNavigation}
        >
          <AiOutlineClose className={styles.closeIcon} />
        </button>
        <ul>
          {pageList?.map((item, i) => (
            <li key={i} onClick={handleNavigation}>
              <Link
                href={{
                  pathname: `/${item?.name}`,
                }}
              >
                <a className={styles.pageName}>{item?.name}</a>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
