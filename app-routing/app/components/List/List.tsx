import styles from "./List.module.css";
import Image from "next/image";
import Link from "next/link";

const imageArray = [
  {image: '/tree.jpg', alt: 'Photo by Matthew Smith on Unsplash'},
  {image: '/laugh.jpg', alt: 'photo by Felicia Buitenwerf on Unsplash'},
  {image: '/flowers.jpg', alt: 'Photo by Henry Be on Unsplash'},
  {image: '/ocean.jpg', alt: 'Photo by Quino Al on Unsplash'}
]

const List = ({ pagesAndArticlesArray }: any) => {

  const fourArticles = pagesAndArticlesArray?.slice(0, 4)
  return (
    <section>
      <div className={styles.listGrid}>
        {fourArticles?.map((article: any, i: number) => (
          <Link href={`/${article.name}/${article.Article_page_connection.items[0]._id}`} key={article.Article_page_connection.items[0]._id}>
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
               <p className={styles.sectionText}>{article.name}</p>
             <h4 className={styles.articleHeadline}>{article?.Article_page_connection.items[0].headline || ''}</h4>
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
