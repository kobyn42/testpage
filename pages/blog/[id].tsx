import { GetStaticPaths, GetStaticProps } from 'next'
import { getPostData, getSortedPostsData } from '../../libs/posts'
import { Text, VStack } from '@chakra-ui/react'

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
            <VStack>
                <h1>{postData.title}</h1>
                <Text border={'2px'} borderColor={'gray.400'} rounded={'2xl'} padding={'10'} margin={'10'} maxWidth={'800'}>
                    <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
                </Text>
                <small>{postData.date}</small>
            </VStack>
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
