import { GetStaticPaths, GetStaticProps } from 'next'
import { getPostData, getSortedPostsData } from '../../libs/posts'
import { Text, VStack, Box, Heading, UnorderedList, ListItem, ListIcon } from '@chakra-ui/react'
import { ReactMarkdown } from 'react-markdown/lib/react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { CheckCircleIcon } from '@chakra-ui/icons';


interface PostData {
    title: string
    date: string
    markdown: string
}

interface PostProps {
    postData: PostData
}

const Post: React.FC<PostProps> = ({ postData }) => {
    return (
        <div>
            <VStack>
                <h1>{postData.title}</h1>
                <Box border={'2px'} borderColor={'gray.400'} rounded={'2xl'} padding={'10'} margin={'10'} maxWidth={'800'}>
                    <ReactMarkdown
                        children={postData.markdown}
                        components={{
                            code: ({ node, inline, className, children, ...props }) => {
                                const match = /language-(\w+)/.exec(className || '');
                                return !inline && match ? (
                                    <SyntaxHighlighter
                                        children={String(children).replace(/\n$/, '')}
                                        language={match[1]}
                                        style={atomDark}
                                        PreTag="div"
                                        {...props}
                                    />
                                ) : (
                                    <code className={className} {...props}>
                                        {children}
                                    </code>
                                );
                            },
                            h2: ({ node, children, ...props }) => (
                                <Heading as="h2" size="md" mt="4" mb="2" {...props}>
                                    {children}
                                </Heading>
                            ),
                            ul: ({ children }) => (
                                <UnorderedList>{children}</UnorderedList>
                            ),
                            li: ({ children }) => (
                                <ListItem>
                                    {children}
                                </ListItem>
                            )
                        }}
                    />
                </Box>
                {/* </Text> */}
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
