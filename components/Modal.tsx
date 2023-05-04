import { useCallback } from "react";

import { AiOutlineClose } from "react-icons/ai";

import Button from "./Button";

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

  return (
    <>
      {/* relative w-full inset-0 lg:w-3/6 my-6 mx-auto lg:max-w-3xl h-full lg:h-auto z-10 */}

      <div className="fixed flex justify-center items-center w-full inset-0 lg:w-3/6 my-6 mx-auto lg:max-w-3xl h-full lg:h-auto z-50">
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
      </div>
    </>
  );
};

export default Modal;
