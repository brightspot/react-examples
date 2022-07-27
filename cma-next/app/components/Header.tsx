import { FiSearch } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import React, {
  useState,
  useRef,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";
import { IoEarth } from "react-icons/io5";
import { CgLogOut } from "react-icons/cg";
import { signOut, useSession } from "next-auth/react";

import styles from "../styles/Header.module.css";

type HeaderProps = {
  setSearchResults: Dispatch<SetStateAction<string[]>>;
};

const Header: React.FC<HeaderProps> = ({ setSearchResults }) => {
  const SEARCH_VALUE = "search-value";
  const USER = 'hw-user';
  const [isSSR, setIsSSR] = useState(true);
  const { data: session } = useSession();
  const inputRef = useRef<null | HTMLInputElement>(null);
  const [error, setError] = useState({ isError: false, message: "" });
  const [query, setQuery] = useState("");

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
    function handleClickOutside(e: MouseEvent) {
      if (inputRef.current && !inputRef.current.contains(e.target as Node)) {
        setQuery("");
      }
    }
  }, [setQuery]);

  useEffect(() => {
    setIsSSR(false)
  }, [])

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      if (e.key === "Escape") {
        e.currentTarget.blur();
        setQuery("");
      }
    }
  };

  const handleSearch = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/api/search/${query}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status >= 400) {
      setError({
        isError: true,
        message: `${response.status} - ${response.statusText}`,
      });
    }
    const result = await response.json();
    const array = result?.brightspot_example_HelloWorldQuery?.items.map(
      (item: { text: string; _id: string; title: string; _typename: string }) =>
        item._id
    );
    setSearchResults(array);
    setQuery("");
  };

  const logoutHandler = () => {
    signOut();
    sessionStorage.removeItem('hw-user')
  };

  if (error.isError) console.error(error.message);

  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <div className={styles.headerLogo}>
          <IoEarth className={styles.earthIcon} />
          <h2 className={styles.headerLogoTitle}>Hello World</h2>
          {session && (
            <button className={styles.logoutButton} onClick={logoutHandler}>
              <CgLogOut className={styles.logoutIcon} />
            </button>
          )}
        </div>
        <div className={styles.searchItems}>
          <button
            className={styles.clearButton}
            onClick={() => {
              setSearchResults([]);
              setQuery("");
              sessionStorage.removeItem(SEARCH_VALUE)
            }}
          >
            <IoClose className={styles.clearIcon} />
          </button>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              sessionStorage.setItem(SEARCH_VALUE, query)
              handleSearch();
              inputRef?.current?.blur();
            }}
          >
            <div className={styles.searchContainer}>
              <FiSearch className={styles.searchIcon} />
              <input
                ref={inputRef}
                className={styles.searchInput}
                type="text"
                name="title"
                id="title"
                placeholder="Search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onKeyDown}
              />
            </div>
          </form>
          {!isSSR && sessionStorage.getItem(USER) && 
          <div className={styles.user}>
            <span>{sessionStorage.getItem('hw-user')?.charAt(0)}</span>
            </div>
            }
        </div>
      </div>
      {!isSSR && sessionStorage.getItem(SEARCH_VALUE) && 
      <span className={styles.searchValueText}>{`search results for "${sessionStorage.getItem(SEARCH_VALUE)}"`}</span>
      }
    </header>
  );
};

export default Header;
