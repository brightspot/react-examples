import Link from "next/link";
import styles from "./Navbar.module.css";
import { useState } from "react";
import { useGetAppQuery } from "../../generated/graphql";

const Navbar = () => {
  const [isNavExpanded, setIsNavExpanded] = useState(false);
  const { data, error } = useGetAppQuery({
    variables: {
      path: "/news",
    },
  });

  if (error) console.log(error.message);

  const pageList = data?.App?.Page_app_connection?.items;

  function handleNavigation() {
    setTimeout(() => {
      setIsNavExpanded(false);
    }, 100);
  }

  return (
    <nav className={styles.navigation}>
      <h2 className={styles.logo}>
        <Link href="/">
          <a>News</a>
        </Link>
      </h2>
      <button
        className={styles.hamburger}
        onClick={() => setIsNavExpanded(true)}
      >
        {/* icon from heroicons.com*/}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
            clipRule="evenodd"
          />
        </svg>
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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <ul>
          {pageList?.map((item) => (
            <li key={item._id} onClick={handleNavigation}>
              <Link href={`/${item.name}?id=${item._id}`} as={`/${item.name}`}>
                <a>{item.name}</a>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
