export const fadeUp = {
  initial: {
    opacity: 0,
    y: 30
  },

  whileInView: {
    opacity: 1,
    y: 0
  },

  transition: {
    duration: 0.6
  },

  viewport: {
    once: true,
    amount: 0.15
  }
};

export const staggerContainer = {
  hidden: {},

  show: {
    transition: {
      staggerChildren: 0.08
    }
  }
};

export const staggerItem = {
  hidden: {
    opacity: 0,
    y: 24
  },

  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55
    }
  }
};

export const springTransition = {
  type: "spring",
  stiffness: 180,
  damping: 18
};