import React from "react";
import {
  ApolloCache,
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
} from "@apollo/client";
import TRX from "./components/TRX";

const LAUNCHES_QUERYs = `
{
  launchesPast(limit:10){
    id
    mission_name
  }
}
`;
const LAUNCHES_QUERY = `
{
  date(id:"2020"){   
  id
  books{
    name
    genre
  }  
  }
}
`;

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: "http://192.168.43.225:4000/graphql",
});

export default function App() {
  return (
    <ApolloProvider client={client}>
      <TRX />
    </ApolloProvider>
  );
}
