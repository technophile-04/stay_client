import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { Viewer } from "./lib/types";
import { Home, Host, Listing, Listings, LogIn, NotFound, User } from "./sections";

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
  );
};

export default App;
