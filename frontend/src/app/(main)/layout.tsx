"use client";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import "./global.css";
import { PropsWithChildren } from "react";
import { UserProvider } from "./components/utils/AuthProvider";
import { SavedProvider } from "./components/utils/SavedProvider";
import { ProductProvider } from "./components/utils/ProductProvider";

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <body style={{ minHeight: "calc(100vh - 320.5px - 74px)" }}>
        <UserProvider>
          <SavedProvider>
            <ProductProvider>
              <Header />
              {children}
              <Footer />
              <ToastContainer />
            </ProductProvider>
          </SavedProvider>
        </UserProvider>
      </body>
    </>
  );
};
export default Layout;
