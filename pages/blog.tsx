import Link from 'next/link'
import { Heading } from '@chakra-ui/react';
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
            <Heading color={'red'}>ブログ一覧ページ</Heading>
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
                ホームページへ戻る
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
