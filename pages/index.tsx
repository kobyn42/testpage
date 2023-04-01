import Link from 'next/link'

const Home: React.FC = () => {
  return (
    <div>
      <h1>ホームページ</h1>
      <nav>
        <Link href="/about">
          自己紹介ページ
        </Link>
        <Link href="/blog">
          ブログ一覧ページ
        </Link>
      </nav>
    </div>
  )
}

export default Home
