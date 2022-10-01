import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import Head from 'next/head'

import {
  Query,
  Brightspot_Example_Content_Management_Note,
} from 'generated/graphql'
import { insertItem } from 'helpers/utils'

import Container from '../components/Container'
import Navbar from '../components/Navbar'
import PaginationBar from '../components/PaginationBar'

const Home: NextPage = () => {
  const [items, setItems] = useState<
    Brightspot_Example_Content_Management_Note[]
  >([])
  const [error, setError] = useState<string | null>(null)
  const [numberPages, setNumberPages] = useState(0)
  const [pageNumber, setPageNumber] = useState(1)
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5)
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0)

  const limit = 20 // determines how many notes are shown per paginated page
  const pageNumberList = 5 // determines how many page numbers are shown in pagination bar. If > 5 pages, ellipses will appear in pagination bar

  const dataRequestParams = {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'GET',
  }
  // used to calculate the offset number used when querying for Notes. The search parameter is to flag when searching (Navbar)
  const calculateOffset = (pageNumber: number, search: boolean): number => {
    let offset = 0
    // if searching, the offset remains at 0
    if (!search && pageNumber > 0) {
      const index = pageNumber - 1
      offset = limit * index
    }
    return offset
  }

  const urlBuilder = (
    pageNumber: number,
    predicate: boolean,
    queryItem?: string
  ): string => {
    let url = ''
    if (queryItem) {
      if (predicate) {
        //predicate is used when deleting a note. Therefore the search flag is false
        url = `${
          process.env.NEXT_PUBLIC_HOST
        }/api/notes/?offset=${calculateOffset(
          pageNumber,
          false
        )}&q=${queryItem}&p=true&limit=${limit}`
      } else {
        // if queryItem and no predicate, then using search so search flag is true
        url = `${
          process.env.NEXT_PUBLIC_HOST
        }/api/notes/?offset=${calculateOffset(
          pageNumber,
          true
        )}&q=${queryItem}&limit=${limit}`
      }
    } else if (!queryItem) {
      url = `${
        process.env.NEXT_PUBLIC_HOST
      }/api/notes/?offset=${calculateOffset(pageNumber, false)}&limit=${limit}`
    }
    return url
  }

  const checkPagination = (pageNum: number) => {
    setPageNumber(pageNum)
    if (
      pageNum < maxPageNumberLimit &&
      pageNum > 5 &&
      pageNum % pageNumberList === 0
    ) {
      setMaxPageNumberLimit(maxPageNumberLimit - pageNumberList)
      setMinPageNumberLimit(minPageNumberLimit - pageNumberList)
    }
    if (pageNum > maxPageNumberLimit) {
      setMaxPageNumberLimit(maxPageNumberLimit + pageNumberList)
      setMinPageNumberLimit(minPageNumberLimit + pageNumberList)
    }
    if (pageNum <= 5) {
      setMaxPageNumberLimit(5)
      setMinPageNumberLimit(0)
    }
  }

  const processResponse = (
    res: Query,
    pageNum: number,
    newItem?: Object
  ): void => {
    if (res?.brightspot_example_content_management_NoteQuery?.items) {
      checkPagination(pageNum)
      if (newItem) {
        if (items.length >= limit) {
          // make sure new Note is added as first item for the current view of paginated Notes
          setItems(
            insertItem(
              res?.brightspot_example_content_management_NoteQuery?.items?.slice(
                0,
                -1
              ),
              0,
              newItem
            )
          )
        } else {
          setItems(
            insertItem(
              res?.brightspot_example_content_management_NoteQuery?.items,
              0,
              newItem
            )
          )
        }
      } else {
        setItems(res?.brightspot_example_content_management_NoteQuery?.items)
      }
    }
    if (
      res?.brightspot_example_content_management_NoteQuery?.pageInfo &&
      newItem
    ) {
      const { count } =
        res.brightspot_example_content_management_NoteQuery.pageInfo
      // If new Note, update the numberPages by 1
      setNumberPages(Math.ceil((count + 1) / limit))
    } else if (
      res?.brightspot_example_content_management_NoteQuery?.pageInfo &&
      !newItem
    ) {
      // setNumberPages since number of Notes since Note might have been deleted
      const { count } =
        res.brightspot_example_content_management_NoteQuery.pageInfo
      setNumberPages(Math.ceil(count / limit))
    }
  }

  // used to initially load notes
  useEffect(() => {
    const baseUrl = `${process.env.NEXT_PUBLIC_HOST}/api/notes/?offset=0&limit=${limit}`
    const params = {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'GET',
    }
    fetch(baseUrl, params)
      .then((res) => res.json())
      .then((res) => {
        if (res.brightspot_example_content_management_NoteQuery.items) {
          setItems(res.brightspot_example_content_management_NoteQuery.items)
        }
        if (res?.brightspot_example_content_management_NoteQuery?.pageInfo) {
          const { count } =
            res.brightspot_example_content_management_NoteQuery.pageInfo
          setNumberPages(Math.ceil(count / limit))
        }
      })
      .catch((err: Error) => {
        setError(err.message)
      })
  }, [error])

  //used to get Notes after initial page load
  const getItems = (
    pageNumber: number,
    predicate: boolean,
    queryItem?: string,
    newItem?: Brightspot_Example_Content_Management_Note
  ) => {
    fetch(urlBuilder(pageNumber, predicate, queryItem), dataRequestParams)
      .then((res) => res.json())
      .then((res) => processResponse(res, pageNumber, newItem))
      .catch((error: Error) => setError(error.message))
  }

  return (
    <>
      <Head>
        <title>Notes</title>
        <meta content="Note taking application powered by Brightspot" />
        <link rel="icon" href="https://www.brightspot.com/favicon-32x32.png" />
      </Head>
      <Navbar getItems={getItems} pageNumber={pageNumber} />

      <Container
        items={items}
        getItems={getItems}
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
      />
      <PaginationBar
        getItems={getItems}
        numberPages={numberPages}
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
        maxPageNumberLimit={maxPageNumberLimit}
        minPageNumberLimit={minPageNumberLimit}
      />
      {error && <div id="error">{error}</div>}
    </>
  )
}

export default Home
