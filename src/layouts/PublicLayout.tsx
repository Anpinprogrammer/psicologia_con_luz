import { Outlet } from 'react-router-dom'

import Footer from '../components/layout/Footer'

const PublicLayout = () => {

  return (
    <>
        <main>
            <Outlet />
        </main>

        <Footer />
    </>
  )
}

export default PublicLayout