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
  getDocs,
  getFirestore,
  Timestamp
} from 'firebase/firestore'

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

export const whenAuthChanged = onChange => {
  const auth = getAuth()

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

export const addDevit = ({ avatar, content, userId, username }) => {
  return addDoc(docRef, {
    avatar,
    content,
    userId,
    username,
    createdAt: Timestamp.fromDate(new Date()),
    likesCount: 0,
    sharedCount: 0
  })
}

export const fetchLatestDevits = async () => {
  return getDocs(docRef).then(({ docs }) =>
    docs.map(doc => {
      const data = doc.data()
      const id = doc.id
      const { createdAt } = data
      const date = new Date(createdAt.seconds * 1000)
      const normalizedCreatedAt = new Intl.DateTimeFormat('es-ES').format(
        date
      )

      return {
        ...data,
        id,
        createdAt: normalizedCreatedAt
      }
    })
  )
}
