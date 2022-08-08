import { Affix, Layout } from "antd";
import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
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
  console.log(viewer);

  return (
    <BrowserRouter>
      <Layout id="app">
        <Affix offsetTop={0} className="app_affix-header">
          <AppHeader viewer={viewer} setViewer={setViewer} />
        </Affix>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/host" element={<Host />} />
          <Route path="/listing/:id" element={<Listing />} />
          <Route path="/listings" element={<Listings />} />
          <Route path="/listings/:location" element={<Listings />} />
          <Route path="/user/:id" element={<User />} />
          <Route path="/login" element={<LogIn setViewer={setViewer} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
