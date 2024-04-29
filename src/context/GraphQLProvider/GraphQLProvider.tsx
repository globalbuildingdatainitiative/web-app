import { ReactNode, useMemo } from 'react'

import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache } from '@apollo/client'

type GraphQlProviderProps = {
  children: ReactNode
}

export const GraphQLProvider = ({ children }: GraphQlProviderProps) => {
  const backendLink = createHttpLink({
    uri: `${import.meta.env.VITE_GRAPHQL_API_DOMAIN}/graphql`,
    credentials: 'include',
  })
  const client = useMemo(
    () =>
      new ApolloClient({
        link: backendLink,
        cache: new InMemoryCache(),
      }),
    [backendLink],
  )

  return <ApolloProvider client={client}>{children}</ApolloProvider>
}
