import Devit from 'components/Devit'

export default function DevitPage (props) {
  return (
    <>
      <Devit
        avatar={props.avatar}
        id={props.id}
        content={props.content}
        username={props.username}
        userId={props.userId}
        createdAt={props.createdAt}
        image={props.img}
      />
      <style jsx>{''}</style>
    </>
  )
}

export async function getServerSideProps (context) {
  const { params, res } = context
  const { id } = params

  const apiResponse = await fetch(`http://localhost:3000/api/devits/${id}`)

  if (apiResponse.ok) {
    const props = await apiResponse.json()
    return { props }
  }
  if (res) {
    res.writeHead(301, { Location: '/home' }).end()
  }
}
