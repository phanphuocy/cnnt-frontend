import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri:
    process.env.NODE_ENV === 'production'
      ? process.env.NEXT_PUBLIC_GRAPHQL_URL
      : 'http://localhost:5000/graphql',
  cache: new InMemoryCache(),
});

export default client;
