import { useState } from 'react'

import { useRouter } from 'next/router'

import AppLayout from 'components/AppLayout'
import Button from 'components/Button'

import useUser from 'hooks/useUser'

import { addDevit } from 'my-firebase/client'
import Head from 'next/head'

const COMPOSE_STATES = {
  USER_NOT_KNOWN: 0,
  LOADING: 1,
  SUCCESS: 2,
  ERROR: -1
}

export default function ComposeTweet () {
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState(COMPOSE_STATES.USER_NOT_KNOWN)
  const user = useUser()
  const router = useRouter()

  const handleSubmit = e => {
    e.preventDefault()
    setStatus(COMPOSE_STATES.LOADING)
    addDevit({
      avatar: user.avatar,
      content: message,
      userId: user.uid,
      username: user.username
    })
      .then(() => {
        router.push('/home')
      })
      .catch(err => {
        console.error(err)
        setStatus(COMPOSE_STATES.ERROR)
      })
    setMessage('')
  }

  const handleChange = e => {
    setMessage(e.target.value)
  }

  const isButtonDisabled = !message.length || status === COMPOSE_STATES.LOADING

  return (
    <>
      <AppLayout>
        <Head>
          <title>Devitear / Devter</title>
        </Head>
        <form onSubmit={handleSubmit}>
          <textarea
            placeholder='¿Que esta pasando?'
            value={message}
            onChange={handleChange}
          ></textarea>
          <div>
            <Button disable={isButtonDisabled}>Devitear</Button>
          </div>
        </form>
      </AppLayout>
      <style jsx>{`
        div {
          padding: 15px;
        }

        textarea {
          border: 0;
          padding: 15px;
          min-height: 200px;
          outline: 0;
          resize: none;
          font-size: 21px;
          width: 100%;
        }
      `}</style>
    </>
  )
}
