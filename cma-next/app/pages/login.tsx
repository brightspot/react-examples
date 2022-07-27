import LoginForm from "../components/auth/LoginForm";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getSession } from "next-auth/react";
import Head from "next/head";

const LoginPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSession().then((session) => {
      if (session) {
        router.replace("/");
      } else {
        setLoading(false);
      }
    });
  }, [router]);

  if (loading) return <div>Loading..</div>;
  return (
    <>
      <Head>
        <title>Hello World Login</title>
        <meta content="Hello World Login" />
        <link rel="apple-touch-icon" sizes="180x180" href="favicon_io/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="favicon_io/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="favicon_io/favicon-16x16.png" />
        <link rel="manifest" href="favicon_io/site.webmanifest"></link>
      </Head>
      <LoginForm />
    </>
  );
};

export default LoginPage;
