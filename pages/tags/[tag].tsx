import { GetStaticPaths, GetStaticProps } from 'next'
import Link from 'next/link'
import Layout from '../../components/Layout'
import { getAllTags, getPostsByTag } from '../../libs/posts'
// import { PostData } from '../../types/post'

type Props = {
    tag: string
    posts: any //PostData[]
}

export default function TagPage({ tag, posts }: Props) {
    return (
        <Layout>
            <h1>{tag}</h1>
            <ul>
                {posts.map(({ id, date, title }) => (
                    <li key={id}>
                        <Link href={`/blog/${id}`}>
                            <a>{title}</a>
                        </Link>
                        <br />
                        <small>{date}</small>
                    </li>
                ))}
            </ul>
        </Layout>
    )
}

export const getStaticPaths: GetStaticPaths = async () => {
    const tags = getAllTags()
    const paths = tags.map(tag => ({
        params: { tag }
    }))

    return {
        paths,
        fallback: false
    }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const tag = params?.tag as string
    const posts = getPostsByTag(tag)
    return {
        props: {
            tag,
            posts
        }
    }
}
