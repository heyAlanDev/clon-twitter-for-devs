import Link from 'next/link'

export function getStaticProps() {
  return fetch('http://localhost:3000/api/hello ')
    .then(res => res.json())
    .then(response => {
      const { username } = response
      return { props: { username } }
    })
}

export default function Timeline({ username }) {
  return (
    <>
      <h1>This the timeline of {username}</h1>
      <Link href='/'>Go home</Link>
      <style jsx>{`
        h1 {
          font-size: 36px;
          color: red;
        }
      `}</style>
    </>
  )
}
