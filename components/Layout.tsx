import Footer from "./Footer";
import Navbar from "./Navbar/Navbar";
import ScrollProgress from "./ui/ScrollProgress";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div>
      <Navbar />
      <ScrollProgress />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
