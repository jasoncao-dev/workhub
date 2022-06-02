import './Navbar.css';
import logo from '../../assets/temple.svg';
import { Link } from 'react-router-dom';
import { useLogout } from '../../hooks/useLogout';
import { useAuthContext } from '../../hooks/useAuthContext';

export default function Navbar() {
    const { logout, isPending } = useLogout();
    const { user } = useAuthContext();
    return (
        <div className='navbar'>
            <ul>
                <li className='logo'>
                    <img src={logo} alt="workhub logo"/>
                    <span>Workhub</span>
                </li>
                {!user ? (
                    <>
                        <li><Link to="/login">Login</Link></li>
                        <li><Link to="/signup">Signup</Link></li>
                    </>
                ) : (
                    <li>
                        {isPending ? 
                            <button className='btn' disabled>Logging out</button> :
                            <button className='btn' onClick={logout}>Logout</button>
                        }
                    </li>
                ) }
                
                
            </ul>
        </div>
    )
}