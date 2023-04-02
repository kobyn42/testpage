import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import rehypeHighlight from 'rehype-highlight';
import remarkHtml from 'remark-html'
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import ReactMarkdown from 'react-markdown';

const postsDirectory = path.join(process.cwd(), 'posts')

interface Post {
  id: string
  date: string
  title: string
  [key: string]: any
}

export const getSortedPostsData = () => {
  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData: Post[] = fileNames.map(fileName => {
    const id = fileName.replace(/\.md$/, '')

    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const matterResult = matter(fileContents)

    return {
      id,
      ...matterResult.data
    } as Post
  })

  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })
}

export async function getPostData(id: string) {
  const fullPath = path.join(postsDirectory, `${id}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')

  const matterResult = matter(fileContents)

  const processor = unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeHighlight)
    .use(rehypeStringify)
  const processedContent = await processor.process(matterResult.content)
  const contentHtml = processedContent.toString()
  const markdown = matterResult.content

  return {
    id,
    markdown,
    ...matterResult.data
  }
}

export function getAllTags(): string[] {
  const allPostsData = getSortedPostsData()
  const tags = new Set<string>()

  allPostsData.forEach(postData => {
    if (Array.isArray(postData.tags)) {
      postData.tags.forEach(tag => tags.add(tag))
    }
  })

  return Array.from(tags)
}

export function getPostsByTag(tag: string): any {
  const allPostsData = getSortedPostsData()

  return allPostsData.filter(postData => {
    return Array.isArray(postData.tags) && postData.tags.includes(tag)
  })
}
