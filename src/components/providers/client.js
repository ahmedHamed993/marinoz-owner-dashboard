import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://109.106.244.229:8080/v1/graphql", // Replace with your Hasura endpoint
  headers: {
    // "x-hasura-admin-secret": "your-admin-secret", // Add if authentication is required
  },
  cache: new InMemoryCache(),
});

export default client;
