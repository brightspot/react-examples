import { useEffect, useState } from 'react'

interface Props {
  children: any
}

export default function ClientOnly({ children, ...delegated }: Props) {
  const [hasMounted, setHasMounted] = useState(false)
  console.log('welcome to the client side, hasmounted: ', hasMounted)
  useEffect(() => {
    setHasMounted(true)
  }, [])

  if (!hasMounted) {
    return null
  }

  return <div {...delegated}>{children}</div>
}
