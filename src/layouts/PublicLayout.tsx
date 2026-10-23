import { Outlet } from 'react-router-dom'

import Footer from '../components/layout/Footer'
import WhatsAppButton from '../components/layout/WhatsAppButton'

const PublicLayout = () => {

  return (
    <>
        <main>
            <Outlet />
        </main>

        <Footer />
        <WhatsAppButton />
    </>
  )
}

export default PublicLayout