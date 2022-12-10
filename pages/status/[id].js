import Devit from 'components/Devit'
import { firestore } from 'my-firebase/admin'

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

export async function getStaticPaths () {
  return {
    paths: [{ params: { id: '2v6O59t32Pr9Kxt1cykC' } }],
    fallback: true
  }
}

export async function getStaticProps (context) {
  const { params } = context
  const { id } = params

  try {
    const doc = await firestore.collection('Devits').doc(id).get()
    const docExist = doc.exists
    if (!docExist) return { props: {} }

    const data = doc.data()
    const idDoc = doc.id
    const { createdAt } = data

    const props = {
      ...data,
      id: idDoc,
      createdAt: +createdAt.toDate()
    }
    return { props }
  } catch (e) {
    return { props: {} }
  }
}
