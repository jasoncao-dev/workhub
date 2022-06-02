import './Signup.css';
import { useState } from 'react';
import { useSignup } from '../../hooks/useSignup';

export default function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [thumbnail, setThumbnail] = useState(null);
    const [thumbnailError, setThumbnailError] = useState(null);
    const { signup, isPending, error } = useSignup();

    const handleFileChange = (e) => {
        setThumbnail(null);
        let selected = e.target.files[0];
        if (!selected) {
            setThumbnailError('Please select a file');
            return;
        }
        if (!selected.type.includes('image')) {
            setThumbnailError('Please select an image file');
            return;
        }
        if (selected.size > 1000000) {
            setThumbnailError('Please select a file less than 1MB');
            return;
        }
        setThumbnailError(null);
        setThumbnail(selected);
        console.log('Thumbnail updated');
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        signup(email, password, displayName, thumbnail);
    }

    return (
        <form className='auth-form' onSubmit={handleSubmit}>
            <h2>Sign Up</h2>
            {thumbnailError && <p className='error'>{thumbnailError}</p>}
            {error && <p className='error'>{error}</p>}
            <label>
                <span>Email:</span>
                <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </label>
            <label>
                <span>Password:</span>
                <input required type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </label>
            <label>
                <span>Display Name:</span>
                <input required type="text" value={displayName} onChange={(e) => setDisplayName(e.target.value)} />
            </label>
            <label>
                <span>Profile Thumbnail:</span>
                <input required type="file" onChange={handleFileChange}/>
            </label>
            {isPending ? 
                <button className='btn' disabled>Loading...</button> : 
                <button className='btn'>Sign Up</button>
            }
        </form>
    )
}