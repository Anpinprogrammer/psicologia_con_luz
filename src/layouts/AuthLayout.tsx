import { Outlet, Navigate } from "react-router-dom"
import NavBar from '../components/layout/NavBar';
import { useAuthContext } from '../context/AuthContext'

const AuthLayout = () => {

  const { user } = useAuthContext();

  return (
    <>
      {user ?
        (
          <>
            <NavBar />
            <main>
              <Outlet />
            </main>
          </>
        )
        :
        (
          <Navigate to="/" />
        )
      }
    </>
  )
}

export default AuthLayout