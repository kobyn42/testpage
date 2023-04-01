import { GetStaticPaths, GetStaticProps } from 'next'
import { getPostData, getSortedPostsData } from '../../libs/posts'

interface PostData {
    title: string
    date: string
    contentHtml: string
}

interface PostProps {
    postData: PostData
}

const Post: React.FC<PostProps> = ({ postData }) => {
    return (
        <div>
            <h1>{postData.title}</h1>
            <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
            <small>{postData.date}</small>
        </div>
    )
}

export const getStaticPaths: GetStaticPaths = async () => {
    const paths = getSortedPostsData().map((post) => ({
        params: { id: post.id },
    }))
    return {
        paths,
        fallback: false,
    }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const postData = await getPostData(params.id as string)
    return {
        props: {
            postData,
        },
    }
}

export default Post
