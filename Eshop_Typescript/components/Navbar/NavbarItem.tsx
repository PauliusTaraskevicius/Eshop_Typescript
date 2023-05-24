import { useState, useEffect, useCallback } from "react";

import useLoginModal from "@/hooks/useLoginModal";
import useCurrentUser from "@/hooks/useCurrentUser";

interface NavbarItemProps {
  label: string;
  onClick?: () => void;
}

const TOP_OFFSET = 66;

const NavbarItem: React.FC<NavbarItemProps> = ({ label, onClick }) => {
  const loginModal = useLoginModal();

  const { data: currentUser } = useCurrentUser();

  const [underline, setUnderline] = useState(false);

  const changeUnderline = () => {
    if (window.scrollY >= TOP_OFFSET) {
      setUnderline(true);
    } else setUnderline(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", changeUnderline);
  }, []);

  const handleClick = useCallback(() => {
    if (onClick) {
      return onClick();
    }

    if (!currentUser) {
      loginModal.onOpen();
    }
  }, [loginModal, currentUser, onClick]);

  return (
    <div
      onClick={label === "Logout" ? handleClick : undefined}
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
