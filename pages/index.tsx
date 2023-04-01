import Link from 'next/link'

const Home: React.FC = () => {
  return (
    <div>
      <h1>ホームページ</h1>
      <nav>
        <Link href="/about">
          <a>自己紹介ページ</a>
        </Link>
        <Link href="/blog">
          <a>ブログ一覧ページ</a>
        </Link>
      </nav>
    </div>
  )
}

export default Home
