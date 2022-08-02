import LoginForm from "../components/auth/LoginForm";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import Head from "next/head";

const LoginPage = () => {
  const router = useRouter();
  const { data: session } = useSession()
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session) {
      router.replace("/");
    } else {
      setLoading(false)
    }
  }, [router, session]);

  if (loading) return <div>Loading..</div>;
  return (
    <>
      <Head>
        <title>Notes Login</title>
        <meta content="Hello World Login" />
      </Head>
      <LoginForm />
    </>
  );
};

export default LoginPage;
