import FadeInAnimation from "../ui/FadeInAnimation";

interface MobileMenuProps {
  visible?: boolean;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ visible }) => {
  if (!visible) {
    return null;
  }
  return (
    <>
      <FadeInAnimation>
        <div className="absolute right-0 top-8 flex h-screen w-screen flex-col overflow-scroll bg-white py-28">
          <div className="flex flex-col gap-4">
            <div className="mb-4 px-3 text-left text-2xl text-black">Women</div>
            <div className="mb-4 px-3 text-left text-2xl text-black">Men</div>
            <div className="mb-10 px-3 text-left text-2xl text-black">
              About
            </div>

            <div className="mb-4 px-3 text-left text-sm text-black">Login</div>
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
