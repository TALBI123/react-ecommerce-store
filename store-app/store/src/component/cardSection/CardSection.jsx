import { useContext } from "react";
import "./cardSection.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { actionsType, ProductSection } from "../../App";
import { motion } from "motion/react";
const variants = {
  hidden: {
    y: 60,
    opacity: 0,
  },
  visibilty: {
    y: 0,
    opacity: 1,
  },
  exit: {
    y: 60,
    opacity: 0,
  },
};
export default function CardSection() {
  const [state, dispatch] = useContext(ProductSection);
  const { product } = state.productClicked;
  console.log("hello zmer");
  const { id, image: srcImg, title, description, price, contity } = product;
  return (
    <section className="card-section center">
      <motion.div
        className="img center"
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.7, opacity: 0 }}
        transition={{ duration: 1 }}
      >
        <img src={srcImg} alt="" />
      </motion.div>
      <div className="details center">
        <motion.h5
          variants={variants}
          initial="hidden"
          animate="visibilty"
          exit="exit"
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          {title}{" "}
        </motion.h5>
        <motion.h1
          variants={variants}
          initial="hidden"
          animate="visibilty"
          exit="exit"
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          {price} $
        </motion.h1>
        <motion.div
          variants={variants}
          initial="hidden"
          animate="visibilty"
          exit="exit"
          transition={{ duration: 0.7, delay: 0.6 }}
          className="container"
        >
          <div className="btns-inc-dec center">
            <div
              className="center btn"
              onClick={() =>
                dispatch({
                  type: actionsType.deleteProduct,
                  payload: { id, price },
                })
              }
            >
              <FontAwesomeIcon icon={faMinus} />
            </div>
            <h4>{contity}</h4>
            <div
              className="center btn"
              onClick={() =>
                dispatch({
                  type: actionsType.addProducts,
                  payload: { price, product },
                })
              }
            >
              <FontAwesomeIcon icon={faPlus} />
            </div>
          </div>
          <div
            className="add-to-cart center"
            onClick={() =>
              dispatch({
                type: actionsType.addProducts,
                payload: { price, product },
              })
            }
          >
            Add To Cart
          </div>
        </motion.div>
        <motion.p
          variants={variants}
          initial="hidden"
          animate="visibilty"
          exit="exit"
          transition={{ duration: 0.7, delay: 0.8 }}
          className="saira"
        >
          {description}
        </motion.p>
      </div>
    </section>
  );
}
