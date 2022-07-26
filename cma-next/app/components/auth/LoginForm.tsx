import styles from "../../styles/LoginForm.module.css";
import { useRef, useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";

const LoginForm = () => {
  const [error, setError] = useState({ isError: false, message: "" });
  const userNameRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    const timeId = setTimeout(() => {
        setError({isError: false, message: ""})
    }, 3000)
    return () => {
        clearTimeout(timeId)
    }
}, [error])

  const submitLoginForm = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const enteredUserName = userNameRef?.current?.value;
    const result = await signIn("credentials", {
      redirect: false,
      username: enteredUserName,
    });
    if (result?.status === 401) {
      setError({isError: true, message: 'Invalid Username'})
    } else if (result?.error) {
      setError({ isError: true, message: 'An error occurred.'})
    } else if (!result?.error) {
      localStorage.setItem('hw-user', enteredUserName!)
      router.replace("/");
    }
  };


  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div className={styles.loginCard}>
          <div className={styles.loginHead}>
            <h2>Hello World Login</h2>
            <p>New User? Signup in Brightspot</p>
            {error && 
            <span className={styles.errorMessage}>{error.message}</span>
            }
          </div>
          <form className={styles.loginForm} onSubmit={submitLoginForm}>
            <input
              className={styles.loginFormInput}
              ref={userNameRef}
              id="login-username"
              type="text"
              name="username"
              placeholder="User Name"
              required
            />
            <input
              className={styles.loginSubmitButton}
              type="submit"
              value="Sign In"
            />
          </form>
        </div>
      </main>
    </div>
  );
};

export default LoginForm;
