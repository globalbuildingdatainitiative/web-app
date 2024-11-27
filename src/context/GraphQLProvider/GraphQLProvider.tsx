import { ReactNode, useMemo } from 'react'

import { ApolloClient, ApolloProvider, createHttpLink, from, fromPromise, InMemoryCache } from '@apollo/client'
import { onError } from '@apollo/client/link/error'
import Session from 'supertokens-auth-react/recipe/session'
import SuperTokens from 'supertokens-auth-react'

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
          console.warn(`Retrying ${operation.operationName}`)
          const result = fromPromise(
            Session.attemptRefreshingSession().then((success) => {
              if (success) {
                debugger
                console.log('Success!')
                return forward(operation)
              } else {
                console.warn(`Could not receive new token for user. Redirecting to login`)
                SuperTokens.redirectToAuth()
              }
            }),
          )
          debugger
          // TODO - it doesn't work!!
          return result

          // Session.attemptRefreshingSession().then(success => {
          //     if (success) {
          //       debugger
          //       console.log("Success!")
          //       return forward(operation)
          //     } else {
          //       console.warn(`Could not receive new token for user. Redirecting to login`)
          //       SuperTokens.redirectToAuth();
          //     }
          // })
          // return fromPromise(Session.attemptRefreshingSession()).flatMap((success) => {
          //   if (success) {
          //     console.log("Success!")
          //     return forward(operation)
          //   } else {
          //     console.warn(`Could not receive new token for user. Redirecting to login`)
          //     SuperTokens.redirectToAuth();
          //     return;
          //   }
          // })
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
