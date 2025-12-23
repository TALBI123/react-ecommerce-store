import { useDispatch, useSelector } from "react-redux";
import "./App.css";
export default function Card({ name, price,src }) {
  const disp = useDispatch();
  const states = useSelector((state) => state);
  return (
    <div className="card center">
      <img className="area" src={src}alt=""/>
      <h5>{name}</h5>
      <p>{price}$</p>
      <div
        className="btn center"
        onClick={() =>
          disp({
            type: "add",
            payload: {
              ...states.payload,
              buy: price,
              product: { name, price,src },
            },
          })
        }
      >
        Add to cart
      </div>
    </div>
  );
}
