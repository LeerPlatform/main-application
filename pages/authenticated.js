import { useContext } from 'react'
import MainLayout from '../components/MainLayout'
import { fetchUser, withAuthSync } from '../lib/auth'
import { AuthContext } from '../contexts/AuthContext'

function Authenticated({ user }) {
  const { session, setUser } = useContext(AuthContext)
  setUser(user)

  return (
    <MainLayout>
      <div className="container mx-auto">
        <div className="text-2xl">Authenticated with {session.user.name}</div>
      </div>
    </MainLayout>
  )
}

export async function getServerSideProps(ctx) {
  const user = await fetchUser(ctx)

  return {
    props: {
      user,
    },
  }
}

export default withAuthSync(Authenticated)
