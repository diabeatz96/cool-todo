// const LoginPage = () => {
//     return (
//         <div>
//         <h1>login page</h1>
//         </div>
//     );
// }

// export default LoginPage;

"use client"
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'

const LoginPage = () => {
  const session = useSession()
  const supabase = useSupabaseClient()

  return (
    <div className="container" style={{ padding: '50px 0 100px 0' }}>
      {!session ? (
        <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} theme="dark" />
      ) : (
        <p>Account page will go here.</p>
      )}
    </div>
  )
}

export default LoginPage