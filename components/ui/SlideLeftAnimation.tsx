import { motion } from "framer-motion";

const SlideLeftAnimation: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (

      <>
      <motion.div
        initial={{ opacity: 0, x: "-100vh" }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ type: "spring", duration: 1 }}
      >
        {children}
      </motion.div>
      </>

  );
};

export default SlideLeftAnimation;
