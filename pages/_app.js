import AppLayout from 'components/AppLayout'
import Navbar from 'components/Navbar'

export default function App ({ Component, pageProps }) {
  return (
    <>
      <AppLayout>
        <Component {...pageProps} />
      </AppLayout>
      <Navbar></Navbar>
    </>
  )
}
