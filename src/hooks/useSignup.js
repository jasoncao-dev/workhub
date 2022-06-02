import { useState, useEffect } from 'react'
import { projectAuth, projectStorage, projectFirestore } from '../firebase/config'
import { useAuthContext } from './useAuthContext'

/**
 * @function useSignup custom hook creates a new user with the email and password provided, 
 * and then updates the user's profile with the display name
 * @param email, @param password, @param displayName
 * @returns properties including error, isPending, and signup functions.
 */

export const useSignup = () => {
    const [isCancelled, setIsCancelled] = useState(false)
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const { dispatch } = useAuthContext()

    const signup = async (email, password, displayName, thumbnail) => {
        setError(null)
        setIsPending(true)
        try {
            /* Creating a new user with the email and password provided. */
            const res = await projectAuth.createUserWithEmailAndPassword(email, password)
            if (!res) {
                throw new Error('Could not complete signup')
            }

            /* Upload user thumbnail */
            const uploadPath = `thumbnails/${res.user.uid}/${thumbnail.name}`
            const image = await projectStorage.ref(uploadPath).put(thumbnail)
            const imageUrl = await image.ref.getDownloadURL()

            /* Updating the user's profile with the display name. */
            await res.user.updateProfile({ displayName, photoURL: imageUrl })

            /* Create a user document */
            await projectFirestore.collection('users').doc(res.user.uid).set({
                online: true,
                displayName,
                photoUrl: imageUrl
            })

            /* Dispatch login action */
            dispatch({ type: 'LOGIN', payload: res.user })
            
            if (!isCancelled) {
                setIsPending(false)
                setError(null)
            }
        } catch(err) {
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

    return { error, isPending, signup }
}