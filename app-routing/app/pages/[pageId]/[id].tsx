import { useRouter } from "next/router";
import { useGetArticleQuery } from "../../generated/graphql";
import Container from "../../components/Container/Container";
import styles from "../../styles/pages.module.css";

const ArticlePage = () => {
  const router = useRouter();
  const id = router.query.id;
  const articleId = Array.isArray(id) ? id[0] : id;
  const { data, error } = useGetArticleQuery({
    variables: {
      id: articleId,
    },
  });

  if (error) console.log(error.message);
  return (
    <>
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
      <Container>
        <h1>{data?.Article?.headline}</h1>
        <p>{data?.Article?.body}</p>
      </Container>
    </>
  );
};

export default ArticlePage;
