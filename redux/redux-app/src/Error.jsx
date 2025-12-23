import "./App.css";
import { motion } from "motion/react";
const error = {
  hidden: {
    opacity: 0,
    x: "150%",
  },
  visible: {
    opacity: 1,
    x: 0,
  },
  exit: {
    opacity: 0,
    x: "150%",
  },
};
export default function Card() {
  return (
      <motion.div
        className="error center"
        variants={error}
        initial="hidden"
        animate="visible"
        exit="exit"
        transition={{ duration: 1 }}
      >
        <h5>Error to fetch data</h5>
      </motion.div>
  );
}
