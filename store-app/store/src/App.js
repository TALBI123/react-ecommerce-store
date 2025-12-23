import { useEffect, useState, createContext, useReducer } from "react";
import ProductsInCart from "./component/productsInCart/ProductsInCart.jsx";
import CardSection from "./component/cardSection/CardSection";
import Loader from "./component/loader/Loader";
import Header from "./component/header/Header";
import Card from "./component/card/Card";
import { motion, AnimatePresence } from "motion/react";
import "./App.css";
const BaseUrl = `https://fakestoreapi.com/products`;
export const ProductSection = createContext();
export const ProductInfo = createContext();
const variants = {
  hidden: {
    scale: 0.3,
    opacity: 0,
    y: 40,
    rotate: 30,
  },
  visible: {
    scale: 1,
    opacity: 1,
    y: 0,
    rotate: 0,
  },
  exit: {
    scale: 0,
    opacity: 0,
    y: 40,
  },
};
const intialState = {
  isLoading: false,
  error: false,
  isClickedInCart: false,
  total: 0,
  numberOfItems: 0,
  productClicked: {
    isClickedInProduct: false,
    product: [],
  },
  addProducts: [],
};
export const actionsType = {
  isLoading: "isLoading",
  error: "error",
  productClicked: "productClicked",
  addProducts: "addProducts",
  isClickedInCart: "isClickedInCart",
};
const reducer = (state, action) => {
  const { type } = action;
  // eslint-disable-next-line default-case
  switch (type) {
    case actionsType.isLoading:
      // console.log(type)
      return { ...state, [type]: action.payload };
    case actionsType.error:
      return { ...state, [type]: !state.error };
    case actionsType.productClicked:
      const { product,value } = action.payload;
      return {
        ...state,
        [type]: { product, isClickedInProduct: value },
      };
    case actionsType.isClickedInCart:
      return { ...state, isClickedInCart: !state.isClickedInCart };
    case actionsType.addProducts:
      const { price, product: newProduct } = action.payload;
      const { total, numberOfItems, addProducts: products } = state;
      const updatedProducts = products.some(
        (product) => product.id === newProduct.id
      )
        ? products.map((product) =>
            product.id === newProduct.id
              ? { ...product, contity: product.contity + 1 }
              : product
          )
        : [...products, { ...newProduct, contity: 1 }];
      return {
        ...state,
        total: +(total + price).toFixed(2),
        numberOfItems: numberOfItems + 1,
        [type]: updatedProducts,
        productClicked: {
          ...state.productClicked, 
          product: updatedProducts.find(
            (product) => product.id === newProduct.id
          ),
        },
      };
    case actionsType.deleteProduct:
      const {
        total: totalAmount,
        numberOfItems: items,
        addProducts: Products,
      } = state;
      const { id, price: deletedProductPrice } = action.payload;
      const updatedDeltedProducts = Products.reduce(
        (acc, product) =>
          product.id === id
            ? product.contity > 1
              ? [...acc, { ...product, contity: product.contity - 1 }]
              : acc
            : [...acc, product],
        []
      );
      return {
        ...state,
        total: +(totalAmount - deletedProductPrice).toFixed(2),
        numberOfItems: items - 1,
        addProducts: updatedDeltedProducts,
        productClicked: {
          ...state.productClicked,
          product: updatedDeltedProducts.find((product) => product.id === id),
        },
      };
    case actionsType.deleteAllProducts:
      console.log(state);
      return { ...state, total: 0, numberOfItems: 0, addProducts: [] };
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, intialState);
  const [category, setCategory] = useState("electronics");
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const { error, isLoading, ...rest } = state;
  const limit = 4;
  useEffect(() => {
    const controller = new AbortController();
    const getData = async (param, setState) => {
      try {
        dispatch({ type: actionsType.isLoading, payload: true });

        const resp = await fetch(`${BaseUrl}/${param}`, {
          signal: controller.signal,
        });
        const json = await resp.json();
        setState(json);
        dispatch({ type: actionsType.isLoading, payload: false });
        setPage(1);
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error(error, "e");
          dispatch({ type: actionsType.isLoading, payload: false });
        }
      }
    };
    getData("categories", setCategories);
    getData(`category/${category}`, setProducts);
    return () => {
      controller.abort();
    };
  }, [category]);
  const startIndex = (page - 1) * limit;
  const paginateProducts = products.slice(startIndex, startIndex + limit);
  const numberOfPage = products.length % limit ? products.length % limit : 1;
  // console.log(state);
  // console.log(isLoading)
  return (
    <ProductInfo.Provider value={[{ ...rest }, dispatch]}>
      <div className={`App center`}>
        <Header setIsClickedInCart={dispatch} />
        {error ? (
          <div className="alert center">{"Failed To Fetch Data"}</div>
        ) : isLoading ? (
          <Loader />
        ) : !state.productClicked.isClickedInProduct ? (
          <section className="home center">
            <div className="categories center">
              <div className="btns center">
                {categories.map((elm, index) => (
                  <div
                    key={index}
                    className="btn center saira"
                    onClick={() => setCategory(elm)}
                  >
                    {elm}
                  </div>
                ))}
              </div>
            </div>
            <div className="cards center">
              <div className="container">
                {paginateProducts.map((product) => (
                  <Card
                    key={product.id}
                    product={product}
                    clickInBuy={() =>
                      dispatch({
                        type: actionsType.addProducts,
                        payload: { price: product.price, product },
                      })
                    }
                    handleClickInCard={() => {
                      console.log(product.id, state.addProducts);
                      dispatch({
                        type: actionsType.productClicked,
                        payload: {
                          value:true,
                          product: {
                            ...product,
                            contity: state.addProducts.find(
                              (newProduct) => newProduct?.id === product?.id
                            )?.contity || 0,
                          },
                        },
                      });
                    }}
                  />
                ))}
              </div>
            </div>
            <div
              className="btns-pages center"
              style={{ width: 60 * numberOfPage + "px" }}
            >
              {Array.from({ length: numberOfPage }, (_, index) => (
                <motion.div
                  variants={variants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  key={index}
                  className={`center anton ${
                    index === page - 1 && "is-clicked"
                  }`}
                  onClick={() => setPage(index + 1)}
                >
                  {index + 1}
                </motion.div>
              ))}
            </div>
          </section>
        ) : (
          <ProductSection.Provider value={[state, dispatch]}>
            <CardSection />
          </ProductSection.Provider>
        )}
        <AnimatePresence>
          {state.isClickedInCart && <ProductsInCart />}
        </AnimatePresence>
      </div>
    </ProductInfo.Provider>
  );
}
export default App;