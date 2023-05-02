import Hero from "./Hero";
import Navbar from "./Navbar/Navbar";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div>
      <Navbar />
      <Hero />
      <main>{children}</main>
    </div>
  );
};

export default Layout;
