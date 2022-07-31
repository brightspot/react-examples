import Link from "next/link";
import { useRouter } from "next/router";
import Banner from "../../components/Banner/Banner";
import { useGetPageQuery } from "../../generated/graphql";
import Container from "../../components/Container/Container";
import styles from "../../styles/pages.module.css";
import Head from "next/head";

const SectionPage = () => {
  const router = useRouter();
  const queryId = Array.isArray(router.query.id) ? router.query.id[0] : router.query.id;
  const { data, error } = useGetPageQuery({
    variables: {
      id: queryId,
    },
  });

  if (error) console.log(error.message);
  return (
    <>
    <Head>
    <title>News | {data?.Page?.name}</title>
    </Head>
      <button className={styles.back} onClick={() => router.back()}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
          />
        </svg>
      </button>
      <Banner name={data?.Page?.name} />
      <Container>
        {data?.Page?.Article_page_connection?.items.map((item) => {
          return (
            <Link href={`/${data.Page?.name}/${item.headline}?article=${item._id}`} as={`/${data.Page?.name}/${item.headline}`} key={item._id}>
              <a>{item.headline}</a>
            </Link>
          );
        })}
      </Container>
    </>
  );
};

export default SectionPage;
