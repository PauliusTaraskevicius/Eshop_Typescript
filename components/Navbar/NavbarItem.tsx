import { useState, useEffect } from "react";

interface NavbarItemProps {
  label: string;
}

const TOP_OFFSET = 66;

const NavbarItem: React.FC<NavbarItemProps> = ({ label }) => {
  const [underline, setUnderline] = useState(false);

  const changeUnderline = () => {
    if (window.scrollY >= TOP_OFFSET) {
      setUnderline(true);
    } else setUnderline(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", changeUnderline);
  }, []);

  return (
    <div
      className={
        underline
          ? "relative cursor-pointer before:absolute before:-bottom-[1.5px] before:left-0 before:block before:h-[1px] before:w-full before:origin-top-left before:scale-x-0 before:bg-black before:transition before:duration-300 before:ease-in-out before:content-[''] before:hover:scale-x-100"
          : "relative cursor-pointer before:absolute before:-bottom-[1.5px] before:left-0 before:block before:h-[1px] before:w-full before:origin-top-left before:scale-x-0 before:bg-white before:transition before:duration-300 before:ease-in-out before:content-[''] before:hover:scale-x-100"
      }
    >
      {label}
    </div>
  );
};

export default NavbarItem;
