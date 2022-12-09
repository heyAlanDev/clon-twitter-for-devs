import Avatar from 'components/Avatar'
import useTimeAgo, { getDateTimeFormat } from 'hooks/useTimeAgo'

export default function Devit ({
  avatar,
  username,
  content,
  createdAt,
  image,
  id
}) {
  const timeago = useTimeAgo(createdAt)
  const createdAtFormated = getDateTimeFormat(createdAt, {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
  })

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
            {/* FIXME: fix the timeago title */}
            <time title={createdAtFormated}>{timeago}</time>
          </header>
          <p>{content}</p>
          {image && <img src={image} />}
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

        img {
          border-radius: 10px;
          height: auto;
          margin-top: 10px;
          width: 100%;
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
