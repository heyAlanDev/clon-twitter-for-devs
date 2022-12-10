import { useEffect, useState } from 'react'

import { useRouter } from 'next/router'
import Head from 'next/head'

import Button from 'components/Button'
import Avatar from 'components/Avatar'

import useUser from 'hooks/useUser'

import { addDevit } from 'my-firebase/client'
import { uploadImage } from '../../../firebase/client'
import { getDownloadURL } from 'firebase/storage'

const COMPOSE_STATES = {
  USER_NOT_KNOWN: 0,
  LOADING: 1,
  SUCCESS: 2,
  ERROR: -1
}

const DRAG_IMAGE_STATES = {
  ERROR: -1,
  NONE: 0,
  DRAG_OVER: 1,
  UPLOADING: 2,
  COMPLETE: 3
}

export default function ComposeTweet () {
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState(COMPOSE_STATES.USER_NOT_KNOWN)

  const [drag, setDrag] = useState(DRAG_IMAGE_STATES.NONE)
  const [task, setTask] = useState(null)
  const [imgURL, setImgURL] = useState(null)

  const user = useUser()
  const router = useRouter()

  useEffect(() => {
    if (task) {
      const onProgress = () => {}
      const onError = () => {}
      const onComplete = () => {
        getDownloadURL(task.snapshot.ref).then(setImgURL)
      }

      task.on('state_changed', onProgress, onError, onComplete)
    }
  }, [task])

  const handleSubmit = e => {
    e.preventDefault()
    setStatus(COMPOSE_STATES.LOADING)
    addDevit({
      avatar: user.avatar,
      content: message,
      userId: user.uid,
      username: user.username,
      img: imgURL
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

  const handleDragEnter = e => {
    e.preventDefault()
    setDrag(DRAG_IMAGE_STATES.DRAG_OVER)
  }

  const handleDragLeave = e => {
    e.preventDefault()
    setDrag(DRAG_IMAGE_STATES.NONE)
  }

  const handleDrop = e => {
    e.preventDefault()
    setDrag(DRAG_IMAGE_STATES.NONE)
    const file = e.dataTransfer.files[0]

    const task = uploadImage(file)
    setTask(task)
  }

  const isButtonDisabled = !message.length || status === COMPOSE_STATES.LOADING

  return (
    <>
        <Head>
          <title>Devitear / Devter</title>
        </Head>
        <section className='form-container'>
          {user && (
            <section className='avatar-container'>
              <Avatar src={user.avatar} />
            </section>
          )}
          <form onSubmit={handleSubmit}>
            <textarea
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              placeholder='¿Que esta pasando?'
              value={message}
              onChange={handleChange}
            ></textarea>
            {imgURL && (
              <section className='remove-img'>
                <button onClick={() => setImgURL(null)}>x</button>
                <img src={imgURL} />
              </section>
            )}
            <div>
              <Button disable={isButtonDisabled}>Devitear</Button>
            </div>
          </form>
        </section>

      <style jsx>{`
        div {
          padding: 15px;
        }

        .form-container {
          display: flex;
          align-items: flex-start;
        }

        .avatar-container {
          margin-top: 10px;
          margin-left: 10px;
        }

        form {
          padding: 10px;
        }

        .remove-img {
          position: relative;
        }

        button {
          background: rgba(0, 0, 0, 0.3);
          border: 0;
          border-radius: 999px;
          color: #fff;
          font-size: 24px;
          width: 36px;
          height: 36px;
          position: absolute;
          top: 15px;
          right: 15px;
        }

        img {
          height: auto;
          width: 100%;
        }

        textarea {
          border: ${drag === DRAG_IMAGE_STATES.DRAG_OVER
            ? '3px dashed #09f'
            : '3px solid transparent'};
          border-radius: 10px;
          min-height: 200px;
          outline: 0;
          resize: none;
          font-size: 21px;
          min-width: 100%;
        }
      `}</style>
    </>
  )
}
