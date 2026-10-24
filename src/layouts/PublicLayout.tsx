import { Outlet, useLocation } from 'react-router-dom'

import Footer from '../components/layout/Footer'
import WhatsAppButton from '../components/layout/WhatsAppButton'

const PublicLayout = () => {
  const isBooking = useLocation().pathname === '/agendar-cita'

  return (
    <>
        <main className={isBooking ? 'public-main--booking' : undefined}>
            <Outlet />
        </main>

        <Footer />
        <WhatsAppButton />
    </>
  )
}

export default PublicLayout