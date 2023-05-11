import Login from '@/components/Login'

const LoginPage = () => {
    return (
        <div className='p-24'>
        <h1>Login Page</h1>
        <p>This page is only accessible to logged in users</p>
        <Login/>
        </div>
    );
}

export default LoginPage;
