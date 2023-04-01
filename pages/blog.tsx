import Link from 'next/link'
import { GetStaticProps } from 'next'
import { getSortedPostsData } from '../libs/posts'

interface Post {
    id: string
    date: string
    title: string
    tags: string[]
}

interface BlogProps {
    allPostsData: Post[]
}

const Blog: React.FC<BlogProps> = ({ allPostsData }) => {
    return (
        <div>
            <h1>ブログ一覧ページ</h1>
            <ul>
                {allPostsData.map(({ id, date, title, tags }) => (
                    <li key={id}>
                        <Link href={`/blog/${id}`}>
                            {title}
                        </Link>
                        <br />
                        <small>{date}</small>
                        <br />
                        {Array.isArray(tags) && (
                            <ul>
                                {tags.map(tag => (

                                    <li key={tag}>
                                        <Link href={`/tags/${tag}`}>
                                            {tag}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </li>
                ))}
            </ul>
            <Link href="/">
                <a>ホームページへ戻る</a>
            </Link>
        </div>
    )
}

export const getStaticProps: GetStaticProps = async () => {
    const allPostsData = getSortedPostsData()
    return {
        props: {
            allPostsData
        }
    }
}

export default Blog
