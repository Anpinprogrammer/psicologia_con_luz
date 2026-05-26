import React from 'react'
import { useLocation } from 'react-router-dom'
import { Outlet } from 'react-router-dom'

import Footer from '../components/layout/Footer'

const PublicLayout = () => {

  const location = useLocation()

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