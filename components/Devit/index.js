import Avatar from 'components/Avatar'

export default function Devit ({ avatar, username, content, createdAt, id }) {
  return (
    <>
      <article>
        <div>
          <Avatar alt={username} src={avatar} />
        </div>
        <section>
          <header>
            <strong>@{username}</strong>
            <span>·</span>
            <time>{createdAt}</time>
          </header>
          <p>{content}</p>
        </section>
      </article>
      <style jsx>{`
        article {
          border-bottom: 1px solid #eee;
          display: flex;
          padding: 10px 15px;
        }

        div {
          padding-right: 10px;
        }

        p {
          line-height: 1.3125;
          margin: 0;
        }

        span {
          margin: 0 5px;
        }

        time {
          color: #555;
          font-size: 14px;
        }

      `}</style>
    </>
  )
}
