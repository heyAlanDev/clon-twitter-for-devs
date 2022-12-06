import { useEffect } from 'react'

import useUser, { USER_STATES } from 'hooks/useUser'

import AppLayout from 'components/AppLayout'
import Button from 'components/Button'
import GitHub from 'components/Icons/github'
import Loading from 'components/Loading'

import { useRouter } from 'next/router'
import Head from 'next/head'

import { colors } from 'styles/themes'

import { loginWithGithub } from 'my-firebase/client'

export default function Home () {
  const user = useUser()
  const router = useRouter()

  useEffect(() => {
    user && router.replace('/home')
  }, [user])

  const handleGithubLogin = () => {
    loginWithGithub()
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
            {user === USER_STATES.NOT_LOGGED && (
              <Button onClick={handleGithubLogin}>
                <GitHub width={20} height={20} fill='#fff' />
                Login with Github
              </Button>
            )}
            {user === USER_STATES.NOT_KNOWN && <Loading size={45} />}
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
