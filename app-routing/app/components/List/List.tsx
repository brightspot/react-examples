import styles from "./List.module.css";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

const imageArray = [
  { image: "/balloons.png", alt: "cropped photo by Al Soot on Unsplash" },
  {
    image: "/laugh.jpg",
    alt: "cropped photo by Felicia Buitenwerf on Unsplash",
  },
  { image: "/flowers.png", alt: "cropped photo by Henry Be on Unsplash" },
  { image: "/ocean.png", alt: "cropped photo by Quino Al on Unsplash" },
];

type PagesAndArticles =
  | {
      __typename?: "Page" | undefined;
      name?: string | null | undefined;
      _id?: string | null | undefined;
      Article_page_connection?:
        | {
            __typename?: string | undefined;
            items: {
              __typename?: string | undefined | null;
              headline?: string | undefined | null;
              _id?: string | undefined | null;
            }[];
          }
        | null
        | undefined;
    }
  | undefined;
interface Props {
  pagesAndArticlesArray: PagesAndArticles[] | undefined | null;
}

const List = ({ pagesAndArticlesArray }: Props) => {
  const router = useRouter();
  const fourArticles = pagesAndArticlesArray?.slice(0, 4);
  return (
    <section>
      <div className={styles.listGrid}>
        {fourArticles?.map((article: PagesAndArticles, i: number) => (
          <Link
            key={article?.Article_page_connection?.items[0]._id}
            href={`/${article?.name}/${article?.Article_page_connection?.items[0].headline}?article=${article?.Article_page_connection?.items[0]._id}`}
            as={`/${article?.name}/${article?.Article_page_connection?.items[0].headline}`}
          >
            <a>
              <div className={styles.listItem}>
                <div>
                  <div className={styles.imageContainer}>
                    <Image
                      src={imageArray[i].image}
                      alt={imageArray[i].alt}
                      height={350}
                      width={350}
                      layout="fill"
                    />
                  </div>
                </div>
                <div className={styles.textContainer}>
                  <p className={styles.sectionText}>{article?.name}</p>
                  <h4 className={styles.articleHeadline}>
                    {article?.Article_page_connection?.items[0].headline || ""}
                  </h4>
                </div>
              </div>
            </a>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default List;
