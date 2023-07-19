import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AiOutlineMenu } from 'react-icons/ai'
import { BiChevronDown } from 'react-icons/bi'

type Props = {
  courses: [
    {
      title?: string
      slug?: string
    }
  ]
}

export function Navbar({ courses }: Props) {
  const [showLinks, setShowLinks] = useState(false)
  const toggleLinks = () => {
    setShowLinks(!showLinks)
  }

  return (
    <nav>
      <div className="nav-center">
        <div className="nav-header">
          <Link to="/" onClick={() => setShowLinks(false)}>
            <h3 className="logo">Learning Fun</h3>
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
            {courses?.map((course, i: number) => (
              <li key={i} data-show={showLinks || null}>
                <Link
                  onClick={() => setShowLinks(false)}
                  to={`/courses/${course.slug}`}
                  className="link-item"
                  data-show={showLinks || null}
                >
                  <p className="link-text">{course?.title}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  )
}
