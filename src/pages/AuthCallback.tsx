import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../utils/supabase'

export default function AuthCallback(){

  const navigate = useNavigate()

  useEffect(()=>{

    handleOAuth()

  },[])

  async function handleOAuth(){

    try{

      const {

        data:{ user },
        error: authError

      } = await supabase.auth.getUser()

      if(authError || !user){

        navigate('/')

        return

      }

      if(!user.email){

        navigate('/')

        return

      }

      const params =
      new URLSearchParams(
        window.location.search
      )

      const mode =
      params.get('mode')

      const {

        data: profile,
        error: profileError

      } = await supabase

      .from('profiles')

      .select('*')

      .eq('email',user.email)

      .maybeSingle()

      if(profileError){

        console.error(profileError)

        navigate('/')

        return

      }

      // ---------- ADMIN DETECTADO ----------

      if(profile?.role === 'admin'){

        alert(
          'Esta cuenta pertenece al portal administrativo.'
        )

        await supabase.auth.signOut()

        navigate('/')

        return

      }

      // ---------- PATIENT EXISTENTE ----------

      if(profile?.role === 'patient'){

        navigate('/dashboard')

        return

      }

      // ---------- LOGIN SIN CUENTA ----------

      if(!profile && mode==='login'){

        alert(
          'No encontramos una cuenta registrada.'
        )

        await supabase.auth.signOut()

        navigate('/register')

        return

      }

      // ---------- SIGNUP NUEVO PATIENT ----------

      if(!profile && mode==='signup'){

        const {

          error: insertError

        } = await supabase

        .from('profiles')

        .insert({

          id:user.id,

          email:user.email,

          name:
            user.user_metadata
            ?.full_name ?? '',

          role:'patient'

        })

        if(insertError){

          console.error(insertError)

          await supabase.auth.signOut()

          navigate('/register')

          return

        }

        navigate('/dashboard')

        return

      }

      navigate('/login')

    }

    catch(err){

      console.error(err)

      await supabase.auth.signOut()

      navigate('/login')

    }

  }

  return(

    <div>

      Procesando autenticación...

    </div>

  )

}