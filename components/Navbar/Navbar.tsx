import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";

import Image from "next/image";
import Link from "next/link";

import NavbarItem from "./NavbarItem";
import MobileMenu from "./MobileMenu";

import useLoginModal from "@/hooks/useLoginModal";
import useCurrentUser from "@/hooks/useCurrentUser";
import useProductModal from "@/hooks/Products/useProductModal";
import useCart from "@/hooks/useCart";

import { ShoppingBag } from "lucide-react";
import blacklogo from "../../public/images/black-logo.png";
import whitelogo from "../../public/images/logo.png";

import { AiOutlineMenu } from "react-icons/ai";

const TOP_OFFSET = 66;

const Navbar = () => {
  const [navbar, setNavbar] = useState(false);
  const [navbarLogo, setNavbarLogo] = useState(whitelogo);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [cartItems, setCartItems] = useState(0);

  const router = useRouter();
  const loginModal = useLoginModal();
  
  const { data: currentUser } = useCurrentUser();
  const { data: session, status } = useSession();

  const productModal = useProductModal();

  const cart = useCart();

  const onClick = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    router.push("/");
  }, [currentUser, loginModal, router]);

  const productOnClick = useCallback(() => {
    return productModal.onOpen();
    router.push("/");
  }, []);

  const changeChangeBackground = () => {
    if (window.scrollY >= TOP_OFFSET) {
      setNavbar(true);
      setNavbarLogo(blacklogo);
    } else {
      setNavbar(false);
      setNavbarLogo(whitelogo);
    }
  };

  useEffect(() => {
    setCartItems(cart.items.length);
    window.addEventListener("scroll", changeChangeBackground);
  }, [cart]);

  const toggleMobileMenu = useCallback(() => {
    setShowMobileMenu((current) => !current);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <nav
      className={
        navbar || showMobileMenu
          ? "fixed z-40 w-full transform bg-white py-5 text-black transition-[padding] duration-200 ease-linear"
          : "duration-600 fixed z-40 mt-5 w-full transform text-white transition-[margin] ease-out lg:mt-[81px]"
      }
    >
      <div className="text-md flex flex-row items-center py-6 lg:px-6 xl:px-[205px]">
        <Link href="/" scroll={false}>
          <div onClick={scrollToTop} className="flex flex-row items-center">
            <span className="px-4 pr-[21px] font-normal sm:px-4">Eleganza</span>
            <Image
              width={25}
              height={25}
              src={navbar || showMobileMenu ? blacklogo : navbarLogo}
              alt="logo"
            />
          </div>
        </Link>
        <div className="ml-8 hidden flex-row gap-7 lg:flex lg:w-full">
          <div className="flex justify-start pl-[58px]">
            <Link href={router.pathname != "/" ? "/" : "#women"} scroll={false}>
              <NavbarItem label="Women" />
            </Link>
          </div>

          <div className="ml-auto flex justify-center gap-52 ">
            <Link href={router.pathname != "/" ? "/" : "#men"} scroll={false}>
              <NavbarItem label="Men" />
            </Link>
            <Link
              href={router.pathname != "/" ? "/" : "#general"}
              scroll={false}
            >
              <NavbarItem label="General" />
            </Link>
          </div>

          <div className="ml-auto flex justify-end gap-20">
            {currentUser ? (
              <div className="flex gap-x-20">
                <div onClick={onClick}>
                  <NavbarItem label="Logout" onClick={() => signOut()} />
                </div>

                <div
                  className="flex whitespace-nowrap"
                  onClick={productOnClick}
                >
                  {session?.user?.name === "admin" ? (
                    <NavbarItem
                      label="+ Product"
                      onClick={productModal.onOpen}
                    />
                  ) : (
                    ""
                  )}
                </div>

                <div
                  onClick={() => router.push("/cart")}
                  className="flex items-center gap-x-4 cursor-pointer"
                >
                  <ShoppingBag
                    size={20}
                    color={navbar || showMobileMenu ? "black " : "white "}
                  />
                  <span
                    className={
                      navbar || showMobileMenu
                        ? "-ml-2 text-sm font-medium text-black"
                        : "-ml-2 text-sm font-medium text-white"
                    }
                  >
                    {cartItems}
                  </span>
                </div>
              </div>
            ) : (
              <div onClick={onClick}>
                <NavbarItem label="Login" onClick={loginModal.onOpen} />
              </div>
            )}
          </div>
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
