import type { NextPage } from "next";
import { useEffect, useState } from "react";
import Container from "../components/Container";
import { getSession } from 'next-auth/react'
import Header from "../components/Header";
import Head from "next/head";
export interface Data {
  _id: string,
  title: string,
  text: string
}

const Home: NextPage = () => {
  const [items, setItems] = useState<Data[]>([]);
  const [error, setError] = useState({ isError: false, message: "" });
  const [searchResults, setSearchResults] = useState<Array<string>>([])


  useEffect(() => {
    getItems()
  }, []);
 
  function getItems() {
    fetch(`${process.env.NEXT_PUBLIC_HOST}/api/notes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.status >= 400) {
        setError({
          isError: true,
          message: `There was an error fetching the data: ${res.statusText}`,
        });
      }
      res.json().then((res) => {
        setItems(res.brightspot_example_NoteQuery.items);
      });
    });
  }

    const search = (data: Data[] ) => {
      if (data && data.length > 0 && searchResults.length > 0) {
        return data.filter((item: Data) => searchResults.includes(item._id))
      } else {
        return data
      }
    }

  if (error.isError) return <div>{error.message}</div>

  return (
    <>
    <Head>
      <title>Notes</title>
      <meta content="Notes" />
    </Head>
      <Header setSearchResults={setSearchResults} searchResults={searchResults}/>
      <Container search={search} items={items} getItems={getItems} />
    </>
  );
};

export async function getServerSideProps(context: { req: any; }) {
 const session = await getSession({ req: context.req })
 if (!session) {
  return {
    redirect: {
      destination: '/login',
      permanent: false
    }
  }
 }
  return {
    props: { session },
  };
}

export default Home;
