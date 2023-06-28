import { signOut } from "next-auth/react";
import { useRouter } from "next/router";

import Link from "next/link";

import NavbarItem from "./NavbarItem";

import useLoginModal from "@/hooks/useLoginModal";
import useCurrentUser from "@/hooks/useCurrentUser";

import FadeInAnimation from "../ui/FadeInAnimation";

interface MobileMenuProps {
  visible?: boolean;
  onClick: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ visible, onClick }) => {
  const loginModal = useLoginModal();
  const { data: currentUser } = useCurrentUser();

  const router = useRouter();

  if (!visible) {
    return null;
  }
  return (
    <>
      <FadeInAnimation>
        <div className="absolute right-0 top-8 flex h-screen w-screen flex-col overflow-scroll bg-white py-28">
          <div className="flex flex-col gap-4">
            <div className="mb-4 px-3 text-left text-2xl text-black">
              <Link href={router.pathname != "/" ? "/" : "#women"}>
                <NavbarItem label="Women" />
              </Link>
            </div>
            <div className="mb-4 px-3 text-left text-2xl text-black">
              <Link href={router.pathname != "/" ? "/" : "#men"}>
                <NavbarItem label="Men" />
              </Link>
            </div>

            <div className="mb-4 px-3 text-left text-2xl text-black">
              <Link href={router.pathname != "/" ? "/" : "#general"}>
                <NavbarItem label="General" />
              </Link>
            </div>

            {currentUser ? (
              <div onClick={onClick}>
                <div
                  className="mb-4 px-3 text-left text-sm text-black"
                  onClick={() => signOut()}
                >
                  Logout
                </div>
              </div>
            ) : (
              <div onClick={onClick}>
                <div
                  className="mb-4 px-3 text-left text-sm text-black"
                  onClick={loginModal.onOpen}
                >
                  Login
                </div>
              </div>
            )}

            <div className="mb-4 px-3 text-left text-sm text-black">
              Contact Us
            </div>
            <div className="mb-4 px-3 text-left text-sm text-black">FAQ</div>
            <div className="px-3 text-left text-sm text-black">
              Terms and Conditions
            </div>
          </div>
        </div>
      </FadeInAnimation>
    </>
  );
};

export default MobileMenu;
