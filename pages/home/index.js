import { useEffect, useState } from 'react'

import AppLayout from 'components/AppLayout'
import Devit from 'components/Devit'

export default function HomePage () {
  const [timeline, setTimeline] = useState([])

  useEffect(() => {
    fetch('/api/statuses/home_timeline')
      .then(res => res.json())
      .then(setTimeline)
      .catch(err => console.error(err))
  }, [])

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
              message={devit.message}
              username={devit.username}
            />
          ))}
        </section>
        <nav></nav>
      </AppLayout>

      <style jsx>{`
        header {
          align-items: center;
          border-bottom: 1px solid #ccc;
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

        section {
          padding-top: 49px;
        }

        nav {
          border-top: 1px solid #ccc;
          bottom: 0;
          height: 49px;
          position: sticky;
          width: 100%;
        }
      `}</style>
    </>
  )
}
