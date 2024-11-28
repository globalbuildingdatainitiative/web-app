import { ReactNode, useMemo } from 'react'

import { ApolloClient, ApolloProvider, createHttpLink, from, InMemoryCache } from '@apollo/client'
import { onError } from '@apollo/client/link/error'
import SuperTokens from 'supertokens-auth-react'

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
      graphQLErrors.forEach(({ message, locations, path }) => {
        if (message.includes('401: Unauthorized')) {
          console.warn('Caught 401 - Unauthorized - Redirecting to login.')
          SuperTokens.redirectToAuth()
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
        cache: new InMemoryCache({
          typePolicies: {
            ProjectGraphQLGroupResponse: {
              keyFields: ['group'],
            },
          },
        }),
      }),
    [httpLink, errorLink],
  )

  return <ApolloProvider client={client}>{children}</ApolloProvider>
}
