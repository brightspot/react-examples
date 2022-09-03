import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { AiOutlineMenu } from 'react-icons/ai'

type Props = {
  pages: [{ title?: string }]
}

const Navbar = ({ pages }: Props) => {
  const [showLinks, setShowLinks] = useState(false)
  const linksContainerRef = useRef<HTMLDivElement>(null)
  const linksRef = useRef<HTMLUListElement>(null)
  const toggleLinks = () => {
    setShowLinks(!showLinks)
  }

  useEffect(() => {
    const linksHeight = linksRef?.current?.getBoundingClientRect()?.height
    if (showLinks && linksContainerRef?.current && linksHeight) {
      linksContainerRef.current.style.height = `${linksHeight + 20}px`
    } else if (linksContainerRef?.current) {
      linksContainerRef.current.style.height = '0px'
    }
  }, [showLinks])

  return (
    <nav>
      <div className="nav-center">
        <div className="nav-header">
          <h2 className="logo">Pages</h2>
          <button className="nav-toggle" onClick={toggleLinks}>
            <AiOutlineMenu />
          </button>
        </div>
        <div className="links-container" ref={linksContainerRef}>
          <ul className="links" ref={linksRef}>
            {pages?.map((page, i: number) => {
              return (
                <li key={i}>
                  <Link
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
