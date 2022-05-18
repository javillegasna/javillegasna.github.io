import React from "react";
import Footer from "./footer/Footer";
import Header from "./header/Header";
import Introduction from "./introduction/Introduction";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <Introduction />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
