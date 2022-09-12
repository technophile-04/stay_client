import { Affix, Layout, Spin } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { useMutation } from "react-apollo";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AppHeaderSkeleton, ErrorBanner } from "./lib/components";
import { LOG_IN } from "./lib/graphql/mutations";
import {
  LogIn as LogInData,
  LogInVariables,
} from "./lib/graphql/mutations/LogIn/__generated__/LogIn";
import { Viewer } from "./lib/types";
import { AppHeader, Home, Host, Listing, Listings, LogIn, NotFound, User } from "./sections";

const initialViewer: Viewer = {
  id: null,
  token: null,
  avatar: null,
  hasWallet: null,
  didRequest: false,
};

const App = () => {
  const [viewer, setViewer] = useState<Viewer>(initialViewer);
  const [logIn, { error }] = useMutation<LogInData, LogInVariables>(LOG_IN, {
    onCompleted: (data) => {
      if (data && data.logIn) {
        console.log(`onCompleted[]`, data.logIn);
        setViewer(data.logIn);
      }

      if (data.logIn.token) {
        sessionStorage.setItem("token", data.logIn.token);
      } else {
        sessionStorage.removeItem("token");
      }
    },
  });

  console.log(viewer);

  const logInRef = useRef(logIn);

  useEffect(() => {
    logInRef.current();
  }, []);

  if (!viewer.didRequest && !error) {
    <Layout>
      <AppHeaderSkeleton />
      <div className="app-skeleton__spin-section">
        <Spin size="large" tip="Launching Stay" />
      </div>
    </Layout>;
  }

  const logInErrorBannerElement = error ? (
    <ErrorBanner description="We weren't able to verify you if you were logged in. Please try again later" />
  ) : null;

  return (
    <BrowserRouter>
      <Layout id="app">
        {logInErrorBannerElement}
        <Affix offsetTop={0} className="app_affix-header">
          <AppHeader viewer={viewer} setViewer={setViewer} />
        </Affix>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/host" element={<Host />} />
          <Route path="/listing/:id" element={<Listing />} />
          <Route path="/listings" element={<Listings />} />
          <Route path="/listings/:location" element={<Listings />} />
          <Route path="/user/:id" element={<User viewer={viewer} />} />
          <Route path="/login" element={<LogIn setViewer={setViewer} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
