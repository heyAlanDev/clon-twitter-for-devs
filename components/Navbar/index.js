import Create from 'components/Icons/Create'
import Home from 'components/Icons/Home'
import Search from 'components/Icons/Search'
import Link from 'next/link'
import { colors } from 'styles/themes'

export default function Navbar () {
  return (
    <>
      <nav>
        <Link className='nav-icons' href='/home'>
          <Home width={32} height={32} stroke='#09f' />
        </Link>
        <Link className='nav-icons' href='/search'>
          <Search width={32} height={32} stroke='#09f' />
        </Link>
        <Link className='nav-icons' href='/compose/devit'>
          <Create width={32} height={32} stroke='#09f' />
        </Link>
      </nav>
      <style jsx>{`
      nav {
          background: #fff;
          border-top: 1px solid #eee;
          bottom: 0;
          display: flex;
          height: 56px;
          position: sticky;
          width: 100%;
        }

        nav > :global(a) {
          align-items: center;
          display: flex;
          flex: 1 1 auto;
          justify-content: center;
        }

        nav > :global(a):hover {
          background: radial-gradient(#0099ff22 20%, transparent 16%);
          background-size: 100px 100px;
          background-position: center;
        }

        nav > :global(a):hover > :global(svg) {
          stroke: ${colors.secondary}
        }
      `}</style>
    </>
  )
}
