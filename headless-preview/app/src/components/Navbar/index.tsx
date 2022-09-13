import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AiOutlineMenu } from 'react-icons/ai'
import { BiChevronDown } from 'react-icons/bi'

type Props = {
  courses: [{ title?: string, path?: string }]
}

export function Navbar({ courses }: Props) {
  const [showLinks, setShowLinks] = useState(false)
  const toggleLinks = () => {
    setShowLinks(!showLinks)
  }
console.log({courses})
  return (
    <nav>
      <div className="nav-center">
        <div className="nav-header">
          <Link to="/" onClick={() => setShowLinks(false)}>
            <span className="logo">Learning Fun</span>
          </Link>

          <button className="nav-toggle" onClick={toggleLinks}>
            <AiOutlineMenu
              className="menu-icon"
              data-reverse={showLinks || null}
            />
            <span className="course-label">
              <BiChevronDown
                className="down-chevron"
                data-reverse={showLinks || null}
              />
              <p>Courses</p>
            </span>
          </button>
        </div>
        <div className="links-container" data-show={showLinks || null}>
          <ul className="links" data-show={showLinks || null}>
            {courses?.map((course, i: number) => {
              return (
                <li key={i} data-show={showLinks || null}>
                  <Link
                    onClick={() => setShowLinks(false)}
                    to={`${course.path}`}
                    className="link-item"
                    data-show={showLinks || null}
                  >
                    <span className="link-text">
                      {course?.title?.toLowerCase()}
                    </span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </nav>
  )
}
