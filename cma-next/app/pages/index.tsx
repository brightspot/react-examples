import type { NextPage } from "next";
import { useEffect, useState } from "react";
import HelloWorldContainer from "../components/HelloWorldContainer";
import { getSession } from 'next-auth/react'
import Header from "../components/Header";

export interface HelloWorldData {
  _id: string,
  title: string,
  text: string
}

const Home: NextPage = () => {
  const [items, setItems] = useState<HelloWorldData[]>([]);
  const [error, setError] = useState({ isError: false, message: "" });
  const [searchResults, setSearchResults] = useState<Array<string>>([])

  useEffect(() => {
    getItems()
  }, []);
 
  function getItems() {
    fetch(`${process.env.NEXT_PUBLIC_HOST}/api/hello`, {
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
        setItems(res.brightspot_example_HelloWorldQuery.items);
      });
    });
  }

    const search = (data: HelloWorldData[] ) => {
      if (data && data.length > 0 && searchResults.length > 0) {
        return data.filter((item: HelloWorldData) => searchResults.includes(item._id))
      } else {
        return data
      }
    }

  if (error.isError) return <div>{error.message}</div>

  return (
    <>
      <Header setSearchResults={setSearchResults} />
      <HelloWorldContainer search={search} items={items} getItems={getItems} />
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
