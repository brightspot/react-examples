import styles from "./List.module.css";
import Image from "next/image";

const List = () => {
  return (
    <section>
      <div className={styles.listGrid}>
        <div className={styles.listItem}>
          <div>
            <div>
              <a href="">
                <Image
                  src="/laugh.jpg"
                  alt="photo by Felicia Buitenwerf on Unsplash"
                  height={150}
                  width={150}
                />
              </a>
            </div>
          </div>
          <h4>Section</h4>
          <h3>Article Headline</h3>
        </div>
        <div className={styles.listItem}>
          <div>
            <div>
              <a href="">
                <Image
                  src="/laugh.jpg"
                  alt="photo by Felicia Buitenwerf on Unsplash"
                  height={150}
                  width={150}
                />
              </a>
            </div>
          </div>
          <h4>Section</h4>
          <h3>Article Headline</h3>
        </div>
        <div className={styles.listItem}>
          <div>
            <div>
              <a href="">
                <Image
                  src="/laugh.jpg"
                  alt="photo by Felicia Buitenwerf on Unsplash"
                  height={150}
                  width={150}
                />
              </a>
            </div>
          </div>
          <h4>Section</h4>
          <h3>Article Headline</h3>
        </div>
        <div className={styles.listItem}>
          <div>
            <div>
              <a href="">
                <Image
                  src="/laugh.jpg"
                  alt="photo by Felicia Buitenwerf on Unsplash"
                  height={150}
                  width={150}
                />
              </a>
            </div>
          </div>
          <h4>Section</h4>
          <h3>Article Headline</h3>
        </div>
      </div>
    </section>
  );
};

export default List;
