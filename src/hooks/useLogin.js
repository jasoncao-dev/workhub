import { useState, useEffect } from 'react'
import { projectAuth, projectFirestore } from '../firebase/config'
import { useAuthContext } from './useAuthContext'

/**
 * Custom hook to sign in user with email and password
 * @returns An object with 3 properties: error, isPending, and login.
 */
export const useLogin = () => {
    const [isCancelled, setIsCancelled] = useState(false)
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const { dispatch } = useAuthContext()

    /**
     * A function that takes in an email and password and attempts to sign in a user with those
     * credentials.
     * @param email - The email address of the user.
     * @param password - The password of the user.
     */
    const login = async (email, password) => {
        setError(null)
        setIsPending(true)

        try {
            const res = await projectAuth.signInWithEmailAndPassword(email, password)
            await projectFirestore.collection('users').doc(res.user.uid).update({ online: true})
            dispatch({ type: 'LOGIN', payload: res.user })
            /* Update state */
            if (!isCancelled) {
                setError(null)
                setIsPending(false)
            }
            
        } catch (err) {
            if (!isCancelled) {
                console.log(err.message)
                setError(err.message)
                setIsPending(false)
            }
        }
    }

    /* This prevents state to be updated when user navigates to other page while awaiting for response to get back */
    useEffect(() => {
      return () => setIsCancelled(true)
    }, [])
    
    return { error, isPending, login }
}