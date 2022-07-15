import React from "react";
import {
  ApolloCache,
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
} from "@apollo/client";
import TRX from "./components/TRX";


const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: "http://localhost:4000/graphql",
});

export default function App() {
  return (
    <ApolloProvider client={client}>
      <TRX />
    </ApolloProvider>
  );
}
