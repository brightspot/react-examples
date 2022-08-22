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

  async function getItems() {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_HOST}/api/notes/?pagenumber=${
          pageNumber - 1
        }`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'GET',
        }
      )
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
        setNumberPages={setNumberPages}
        setItems={setItems}
        getItems={getItems}
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
