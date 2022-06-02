import { AuthContext } from '../context/AuthContext'
import { useContext } from 'react'


export const useAuthContext = () => {
    const context = useContext(AuthContext)

    /* This would happen if context is not wrapped properly */
    if (!context) {
        throw Error('useAuthContext must be inside an AuthContextProvider')
    }

    return context
}