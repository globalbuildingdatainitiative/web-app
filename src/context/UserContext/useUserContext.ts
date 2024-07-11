import { useContext } from 'react'
import { UserContext } from './UserContext.tsx'

export const useUserContext = () => useContext(UserContext)
