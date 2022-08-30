import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import Container from '../components/Container'
import Navbar from '../components/Navbar'
import Head from 'next/head'
import PaginationBar from '../components/PaginationBar'
import { insertItem } from '../lib/utils'

export type Data = {
  title: string
  description: string
  _id: string
  _globals: {
    com_psddev_cms_db_Content_ObjectModification: {
      publishDate: number
      publishUser: {
        username: string
      }
      updateDate: number
      updateUser: {
        username: string
      }
    }
  }
}

type PageInfo = {
  count: number
  limit: number
}

type QueryResponse = {
  error?: string
  brightspot_example_notes_NoteQuery?: {
    items?: Data[]
    pageInfo?: PageInfo
  }
}

const Home: NextPage = () => {
  const [items, setItems] = useState<Data[]>([])
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
    res: QueryResponse,
    pageNum: number,
    newItem?: Data
  ): void => {
    if (res.error) {
      setError(res.error)
    }
    if (res?.brightspot_example_notes_NoteQuery?.items) {
      checkPagination(pageNum)
      if (newItem) {
        if (limit && items.length >= limit) {
          setItems(
            insertItem(
              res?.brightspot_example_notes_NoteQuery?.items.slice(0, -1),
              0,
              newItem
            )
          )
        } else {
          setItems(
            insertItem(
              res?.brightspot_example_notes_NoteQuery?.items,
              0,
              newItem
            )
          )
        }
      } else {
        setItems(res.brightspot_example_notes_NoteQuery.items)
      }
    }
    if (res?.brightspot_example_notes_NoteQuery?.pageInfo && newItem) {
      // TODO: find out why there is a need to add 1 for adding a new item but not deleting
      const { count, limit } = res.brightspot_example_notes_NoteQuery.pageInfo
      setNumberPages(Math.ceil((count + 1) / limit))
      setLimit(limit)
    } else if (res?.brightspot_example_notes_NoteQuery?.pageInfo && !newItem) {
      const { count, limit } = res.brightspot_example_notes_NoteQuery.pageInfo
      setNumberPages(Math.ceil(count / limit))
      setLimit(limit)
    }
  }

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
        if (res.error) {
          setError(res.error)
        }
        if (res.brightspot_example_notes_NoteQuery.items) {
          setItems(res.brightspot_example_notes_NoteQuery.items)
        }
        if (res?.brightspot_example_notes_NoteQuery?.pageInfo) {
          const { count, limit } =
            res.brightspot_example_notes_NoteQuery.pageInfo
          setNumberPages(Math.ceil(count / limit))
          setLimit(limit)
        }
      })
      .catch((error: Error) => setError(error.message))
  }, [])

  function getItems(
    pageNumber: number,
    predicate: boolean,
    queryItem?: string,
    newItem?: Data
  ) {
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
