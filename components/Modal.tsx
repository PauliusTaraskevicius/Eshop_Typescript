import { useCallback } from "react";

import { AiOutlineClose } from "react-icons/ai";

import Button from "./Button";

import { motion } from "framer-motion";

interface ModalProps {
  isOpen?: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title?: string;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  actionLabel: string;
  disabled?: boolean;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  body,
  footer,
  actionLabel,
  disabled,
}) => {
  const handleClose = useCallback(() => {
    if (disabled) {
      return;
    }

    onClose();
  }, [onClose, disabled]);

  const handleSubmit = useCallback(() => {
    if (disabled) {
      return;
    }

    onSubmit();
  }, [onSubmit, disabled]);

  if (!isOpen) {
    return null;
  }

  const popUp = {
    hidden: {
      // y: "-100vh",
      scale: 0,
      // opacity: 0,
    },
    visible: {
      // y: "0",
      scale: 1.1,
      // opacity: 1,
      transition: {
        duration: 0.5,
        type: "spring",
        damping: 100,
        stiffness: 500,
      },
    },
    exit: {
      // y: "100vh",
      scale: 0,
      // opacity: 0,
    },
  };

  return (
    <>
      {/* relative w-full inset-0 lg:w-3/6 my-6 mx-auto lg:max-w-3xl h-full lg:h-auto z-10 */}

      <motion.div
        onClick={(e) => e.stopPropagation()}
        variants={popUp}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="fixed flex justify-center items-center w-full inset-0 lg:w-3/6 my-6 mx-auto lg:max-w-3xl h-full lg:h-auto z-50"
      >
        <div
          className="h-full
            lg:h-auto
            border-0 
            rounded-lg 
            shadow-lg 
            relative 
            flex 
            flex-col 
            w-full 
            bg-black 
            outline-none 
            focus:outline-none
            overflow-y-scroll
            lg:overflow-y-hidden
            "
        >
          <div
            className=" flex 
              items-center 
              justify-between 
              p-10 
              rounded-t"
          >
            <h3 className="text-3xl font-semibold text-white">{title}</h3>
            <button
              className="
                  p-1 
                  ml-auto
                  border-0 
                  text-white 
                  hover:opacity-70
                  transition
                "
              onClick={handleClose}
            >
              <AiOutlineClose size={20} />
            </button>
          </div>
          <div className="relative p-10 flex-auto">{body}</div>
          <div className="flex flex-col gap-2 p-10">
            <Button
              disabled={disabled}
              label={actionLabel}
              secondary
              fullWidth
              large
              onClick={handleSubmit}
            />
            {footer}
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Modal;
