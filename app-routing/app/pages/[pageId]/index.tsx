import Link from "next/link"
import { useRouter } from "next/router"
import Banner from "../../components/Banner/Banner"
import { useGetPageQuery } from '../../generated/graphql'
import Container from "../../components/Container/Container"
import styles from '../../styles/pages.module.css'

const SectionPage = () => {
    const router = useRouter()
    const id = router.query.pageId
    const pageId = Array.isArray(id) ? id[0] : id
const { data, loading, error } = useGetPageQuery({
    variables: {
        id: pageId
      }
})

if (loading) return <div>Loading...</div>
if (error) console.log(error.message)

    return (
    <>
    <button className={styles.back} onClick={() => router.back()}>
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
    </svg>
    </button>
    <Banner name={data?.Page?.name}/>
    <Container>
    {data?.Page?.Article_page_connection?.items.map((item ) => (
        <Link href={`/${pageId}/${item._id}`} key={item._id}>
        <a>{item.headline}</a>
        </Link>
    ))}
    </Container>
    </>
    )
}

export default SectionPage

