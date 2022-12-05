import Head from 'next/head'
import Link from 'next/link'
import AppLayout from '../components/AppLoyaout'

export default function Home() {
  return (
    <>
      <Head>
        <title>Devter3🐦</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <AppLayout>
        <h1>
          <a href='https://nextjs.org'>devter</a>
        </h1>
        <nav>
          <Link href='/timeline'>
            timeline
          </Link>
        </nav>
      </AppLayout>

      {/* <style jsx>{`
        h1 {
          text-align: center;
          font-size: 48px;
        }
        nav {
          font-size: 24px;
          text-align: center;
        }
        .another-title {
          color: #333;
          font-size: 24px;
        }
        a {
          color: orange;
          text-decoration: none;
        }
      `}</style> */}
    </>
  )
}
