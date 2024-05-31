import React from 'react'
import { SessionContext, SessionContextType } from 'supertokens-auth-react/recipe/session'

interface MockSessionProviderProps {
  children: React.ReactNode
  sessionContext: SessionContextType
}

export const MockSessionProvider: React.FC<MockSessionProviderProps> = ({ children, sessionContext }) => {
  return <SessionContext.Provider value={sessionContext}>{children}</SessionContext.Provider>
}
