import { useEffect, useState } from 'react'
import { colors } from '../styles/themes'
import AppLayout from '../components/AppLoyaout'
import Button from '../components/Button'
import GitHub from '../components/Icons/github'
import Head from 'next/head'

import { loginWithGithub, whenAuthChanged } from '../firebase/client'

export default function Home () {
  const [user, setUser] = useState(undefined)

  useEffect(() => {
    whenAuthChanged(setUser)
  }, [])

  const handleGithubLogin = () => {
    loginWithGithub()
      .then(setUser)
      .catch(err => console.error(err))
  }

  return (
    <>
      <Head>
        <title>Devter🐦</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <AppLayout>
        <section>
          <img src='/dev-logo.png' alt='logo' />
          <h1>Devter</h1>
          <h2>
            Talk about development <br /> with developers 👧👦
          </h2>
          <div>
            {/* FIXME: The login butoon hide when the user logout */}
            {user === null && (
              <Button onClick={handleGithubLogin}>
                <GitHub width={20} height={20} fill='#fff' />
                Login with Github
              </Button>
            )}
            {user && user.avatar && (
              <div>
                <img src={user.avatar} alt={user.username} />
                <strong>@{user.username}</strong>
                <span>{user.fullname}</span>
              </div>
            )}
          </div>
        </section>
      </AppLayout>

      <style jsx>{`
        img {
          width: 120px;
        }

        section {
          display: grid;
          height: 100%;
          place-content: center;
          place-items: center;
        }

        div {
          margin-top: 16px;
        }

        h1 {
          color: ${colors.primary};
          font-weight: 800;
          margin-bottom: 16px;
        }

        h2 {
          color: ${colors.secondary};
          font-size: 21px;
          margin: 0;
        }
      `}</style>
    </>
  )
}
