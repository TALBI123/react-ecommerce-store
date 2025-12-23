import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShop } from "@fortawesome/free-solid-svg-icons";
import { ProductInfo } from "../../App";
import { useContext } from "react";
import "./header.css";
import { actionsType } from "../../App";
export default function Header({ setIsClickedInCart: dispatch }) {
  const [state] = useContext(ProductInfo);
  const { numberOfItems } = state;
  return (
    <header className="App-header center">
      <ul>
        <li
          onClick={() =>
            dispatch({
              type: actionsType.productClicked,
              payload: { product: [], value: false },
            })
          }
        >
          <FontAwesomeIcon icon={faShop} /> Shop
        </li>
        <li
          className="center"
          onClick={() => dispatch({ type: actionsType.isClickedInCart })}
        >
          <FontAwesomeIcon icon={faCartShopping} />
          <span className="center">{numberOfItems} </span>
        </li>
      </ul>
    </header>
  );
}
