import { Link } from 'react-router-dom'
import { useState } from 'react'
import { AiOutlineMenu } from 'react-icons/ai'
import { BiChevronDown } from 'react-icons/bi'
import { useGetAllSectionsQuery } from '../generated'

const Navbar = () => {
  const [showLinks, setShowLinks] = useState(false)
  const toggleLinks = () => {
    setShowLinks(!showLinks)
  }
  const { data, error } = useGetAllSectionsQuery()

  const sectionsList = data?.Sections?.sections

  if (error) console.log(error.message)
  return (
    <nav>
      <div className="nav-center">
        <div className="nav-header">
          <Link to="/" onClick={() => setShowLinks(false)}>
            <h2 className="logo">News</h2>
          </Link>

          <button className="nav-toggle" onClick={toggleLinks}>
            <AiOutlineMenu
              className="menu-icon"
              data-reverse={showLinks || null}
            />
            <div className="course-label">
              <BiChevronDown
                className="down-chevron"
                data-reverse={showLinks || null}
              />
              <p>Courses</p>
            </div>
          </button>
        </div>
        <div className="links-container" data-show={showLinks || null}>
          <ul className="links" data-show={showLinks || null}>
            {sectionsList?.map((section, i: number) => (
              <li key={i} data-show={showLinks || null}>
                <Link
                  onClick={() => setShowLinks(false)}
                  to={`/${section?.id}`}
                  className="link-item"
                  data-show={showLinks || null}
                >
                  <p className="link-text">{section?.name}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
