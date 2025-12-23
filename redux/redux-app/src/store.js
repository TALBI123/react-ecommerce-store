import { createStore } from "redux";
const reducer = (state = { totale: 0, items: 0, products: [] }, action) => {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case "add":
      const {src, name, price } = action.payload.product;
      const { buy } = action.payload;

      return {
        ...state,
        totale: state.totale + buy,
        items: state.items + 1,
        products: state.products.some((product) => product.name === name)
          ? state.products.map((product) =>
              product.name === name
                ? { ...product, contity: product.contity + 1 }
                : product
            )
          : [...state.products, { src,name, price, contity: 1 }],
      };
    case "delete":
      const { sell } = action.payload;
      const { name: nameProduct } = action.payload.product;
      console.log(nameProduct);
      return {
        ...state,
        totale: state.totale - sell,
        items: state.items - 1,
        products: state.products.reduce((acc, product) =>
          product.name === nameProduct && product.contity > 1
            ? [...acc, { ...product, contity: product.contity - 1 }]
            : product.name === nameProduct
            ? acc
            : [...acc, { ...product }]
        ,[]),
      };
    default:
      return state;
  }
};
export const store = createStore(reducer);
