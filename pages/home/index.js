import { useEffect, useState } from 'react'

import AppLayout from 'components/AppLayout'
import Devit from 'components/Devit'
import useUser from 'hooks/useUser'
import { fetchLatestDevits } from 'my-firebase/client'

export default function HomePage () {
  const [timeline, setTimeline] = useState([])
  const user = useUser()

  useEffect(() => {
    user &&
      fetchLatestDevits().then(setTimeline)
  }, [user])

  return (
    <>
      <AppLayout>
        <header>
          <h2>Inicio</h2>
        </header>
        <section>
          {timeline.map(devit => (
            <Devit
              key={devit.id}
              avatar={devit.avatar}
              id={devit.id}
              content={devit.content}
              username={devit.username}
              userId={user.userId}
              createdAt={devit.createdAt}
            />
          ))}
        </section>
        <nav></nav>
      </AppLayout>

      <style jsx>{`
        header {
          align-items: center;
          background: #ffffffbb;
          backdrop-filter: blur(5px);
          border-bottom: 1px solid #eee;
          display: flex;
          height: 49px;
          top: 0;
          position: sticky;
          width: 100%;
        }

        h2 {
          font-size: 21px;
          font-weight: 799;
        }

        nav {
          background: #fff;
          border-top: 1px solid #eee;
          bottom: 0;
          height: 49px;
          position: sticky;
          width: 100%;
        }
      `}</style>
    </>
  )
}
