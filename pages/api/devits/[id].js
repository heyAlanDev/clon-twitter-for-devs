import { firestore } from 'my-firebase/admin'

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
  const { query } = req
  const { id } = query

  try {
    const doc = await firestore.collection('Devits').doc(id).get()
    const docExist = doc.exists
    if (!docExist) return res.sendStatus(404)

    const data = doc.data()
    const idDoc = doc.id
    const { createdAt } = data

    res.json({
      ...data,
      id: idDoc,
      createdAt: +createdAt.toDate()
    })
  } catch (e) {
    res.status(404).end()
  }
}
