import "./productsInCart.css";
import { ProductInfo } from "../../App";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { AnimatePresence, motion } from "motion/react";
import { actionsType } from "../../App";
export default function ProductsInCart() {
  const [{ addProducts: products, total }, dispatch] =
    useContext(ProductInfo);
  console.log(products);
  return (
    <motion.section
      initial={{
        maxWidth: 100,
        opacity: 0,
        scaleX: 0,
      }}
      animate={{
        maxWidth: 300,
        opacity: 1,
        scaleX: 1,
      }}
      exit={{
        maxWidth: 0,
        opacity: 0,
        scaleX: 0,
      }}
      transition={{
        maxWidth: { duration: 2, ease: "easeInOut" },
        opacity: { duration: 0.7 },
        scaleX: { duration: 1 },
      }}
      className="cart center"
    >
      <div className="container-to-center">
        <AnimatePresence>
          {products.map((product, index) => (
            <motion.div
              key={index}
              initial={{
                x: 100 * (index % 2 ? 1 : -1) + "%",
                opacity: 0,
              }}
              animate={{
                x: "0%",
                opacity: 1,
              }}
              exit={{
                scale: 0.7,
                opacity: 0,
              }}
              transition={{ duration: 1 }}
            >
              <div className="img">
                <img src={product.image} alt="" />
              </div>
              <div className="content-card">
                <h6 style={{ fontSize: 7 }} className="saira">
                  {product.title.split(" ").slice(0, 3).join(" ")}
                </h6>
                <h3 className="saira">{product.price}$ </h3>
              </div>
              <div className="btns-inc-dec center">
                <div
                  className="center new-btn"
                  onClick={() =>
                    dispatch({
                      type: actionsType.deleteProduct,
                      payload: { id: product.id, price: product.price },
                    })
                  }
                >
                  <FontAwesomeIcon icon={faMinus} />
                </div>
                <h6 className="center saira">{product.contity}</h6>
                <div
                  className="center new-btn"
                  onClick={() =>
                    dispatch({
                      type: actionsType.addProducts,
                      payload: { price: product.price, product },
                    })
                  }
                >
                  <FontAwesomeIcon icon={faPlus} />
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <div className="btn-trash center" onClick={() => dispatch({type:actionsType.deleteAllProducts})}>
        <FontAwesomeIcon icon={faTrash} />
      </div>
      <div className="content">
        <div className="center">Total : {total}$</div>
        <div
          className="center close"
          onClick={() => dispatch({ type: actionsType.isClickedInCart })}
        >
          close
        </div>
      </div>
    </motion.section>
  );
}
