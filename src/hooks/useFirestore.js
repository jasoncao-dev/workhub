import { useReducer, useEffect, useState } from 'react'
import { projectFirestore, timestamp } from '../firebase/config'

let initialState = {
    document: null,
    isPending: false,
    error: null,
    sucess: null
}

const firestoreReducer = (state, action) => {
    switch (action.type) {
        case 'IS_PENDING':
            return { isPending: true, document: null, sucess: false, error: null }
        case 'ADDED_DOCUMENT':
            return { isPending: false, document: action.payload, sucess: true, error: null }
        case 'DELETED_DOCUMENT':
            return { isPending: false, document: null, sucess: true, error: null }
        case 'ERROR':
            return { isPending: false, document: null, sucess: false, error: action.payload }
        default:
            return state
    }
}

/* Custome hook adds and removes documents */

export const useFirestore = (collection) => {
    const [response, dispatch] = useReducer(firestoreReducer, initialState)
    const [isCancelled, setIsCancelled] = useState(false)

    /* Collection reference */
    const ref = projectFirestore.collection(collection)

    /* Only dispatch is not cancelled */
    const dispatchIfNotCancelled = (action) => {
        if (!isCancelled) {
            dispatch(action)
        }
    }

    const addDocument = async (doc) => {
        dispatch({ type: 'IS_PENDING' })
        try {
            const createdAt = timestamp.fromDate(new Date())
            const addedDocument = await ref.add({ ...doc, createdAt })
            dispatchIfNotCancelled({ type: 'ADDED_DOCUMENT', payload: addedDocument })
        } catch (err) {
            dispatchIfNotCancelled({ type: 'ERROR', payload: err.message })
        }
    }

    const deleteDocument = async (id) => {
        dispatch({ type: 'IS_PENDING' })
        try {
            await ref.doc(id).delete()
            dispatchIfNotCancelled({ type: 'DELETED_DOCUMENT' })
        } catch (err) {
            dispatchIfNotCancelled({ type: 'ERROR', payload: 'Could not delete' })
        }
    }

    useEffect(() => {
      return () => setIsCancelled(true)
    }, [])
    
    return { addDocument, deleteDocument, response }
}