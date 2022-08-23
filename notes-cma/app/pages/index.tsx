import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import Container from '../components/Container'
import Navbar from '../components/Navbar'
import Head from 'next/head'
import PaginationBar from '../components/PaginationBar'

export interface Data {
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

const Home: NextPage = () => {
  const [items, setItems] = useState<Data[]>([])
  const [error, setError] = useState({ isError: false, message: '' })
  const [numberPages, setNumberPages] = useState(0)
  const [pageNumber, setPageNumber] = useState(1)
  const [numResults, setNumResults] = useState(null)
  const [limit, setLimit] = useState(null)

  useEffect(() => {
    const timeId = setTimeout(() => {
      setError({ isError: false, message: '' })
    }, 3000)
    return () => {
      clearTimeout(timeId)
    }
  }, [error.isError])

  useEffect(() => {
    getItems()
  }, [pageNumber])

  function getPageNumber(pageNumber: number): number {
    let updatedPageNumber = 0
    if (limit) {
      const index = pageNumber - 1
      updatedPageNumber = limit * index
    } else {
      console.log('no limit was provided')
    }
    return updatedPageNumber
  }

  function urlBuilder(queryItem: string): string {
    let url = ''
    if (queryItem) {
      console.log('querItem in urlBuilder: ', queryItem)
      url = `${process.env.NEXT_PUBLIC_HOST}/api/notes/?page=${getPageNumber(
        pageNumber
      )}&q=${queryItem}`
    } else if (!queryItem) {
      url = `${process.env.NEXT_PUBLIC_HOST}/api/notes/?page=${getPageNumber(
        pageNumber
      )}`
    }
    return url
  }

  async function getItems(queryItem: string = '') {
    try {
      const response = await fetch(urlBuilder(queryItem), {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'GET',
      })
      if (!response.ok) {
        setError({
          isError: true,
          message: `There was an error fetching the data: ${response.statusText}`,
        })
        throw new Error()
      }
      const data = await response.json()
      if (data?.brightspot_example_cma_next_NoteQuery) {
        setItems(data?.brightspot_example_cma_next_NoteQuery?.items)
      }

      if (data?.brightspot_example_cma_next_NoteQuery?.pageInfo) {
        const { count, limit } =
          data?.brightspot_example_cma_next_NoteQuery?.pageInfo
        setNumberPages(Math.ceil(count / limit))
        setNumResults(count)
        setLimit(limit)
      }
    } catch (error) {
      console.log(error)
    }
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
      <PaginationBar
        numberPages={numberPages}
        setPageNumber={setPageNumber}
        pageNumber={pageNumber}
      />
      {error.isError && <div id="error">{error.message}</div>}
    </>
  )
}

export default Home
