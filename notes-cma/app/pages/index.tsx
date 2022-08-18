import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import Container from '../components/Container/Container'
import { getSession } from 'next-auth/react'
import Navbar from '../components/Navbar/Navbar'
import Head from 'next/head'
export interface Data {
  title: string
  text: string
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
  const [searchResults, setSearchResults] = useState<Array<string>>([])

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
  }, [])

  async function getItems() {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_HOST}/api/notes`,
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
        setItems(data.brightspot_example_cma_next_NoteQuery?.items)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const search = (data: Data[]) => {
    if (data && data.length > 0 && searchResults && searchResults.length > 0) {
      return data.filter((item: Data) => searchResults.includes(item._id))
    } else {
      return data
    }
  }

  return (
    <>
      <Head>
        <title>Notes</title>
        <meta content="Note taking application powered by Brightspot" />
      </Head>
      <h1>hello</h1>
      {/* <Navbar
        setSearchResults={setSearchResults}
        searchResults={searchResults}
      />

      <Container search={search} items={items} setItems={setItems} />
  {error.isError && <div id="error">{error.message}</div>} */}
    </>
  )
}

// export async function getServerSideProps(context: { req: any }) {
//   const session = await getSession({ req: context.req })
//   if (!session) {
//     return {
//       redirect: {
//         destination: '/login',
//         permanent: false,
//       },
//     }
//   }
//   return {
//     props: { session },
//   }
// }

export default Home
