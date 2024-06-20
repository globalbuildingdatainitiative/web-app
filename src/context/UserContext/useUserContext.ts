import { useContext } from 'react'
import { UserContext } from '@context'

export const useUserContext = () => useContext(UserContext)
