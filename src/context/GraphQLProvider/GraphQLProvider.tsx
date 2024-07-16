import { ReactNode, useMemo } from 'react'

import { ApolloClient, ApolloProvider, createHttpLink, from, InMemoryCache } from '@apollo/client'
import { onError } from '@apollo/client/link/error'

type GraphQlProviderProps = {
  children: ReactNode
}

export const GraphQLProvider = ({ children }: GraphQlProviderProps) => {
  const httpLink = createHttpLink({
    uri: `${import.meta.env.VITE_GRAPHQL_API_DOMAIN}/graphql`,
    credentials: 'include',
  })

  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      graphQLErrors.forEach(({ message, locations, path }) =>
        console.error(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`),
      )
    }
    if (networkError) {
      console.error(`[Network error]: ${networkError}`)
    }
  })

  const client = useMemo(
    () =>
      new ApolloClient({
        link: from([errorLink, httpLink]),
        cache: new InMemoryCache(),
      }),
    [httpLink, errorLink],
  )

  return <ApolloProvider client={client}>{children}</ApolloProvider>
}
