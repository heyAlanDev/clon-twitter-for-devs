import { initializeApp } from 'firebase/app'
import {
  getAuth,
  signInWithPopup,
  GithubAuthProvider,
  onAuthStateChanged
} from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyDQyVX4EZF1Zfxkou6q2QgDzMzucQ2-pSg',
  authDomain: 'devter-c5c47.firebaseapp.com',
  projectId: 'devter-c5c47',
  storageBucket: 'devter-c5c47.appspot.com',
  messagingSenderId: '940414060784',
  appId: '1:940414060784:web:09a00a4fc94be890361a35',
  measurementId: 'G-W0WHNG8GF6'
}

initializeApp(firebaseConfig)

const mapUserForFirebaseAuthToUser = user => {
  const { screenName, displayName, email, photoUrl } =
    user.user?.reloadUserInfo || user.reloadUserInfo

  return {
    avatar: photoUrl,
    username: screenName,
    fullname: displayName,
    email
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
    .then(mapUserForFirebaseAuthToUser)
    .catch(err => console.error(err))
}
