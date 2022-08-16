import ApolloClient from "apollo-boost";
import React from "react";
import { ApolloProvider } from "react-apollo";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./styles/index.css";

const client = new ApolloClient({
  uri: "http://localhost:9000/api",
  credentials: "include",
});

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);

reportWebVitals();
