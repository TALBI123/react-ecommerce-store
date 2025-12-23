import { motion } from "motion/react";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { AnimatePresence } from "motion/react";
export default function Product() {
  const products = useSelector((state) => state.products);
  const state = useSelector((state) => state);
  const set = useDispatch();
  console.log(state);
  return (
    <motion.div
      className="product-table "
      layout
      initial={{ maxWidth: "0px", scaleX: 0, opacity: 0 }}
      animate={{ maxWidth: "260px", scaleX: 1, opacity: 1 }}
      exit={{ maxWidth: "0px", scaleX: 0, opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <AnimatePresence>
        {products.length ? (
          products.map((product, index) => (
            <motion.div
              key={index}
              className="product-section"
              initial={{ x: (index % 2 ? 1 : -1) * 80 + "%", opacity: 0 }}
              animate={{ x: "0%", opacity: 1 }}
              exit={{ x: (index % 2 ? 1 : -1) * 80 + "%", opacity: 0 }}
              transition={{ duration: .5 }}
            >
              <img
                className="product-img"
                src={product.src}
                alt={`${product.name} img`}
              />
              <span className="product-name">{product.name} </span>
              <span>{product.price}$ </span>
              <div className="contity">
                <div
                  className="btn-click center"
                  onClick={() =>
                    set({
                      type: "delete",
                      payload: {
                        sell: product.price,
                        product: {
                          name: product.name,
                          price: product.price,
                        },
                      },
                    })
                  }
                >
                  -
                </div>
                <div
                  className="btn-click center"
                  onClick={() =>
                    set({
                      type: "add",
                      payload: {
                        ...state.product,
                        buy: product.price,
                        product: { name: product.name, price: product.price },
                      },
                    })
                  }
                >
                  +
                </div>
                <span>{product.contity} </span>
              </div>
            </motion.div>
          ))
        ) : (
          <motion.h1
          className="no-result"
            initial={{ y: "-70%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            exit={{ y: "-70%", opacity: 0 }}
            transition={{ duration: 0.4, ease: "linear" }}
          >
            No Result
          </motion.h1>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
