import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AiOutlineMenu } from 'react-icons/ai'
import { GiTwirlyFlower } from 'react-icons/gi'

type Props = {
  pages: [{ title?: string }]
}

const Navbar = ({ pages }: Props) => {
  const [showLinks, setShowLinks] = useState(false)
  const toggleLinks = () => {
    setShowLinks(!showLinks)
  }

  return (
    <nav>
      <div className="nav-center">
        <div className="nav-header">
          <Link to="/" onClick={() => setShowLinks(false)}>
            {' '}
            <GiTwirlyFlower className="logo-icon" />
            <span className="logo">Pages</span>
          </Link>

          <button className="nav-toggle" onClick={toggleLinks}>
            <AiOutlineMenu />
          </button>
        </div>
        <div className="links-container" data-show={showLinks || null}>
          <ul className="links">
            {pages?.map((page, i: number) => {
              return (
                <li key={i}>
                  <Link
                    onClick={() => setShowLinks(false)}
                    to={`/${page?.title?.toLowerCase()}`}
                    className="navigationItem"
                  >
                    {page?.title?.toLowerCase()}
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

export default Navbar
