import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import Head from 'next/head'

import {
  Query,
  Brightspot_Example_Content_Management_Note,
} from '../generated/graphql'
import { insertItem } from '../lib/utils'
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
  const [limit, setLimit] = useState<number | null>(null)
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5)
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0)
  const pageNumberList = 5
  const dataRequestParams = {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'GET',
  }

  const calculateOffset = (pageNumber: number): number => {
    let offset = 0
    if (limit && pageNumber > 0) {
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
        url = `${
          process.env.NEXT_PUBLIC_HOST
        }/api/notes/?offset=${calculateOffset(
          pageNumber
        )}&q=${queryItem}&p=true`
      } else {
        url = `${
          process.env.NEXT_PUBLIC_HOST
        }/api/notes/?offset=${calculateOffset(pageNumber)}&q=${queryItem}`
      }
    } else if (!queryItem) {
      url = `${
        process.env.NEXT_PUBLIC_HOST
      }/api/notes/?offset=${calculateOffset(pageNumber)}`
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
        if (limit && items.length >= limit) {
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
      const { count, limit } =
        res.brightspot_example_content_management_NoteQuery.pageInfo
      if (limit) {
        setNumberPages(Math.ceil((count + 1) / limit))
        setLimit(limit)
      }
    } else if (
      res?.brightspot_example_content_management_NoteQuery?.pageInfo &&
      !newItem
    ) {
      const { count, limit } =
        res.brightspot_example_content_management_NoteQuery.pageInfo
      if (limit) {
        setNumberPages(Math.ceil(count / limit))
        setLimit(limit)
      }
    }
  }

  // used to intially load notes for first paginated section
  useEffect(() => {
    const baseUrl = `${process.env.NEXT_PUBLIC_HOST}/api/notes/?offset=0`
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
          const { count, limit } =
            res.brightspot_example_content_management_NoteQuery.pageInfo
          setNumberPages(Math.ceil(count / limit))
          setLimit(limit)
        }
      })
      .catch((err: Error) => {
        if (!error) {
          setError(err.message)
        }
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
