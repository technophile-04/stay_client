import React from "react";
import { Route, Routes } from "react-router-dom";
import { Home, Host, Listing, Listings, NotFound, User } from "./sections";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/host" element={<Host />} />
      <Route path="/listing/:id" element={<Listing />} />
      <Route path="/listings" element={<Listings />} />
      <Route path="/listings/:location" element={<Listings />} />
      <Route path="/user/:id" element={<User />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
