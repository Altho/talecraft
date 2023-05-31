import { signIn } from 'next-auth/react'

export default const Login() => {
    return (
        <form
            method='post'
            action='/api/auth/signin/credentials'
            onSubmit={(e) => {
                e.preventDefault()
                signIn('credentials', { email: document.getElementById('email').value })
            }}
        >
            <label>
                Email address
                <input type='text' id='email' name='email'/>
            </label>
            <button type='submit'>Sign in with Email</button>
        </form>
    )
}

export async function getServerSideProps (context) {
    return {
        props: {
            csrfToken: await csrfToken(context)
        }
    }
}
