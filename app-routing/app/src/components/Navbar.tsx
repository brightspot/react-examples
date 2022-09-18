import { Link } from 'react-router-dom'
import { useState, useContext } from 'react'
import { useGetAllSectionsQuery } from '../generated'
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai'
import { RoutingContext } from './RoutingContext'

const Navbar = () => {
  const context = useContext(RoutingContext)
  const [isNavExpanded, setIsNavExpanded] = useState(false)
  const { data, error } = useGetAllSectionsQuery()

  if (error) console.log(error.message)

  const sectionsList = data?.Sections?.sections

  function handleNavigation() {
    setTimeout(() => {
      setIsNavExpanded(false)
    }, 100)
  }

  const linkPath = (id: string, slug: string) => {
    if (context?.routingOption === 1) {
      return `${id}`
    } else if (context?.routingOption === 2) {
      return `section/${slug}`
    }
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
              <Link
                to={`/${linkPath(item?.id || '', item?.slug || '')}`}
                className="nav-pageName"
              >
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
