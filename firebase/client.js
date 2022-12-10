import { initializeApp, getApps } from 'firebase/app'
import {
  getAuth,
  signInWithPopup,
  GithubAuthProvider,
  onAuthStateChanged
} from 'firebase/auth'

import {
  addDoc,
  collection,
  getFirestore,
  limit,
  onSnapshot,
  orderBy,
  query,
  Timestamp
} from 'firebase/firestore'

import { getStorage, ref, uploadBytesResumable } from 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyDQyVX4EZF1Zfxkou6q2QgDzMzucQ2-pSg',
  authDomain: 'devter-c5c47.firebaseapp.com',
  projectId: 'devter-c5c47',
  storageBucket: 'devter-c5c47.appspot.com',
  messagingSenderId: '940414060784',
  appId: '1:940414060784:web:09a00a4fc94be890361a35',
  measurementId: 'G-W0WHNG8GF6'
}
const apps = getApps()

!apps.length && initializeApp(firebaseConfig)

const db = getFirestore()
const docRef = collection(db, 'Devits')

const auth = getAuth()

const storage = getStorage()

const mapUserForFirebaseAuthToUser = user => {
  const { screenName, displayName, email, photoUrl, localId } =
    user.user?.reloadUserInfo || user.reloadUserInfo

  return {
    avatar: photoUrl,
    username: screenName,
    fullname: displayName,
    email,
    uid: localId
  }
}
// User functions firebase
export const whenAuthChanged = onChange => {
  return onAuthStateChanged(auth, user => {
    const normalizedUser = user ? mapUserForFirebaseAuthToUser(user) : null
    onChange(normalizedUser)
  })
}

export const loginWithGithub = () => {
  const githubProvider = new GithubAuthProvider()
  const auth = getAuth()

  return signInWithPopup(auth, githubProvider)
}

// Devit functions firebase

const mapDevitFromFirebaseToDevitObject = (doc) => {
  const data = doc.data()
  const id = doc.id
  const { createdAt } = data

  return {
    ...data,
    id,
    createdAt: +createdAt.toDate()
  }
}

export const addDevit = ({ avatar, content, userId, img, username }) => {
  return addDoc(docRef, {
    avatar,
    content,
    userId,
    img,
    username,
    createdAt: Timestamp.fromDate(new Date()),
    likesCount: 0,
    sharedCount: 0
  })
}

export const listenLatestDevits = (callback) => {
  const q = query(docRef, orderBy('createdAt', 'desc'), limit(20))
  const { docs } = onSnapshot(q, ({ docs }) => {
    const newDevits = docs.map(mapDevitFromFirebaseToDevitObject)
    callback(newDevits)
  })

  return docs
}

// export const fetchLatestDevits = async () => {
//   const q = query(docRef, orderBy('createdAt', 'desc'))
//   const { docs } = await getDocs(q)

//   const normalizeDocs = docs.map(mapDevitFromFirebaseToDevitObject)

//   return normalizeDocs
// }

export const uploadImage = file => {
  const imagesRef = ref(storage, `images/${file.name}`)
  const task = uploadBytesResumable(imagesRef, file)

  return task
}
