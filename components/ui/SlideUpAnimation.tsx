import { motion } from "framer-motion";

const SlideUpAnimation: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: "100vh" }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", duration: 1 }}
      >
        {children}
      </motion.div>
    </>
  );
};

export default SlideUpAnimation;
