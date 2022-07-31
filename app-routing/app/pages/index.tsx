import type { NextPage } from "next";
import { useGetFirstArticlesQuery } from "../generated/graphql";
import Head from "next/head";
import Container from "../components/Container/Container";
import List from "../components/List/List";
import Banner from "../components/Banner/Banner";

const Home: NextPage = () => {
  // query that gets one article from each page
  const { data, error } = useGetFirstArticlesQuery({
    variables: {
      path: "/news",
    },
  });

  if (error) console.log(error.message);
  if (!data?.App) console.log("no data...");

  const pagesAndArticlesArray = data?.App?.Page_app_connection?.items;

  return (
    <>
      <Head>
        <title>News</title>
      </Head>
      <Banner name="Home" />
      <Container>
        <List pagesAndArticlesArray={pagesAndArticlesArray} />
      </Container>
    </>
  );
};

export default Home;
