/* eslint-disable react/prop-types */

import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      {/* Main content should grow to take up available space */}
      <div className="flex-grow">
        {children}
      </div>
      {/* Footer sticks to the bottom */}
      <Footer />
    </div>
  );
}

export default Layout;
