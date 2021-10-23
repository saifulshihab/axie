import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { offsetLimitPagination } from "@apollo/client/utilities";

const client = new ApolloClient({
  uri: "https://axieinfinity.com/graphql-server-v2/graphql",
  cache: new InMemoryCache({
    typePolicies: {
      Axies: {
        fields: {
          results: {
            // merge(existing = [], incoming) {
            //   console.log("existing", existing);
            //   console.log("Incoming", incoming);
            //   const mergedData = [...existing, ...incoming];
            //   console.log("MERGED DATA", mergedData);
            //   // return mergedData;
            //   return incoming;
            // },

            ...offsetLimitPagination(),
            read(existing, { args }) {},
          },
        },
      },
    },
  }),
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
