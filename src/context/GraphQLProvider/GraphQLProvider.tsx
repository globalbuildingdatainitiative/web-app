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

  const errorLink = onError(({ graphQLErrors, networkError, operation, forward }) => {
    if (graphQLErrors) {
      graphQLErrors.forEach(({ message, locations, path }) => {
        if (message.includes('401: Unauthorized')) {
          console.warn(`Retrying ${operation}`)
          return forward(operation)
        } else {
          console.error(`[GraphQL Error]: Message: ${message}, Location: ${locations}, Path: ${path}`)
        }
      })
    }
    if (networkError) {
      console.error(`[Network Error]: ${networkError}`)
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
