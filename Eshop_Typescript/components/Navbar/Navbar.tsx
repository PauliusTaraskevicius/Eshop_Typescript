import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/router";
import { signOut } from "next-auth/react";

import Image from "next/image";
import NavbarItem from "./NavbarItem";
import MobileMenu from "./MobileMenu";

import useLoginModal from "@/hooks/useLoginModal";
import useCurrentUser from "@/hooks/useCurrentUser";
import useCategoryModal from "@/hooks/useCategoryModal";

import blacklogo from "../../public/images/black-logo.png";
import whitelogo from "../../public/images/logo.png";

import { AiOutlineMenu } from "react-icons/ai";

const TOP_OFFSET = 66;

const Navbar = () => {
  const [navbar, setNavbar] = useState(false);
  const [navbarLogo, setNavbarLogo] = useState(whitelogo);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const router = useRouter();
  const loginModal = useLoginModal();
  const { data: currentUser } = useCurrentUser();

  const categoryModal = useCategoryModal();

  const onClick = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    router.push("/");
  }, [currentUser, loginModal, router]);

  const categoryOnClick = useCallback(() => {
    return categoryModal.onOpen();
    router.push('/')
  }, [])

  const changeChangeBackground = () => {
    if (window.scrollY >= TOP_OFFSET) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };

  const changeLogo = () => {
    if (window.scrollY >= TOP_OFFSET) {
      setNavbarLogo(blacklogo);
    } else {
      setNavbarLogo(whitelogo);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", changeChangeBackground);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", changeLogo);
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setShowMobileMenu((current) => !current);
  }, []);

  return (
    <nav
      className={
        navbar || showMobileMenu
          ? "fixed z-40 w-full transform bg-white py-5 text-black transition-[padding] duration-200 ease-linear"
          : "duration-600 fixed z-40 mt-5 w-full transform text-white transition-[margin] ease-out lg:mt-[81px]"
      }
    >
      <div className="text-md flex flex-row items-center py-6 lg:px-[205px]">
        <span className="px-4 pr-[21px] font-normal sm:px-4">Eleganza</span>
        <Image
          width={25}
          height={25}
          src={navbar || showMobileMenu ? blacklogo : navbarLogo}
          alt="logo"
        />

        <div className="ml-8 hidden flex-row gap-7 lg:flex lg:w-full">
          <div className="flex justify-start pl-[58px]">
            <NavbarItem label="Women" />
          </div>

          <div className="ml-auto flex justify-center gap-52 ">
            <NavbarItem label="Men" />
            <NavbarItem label="About" />
          </div>

          <div className="ml-auto flex justify-end gap-20">
            {currentUser ? (
              <div onClick={onClick}>
                <NavbarItem label="Logout" onClick={() => signOut()} />
              </div>
            ) : (
              <div onClick={onClick}>
                <NavbarItem label="Login" onClick={loginModal.onOpen} />
              </div>
            )}
            <div onClick={categoryOnClick}>
            <NavbarItem
              label="Create category"
              onClick={categoryModal.onOpen}
            />
            </div>
            <NavbarItem label="Bag" />
          </div>

          <span
            className={
              navbar || showMobileMenu
                ? "-ml-2 h-3 w-3 rounded-full bg-black"
                : "-ml-2 h-3 w-3 rounded-full bg-white"
            }
          ></span>
        </div>

        <div
          onClick={toggleMobileMenu}
          className="relative ml-auto flex cursor-pointer flex-row items-center justify-end gap-2 lg:hidden"
        >
          <p
            className={
              navbar || showMobileMenu
                ? "text-sm text-black"
                : "text-sm text-white"
            }
          >
            {showMobileMenu ? "Close" : "Menu"}
          </p>
          <AiOutlineMenu
            size={25}
            className={
              navbar || showMobileMenu
                ? `text-black transition ${
                    showMobileMenu ? "rotate-180 " : "mr-2 rotate-0"
                  }`
                : `text-white transition ${
                    showMobileMenu ? "rotate-180 " : "mr-2 rotate-0"
                  }`
            }
          />

          <MobileMenu visible={showMobileMenu} onClick={onClick} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
