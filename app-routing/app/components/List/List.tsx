import styles from "./List.module.css";
import Image from "next/image";

//TODO: Make a map and slice top 4 articles
const List = () => {
  return (
    <section>
      <div className={styles.listGrid}>
        <a href='/'>
        <div className={styles.listItem}>
          <div>
            <div className={styles.imageContainer}>
                <Image
                  src="/laugh.jpg"
                  alt="photo by Felicia Buitenwerf on Unsplash"
                  height={200}
                  width={200}
                />
            </div>
          </div>
          <div className={styles.textContainer}>
            <p className={styles.sectionText}>Section</p>
          <h4 className={styles.articleHeadline}>Article Headline This could be long...</h4>
          </div>
        </div>
        </a>
        <a href='/'>
        <div className={styles.listItem}>
          <div>
            <div className={styles.imageContainer}>
                <Image
                  src="/laugh.jpg"
                  alt="photo by Felicia Buitenwerf on Unsplash"
                  height={200}
                  width={200}
                />
            </div>
          </div>
          <div className={styles.textContainer}>
            <p className={styles.sectionText}>Section</p>
          <h4 className={styles.articleHeadline}>Article Headline This could be long...</h4>
          </div>
        </div>
        </a>
        <a href='/'>
        <div className={styles.listItem}>
          <div>
            <div className={styles.imageContainer}>
                <Image
                  src="/laugh.jpg"
                  alt="photo by Felicia Buitenwerf on Unsplash"
                  height={200}
                  width={200}
                />
            </div>
          </div>
          <div className={styles.textContainer}>
            <p className={styles.sectionText}>Section</p>
          <h4 className={styles.articleHeadline}>Article Headline This could be long...</h4>
          </div>
        </div>
        </a>
        <a href='/'>
        <div className={styles.listItem}>
          <div>
            <div className={styles.imageContainer}>
                <Image
                  src="/laugh.jpg"
                  alt="photo by Felicia Buitenwerf on Unsplash"
                  height={200}
                  width={200}
                />
            </div>
          </div>
          <div className={styles.textContainer}>
            <p className={styles.sectionText}>Section</p>
          <h4 className={styles.articleHeadline}>Article Headline This could be long...</h4>
          </div>
        </div>
        </a>
      </div>
    </section>
  );
};

export default List;
