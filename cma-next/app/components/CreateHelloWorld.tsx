import { useState, useEffect, useRef } from "react";
import styles from "../styles/CreateHelloWorld.module.css";

type CreateHelloWorldProps = {
  getItems: Function;
};

const CreateHelloWorld: React.FC<CreateHelloWorldProps> = ({ getItems }) => {
  const USER = "hw-user";
  const [isSSR, setIsSSR] = useState(true);
  const [error, setError] = useState({ isError: false, message: "" });
  const titleRef = useRef<HTMLInputElement>(null);
  const textRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setIsSSR(false);
  }, []);

  const submitNewHelloWorld = async () => {
    const text = textRef?.current?.value;
    const title = titleRef?.current?.value;
    const userName = sessionStorage.getItem(USER);

    const newHelloWorldValues = {
      text,
      title,
      userName,
    };
    await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/newHello`, {
      method: "POST",
      body: JSON.stringify(newHelloWorldValues),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.status >= 400) {
        setError({
          isError: true,
          message: `${res.status} - ${res.statusText}`,
        });
      }
      res.json().then(() => {
        if (titleRef?.current?.value && textRef?.current?.value) {
          titleRef.current.value = "";
          textRef.current.value = "";
        }
        getItems();
      });
    });
  };

  if (error.isError) return <div>{error.message}</div>;

  return (
    <form
      className={styles.createHelloWorldForm}
      onSubmit={(e) => {
        e.preventDefault();
        submitNewHelloWorld();
      }}
    >
      <div className={styles.createHelloWorldWrapper}>
        <label>
          <p>Title</p>
          <input
            className={styles.createHelloWorldInput}
            ref={titleRef}
            type="text"
            placeholder=""
            required
          />
        </label>
        <label>
          <p>Text</p>
          <input
            className={styles.createHelloWorldInput}
            ref={textRef}
            type="text"
            placeholder=""
            required
          />
        </label>
      </div>
      <button className={styles.submitButton} type="submit">
        Submit
      </button>
    </form>
  );
};

export default CreateHelloWorld;
