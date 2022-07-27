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
  searchResults: string[],
  setSearchResults: Dispatch<SetStateAction<string[]>>;
};

const Header: React.FC<HeaderProps> = ({ setSearchResults, searchResults }) => {
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
        setSearchResults([])
        if (inputRef?.current?.value) {
          inputRef.current.value= ""
        }
      }
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if(inputRef?.current?.value === query && query!=='') {
        fetch(
          `${process.env.NEXT_PUBLIC_HOST}/api/search/${query}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        ).then((response) => {
          if (response.status >= 400) {
            setError({
              isError: true,
              message: `${response.status} - ${response.statusText}`,
            });
          }
           return response.json();
        }).then((data) => {
          const array = data.brightspot_example_HelloWorldQuery?.items.map(
            (item: { text: string; _id: string; title: string; _typename: string }) =>
              item._id
          );
          setSearchResults(array);
        })
      }
    }, 500)
      return () => {
        clearTimeout(timer)
      }
  }, [query, inputRef, setSearchResults]);

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
            }}
          >
            <IoClose className={styles.clearIcon} />
          </button>
          <form
            onSubmit={(e) => {
              e.preventDefault();
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
      {query && (
      <span className={styles.searchValueText}>{`Number of search results for "${query}": `}</span>
      )}
    {query && searchResults &&  (
      <span className={styles.searchValueText}>{searchResults.length}</span>
      )}
    </header>
  );
};

export default Header;
