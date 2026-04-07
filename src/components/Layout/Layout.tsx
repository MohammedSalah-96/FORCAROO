import { Outlet } from "react-router";
import PreLoader from "../PreLoader";
// import Navbar from "../Navbar";
import ScrollToTopButton from "../ScrollToTopButton";
import MainNavigationMenu from "../MainNavigationMenu";
import Footer from "../Footer";
// import Footer from "./Footer";

const Layout = () => {
  return (
    <main>
      <PreLoader />
      {/* <Navbar /> */}
      <MainNavigationMenu />
      <Outlet />
      <ScrollToTopButton />
      <Footer />
    </main>
  );
};

export default Layout;
