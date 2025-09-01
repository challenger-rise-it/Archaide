import LoadingSpinner from '@components/spinner/Loading-spinner'
import AdminHome from './admin'
import UserHome from './user'
import { useAuthCtx } from '@context/authContext'

const Home = () => {
  const { userData } = useAuthCtx()
  if (userData === null) {
    return <LoadingSpinner />
  }
  if (userData.role === 'user' || userData.role == 'superadmin') {
    return <UserHome />
  }
  return <AdminHome />
}

export default Home
