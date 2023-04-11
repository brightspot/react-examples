import type { NextPage } from 'next'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

interface Data {
  FunFact: {
    text: string
  }
}

const FunFact: NextPage = () => {
  const router = useRouter()
  const paths = router.query.path as string[]
  const fullPath = paths ? paths.join('/') : ''

  const [data, setData] = useState<Data | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState({ isError: false, message: '' })

  useEffect(() => {
    if (!fullPath) {
      return
    }

    fetch(`/api/getFunFactByPath?path=${fullPath}`)
      .then((res) => {
        if (res.status >= 400) {
          setError({
            isError: true,
            message: `${res.status} - ${res.statusText}`,
          })
        }
        return res.json()
      })
      .then((res) => {
        setData(res)
        setLoading(false)
      })
  }, [fullPath])

  if (loading) return <div>Loading</div>
  if (error.isError) {
    return (
      <pre>
        <code>{JSON.stringify(error.message)}</code>
      </pre>
    )
  }

  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <h1 className={styles.title}>Fun Fact</h1>
        <Link href={'/'}>
          <div className={styles.card}>
            <h2 className={styles.title}>Did You Know...?</h2>
            <p className={styles.description}>{data?.FunFact?.text}</p>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default FunFact
