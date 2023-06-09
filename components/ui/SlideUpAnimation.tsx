import { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const SlideUpAnimation: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const mainControls = useAnimation();

  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });
  useEffect(() => {
    if (inView) {
      mainControls.start({
        y: 0,
        transition: {
          duration: 1,
        },
      });
    }

    if (!inView) {
      mainControls.start({ y: "100vh" });
    }
  }, [inView]);

  return (
    <div ref={ref}>
      <motion.div animate={mainControls}>{children}</motion.div>
    </div>
  );
};

export default SlideUpAnimation;
