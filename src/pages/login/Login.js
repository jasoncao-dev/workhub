import './Login.css';
import { useState } from 'react';
import { useLogin } from '../../hooks/useLogin';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { error, isPending, login } = useLogin();

    const handleSubmit = (e) => {
        e.preventDefault();
        login(email, password);
    }

    return (
        <form className='auth-form' onSubmit={handleSubmit}>
            <h2>Login</h2>
            {error && <p className='error'>{error}</p>}
            <label>
                <span>Email:</span>
                <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </label>
            <label>
                <span>Password:</span>
                <input required type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </label>
            {isPending ? 
                <button className='btn' disabled>Loading...</button> : 
                <button className='btn'>Log in</button>
            }
        </form>
    )
}