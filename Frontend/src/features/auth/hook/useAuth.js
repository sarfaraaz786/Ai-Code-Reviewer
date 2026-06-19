import { useState, useEffect } from 'react'
import { getMe } from '../services/auth.api'

export const useAuth = () => {
    const [user, setUser] = useState(null)         // null = not logged in
    const [loading, setLoading] = useState(true)   // checking on first load

    // When the app loads, check if user already has a valid cookie
    useEffect(() => {
        getMe()
            .then((data) => {
                setUser(data.user)
            })
            .catch(() => {
                setUser(null)  // no valid session
            })
            .finally(() => {
                setLoading(false)
            })
    }, [])

    return { user, setUser, loading }
}
