import { Layout } from "antd";
import ApolloClient from "apollo-boost";
import React from "react";
import { ApolloProvider } from "react-apollo";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./styles/index.css";

const client = new ApolloClient({
  uri: "http://localhost:9000/api",
});

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <BrowserRouter>
    <ApolloProvider client={client}>
      <Layout id="app">
        <App />
      </Layout>
    </ApolloProvider>
  </BrowserRouter>
);

reportWebVitals();
