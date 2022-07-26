import LoginForm from "../components/auth/LoginForm";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSession } from 'next-auth/react';

const LoginPage = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    getSession().then((session) => {
      if (session) {
        router.replace('/')
      } else {
        setLoading(false)
      }
    })
  },[router])

  if (loading) return <div>Loading..</div>
  return (
    <>
     <LoginForm />
    </>
  );
  
}


export default LoginPage
