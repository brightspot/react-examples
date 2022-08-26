import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import Container from '../components/Container'
import Navbar from '../components/Navbar'
import Head from 'next/head'
import PaginationBar from '../components/PaginationBar'

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
  brightspot_example_notes_NoteQuery: {
    items?: Data[]
    pageInfo?: PageInfo
  }
}

const Home: NextPage = () => {
  const [items, setItems] = useState<Data[]>([])
  const [error, setError] = useState<string | null>(null)
  const [numberPages, setNumberPages] = useState(0)
  const [numResults, setNumResults] = useState<number | null>(null)
  const [limit, setLimit] = useState<number | null>(null)

  useEffect(() => {
    const baseUrl = `${process.env.NEXT_PUBLIC_HOST}/api/notes/?offset=0`
    fetch(baseUrl, dataRequestParams())
      .then((res) => res.json())
      .then((res) => processResponse(res))
      .catch((error) => handleError(error))
  }, [])

  function calculateOffset(pageNumber: number): number {
    let updatedPageNumber = 0
    if (limit) {
      const index = pageNumber - 1
      updatedPageNumber = limit * index
    }
    return updatedPageNumber
  }

  function urlBuilder(pageNumber: number, queryItem?: string): string {
    let url = ''
    if (queryItem) {
      url = `${
        process.env.NEXT_PUBLIC_HOST
      }/api/notes/?offset=${calculateOffset(pageNumber)}&q=${queryItem}`
    } else if (!queryItem) {
      url = `${
        process.env.NEXT_PUBLIC_HOST
      }/api/notes/?offset=${calculateOffset(pageNumber)}`
    }
    return url
  }

  const dataRequestParams = () => {
    return {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'GET',
    }
  }

  const processResponse = (res: QueryResponse): void => {
    if (res.error) {
      setError(res.error)
    }
    if (res?.brightspot_example_notes_NoteQuery?.items) {
      setItems(res.brightspot_example_notes_NoteQuery.items)
    }
    if (res?.brightspot_example_notes_NoteQuery?.pageInfo) {
      const { count, limit } = res.brightspot_example_notes_NoteQuery.pageInfo
      setNumberPages(Math.ceil(count / limit))
      setNumResults(count)
      setLimit(limit)
    }
  }

  const handleError = (error: string) => {
    setError('an unexpected error occurred')
  }

  function getItems(queryItem: string = '', pageNumber: number = 0) {
    fetch(urlBuilder(pageNumber, queryItem), dataRequestParams())
      .then((res) => res.json())
      .then((res) => processResponse(res))
      .catch((error) => handleError(error))
  }

  return (
    <>
      <Head>
        <title>Notes</title>
        <meta content="Note taking application powered by Brightspot" />
      </Head>
      <Navbar
        getItems={getItems}
        numResults={numResults}
        setNumResults={setNumResults}
      />

      <Container items={items} setItems={setItems} />
      <PaginationBar getItems={getItems} numberPages={numberPages} />
      {error && <div id="error">{error}</div>}
    </>
  )
}

export default Home
