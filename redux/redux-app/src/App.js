import "./App.css";
import { useSelector } from "react-redux";
import Error from "./Error";
import Card from "./Card";
import { AnimatePresence } from "motion/react";
import { motion } from "motion/react";
import Product from "./Product";
import { useState } from "react";
function App() {
  const { totale, items } = useSelector((state) => state);
  const [isClickedInCart, setClickedInCart] = useState(true);
  // utils/importAllImages.js
  const importAllImages = (context) =>
    context.keys().map((key) => context(key));
  const imgs = importAllImages(
    require.context("./imgs", false, /\.(png|jpe?g|avif)$/)
  );
  console.log(require.context("./imgs", false, /\.(png|jpe?g|avif)$/));
  const arr = [
    { name: "MacBook", price: 1000},
    { name: "iphone 13", price: 500},
    { name: "samsung s22", price: 120},
    { name: "hp", price: 540},
    { name: "lenovo", price: 300 },
  ];
  const animate = {
    hidden: {
      y: "-100%",
      opacity: 0,
    },
    visibilty: {
      y: 0,
      opacity: 1,
    },
    exit: {
      y: "-100%",
      opacity: 0,
    },
  };
  return (
    <div className="App">
      <motion.header
        variants={animate}
        initial="hidden"
        animate="visibilty"
        exit="exit"
        transition={{ duration: 1 }}
      >
        <div>Redux Shopping App</div>
        <div
          className="center cursor"
          onClick={() => setClickedInCart((isClicked) => !isClicked)}
        >
          cardt : {items} items
        </div>
      </motion.header>
      {/* <AnimatePresence>{}</AnimatePresence> */}
      <section>
        <div className="content center">
          <div className="container center">
            {arr.map((elm, index) => (
              <Card
                key={index}
                name={elm.name}
                price={elm.price}
                src={imgs[index]}
                index={index}
              />
            ))}
          </div>
          <div className="totale center">Total: {totale}</div>
        </div>
        <AnimatePresence>{isClickedInCart && <Product />}</AnimatePresence>
      </section>
    </div>
  );
}
export default App;