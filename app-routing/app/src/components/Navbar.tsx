import { Link } from 'react-router-dom'
import { useState } from 'react'
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai'
import { useGetAllSectionsQuery } from '../generated'

const Navbar = () => {
  const [isNavExpanded, setIsNavExpanded] = useState(false)
  const { data, error } = useGetAllSectionsQuery()

  if (error) console.log(error.message)

  const sectionsList = data?.Sections?.sections

  function handleNavigation() {
    setTimeout(() => {
      setIsNavExpanded(false)
    }, 100)
  }

  return (
    <nav>
      <h2 className="nav-logo">
        <Link to="/">News</Link>
      </h2>
      <button className="nav-menuButton" onClick={() => setIsNavExpanded(true)}>
        <AiOutlineMenu className="nav-menuIcon" />
      </button>
      <div className={isNavExpanded ? 'nav-menuExpanded' : 'nav-menu'}>
        <button
          className={isNavExpanded ? 'nav-close' : 'nav-closeHidden'}
          onClick={handleNavigation}
        >
          <AiOutlineClose className="nav-closeIcon" />
        </button>
        <ul>
          {sectionsList?.map((item, i) => (
            <li key={i} onClick={handleNavigation}>
              <Link to={`/${item?.id}`} className="nav-pageName">
                {item?.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
