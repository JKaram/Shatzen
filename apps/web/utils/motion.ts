export const pageTransitionVariants = {
  initial: {
    opacity: 1,
    x: -100,
  },
  animate: {
    opacity: 1,
    x: 0,
  },
};

export const modalTransitionVariants = {
  initial: {
    opacity: 50,
    x: -100,
  },
  animate: {
    opacity: 1,
    x: 0,
  },
};

export const slideIn = (direction, type, delay, duration) => ({
  hidden: {
    x: direction === "left" ? "-100%" : direction === "right" ? "30%" : 0,
    y: direction === "up" ? "100%" : direction === "down" ? "100%" : 0,
    opacity: 0,
  },
  show: {
    x: 0,
    y: 0,
    opacity: 1,
    transition: {
      type,
      delay,
      duration,
      ease: "easeOut",
    },
  },
});
