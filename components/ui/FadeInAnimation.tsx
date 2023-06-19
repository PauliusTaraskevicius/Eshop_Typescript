import { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const FadeInAnimation: React.FC<{ children: React.ReactNode }> = ({
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
        opacity: 1,
        transition: {
          duration: 3,
        },
      });
    }

    if (!inView) {
      mainControls.start({ opacity: 0 });
    }
  }, [inView]);
  return (
    <div ref={ref}>
      <motion.div animate={mainControls}>{children}</motion.div>
    </div>
  );
};

export default FadeInAnimation;
