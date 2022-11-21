import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'
interface Props {
  children: any
}

export default function ClientOnly({ children, ...delegated }: Props) {
  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => {
    setHasMounted(true)
  }, [])

  if (!hasMounted) {
    return null
  }

  return <div {...delegated}>{children}</div>
}
