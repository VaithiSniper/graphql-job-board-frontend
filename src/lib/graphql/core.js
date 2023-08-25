import { ApolloClient, InMemoryCache, gql, createHttpLink, ApolloLink, concat } from '@apollo/client';
import { getAccessToken } from "../auth";

const endpoint = 'http://localhost:9000/graphql';
const httpOutgressLink = createHttpLink({ uri: endpoint });
const authMiddlewareLink = new ApolloLink((operation, forward) => {
  const accessToken = getAccessToken();
  if (accessToken) {
    operation.setContext({
      headers: { 'Authorization': `Bearer ${accessToken}` }
    })
  }
  return forward(operation);
})

export const apolloClient = new ApolloClient({
  link: concat(authMiddlewareLink, httpOutgressLink),
  cache: new InMemoryCache()
})


