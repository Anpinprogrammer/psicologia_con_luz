import { Route, BrowserRouter, Routes } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'


//Layouts
import PublicLayout from './layouts/PublicLayout'
import AuthLayout from './layouts/AuthLayout'

//Paginas
import LandingPage from './pages/LandingPage/LandingPage'
import Blog from './pages/BlogPage/Blog'
import FormularioCita from './pages/BookingPage/FormularioCita'
import LinkPublicPage from './pages/linktreepublic/LinkPublicPage'
import LinkAdminPage from './pages/linktree/LinkAdminPage'
import AuthCallback from './pages/AuthCallback'

//Paginas autenticadas
import Home from './pages/client_authenticated/Home/Home'




function App() {

  return (
    <>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/**Ruta Callback */ }
          <Route path='/auth/callback' element={<AuthCallback />} />
          {/**Rutas publicas */}
          <Route path='/' element={<PublicLayout />}>
            <Route index element={<LandingPage />} />
            <Route path='/blog' element={<Blog />}  />
            <Route path='/agendar-cita' element={<FormularioCita />} />
            <Route path='/linktree' element={<LinkPublicPage />} />
            <Route path='/linktree-admin' element={<LinkAdminPage />} />
          </Route>

          {/**Rutas autenticadas */}
          <Route path='/patient' element={<AuthLayout />} >
            <Route index element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
      </AuthProvider>
    </>
  )
}

export default App
