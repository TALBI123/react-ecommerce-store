import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import "./card.css";
export default function Card({ product, clickInBuy,handleClickInCard}) {
  const { id, image: srcImg, title, price } = product;
  const [aspectRatio, setAspectRatio] = useState();
  const variants = {
    hidden: {
      scale: 0.7,
      opacity: 0,
    },
    visible: {
      scale: 1,
      opacity: 1,
    },
    exit: {
      scale: 0.7,
      opacity: 0,
    },
  };
  const getAspectRatio = () => {
    return new Promise((res, rej) => {
      const img = new Image();
      img.crossOrigin = "Anonymous";
      img.src = srcImg;
      img.onload = () => {
        const width = img.naturalWidth;
        const height = img.naturalHeight;
        const aspectRatio = width / height;
        res(aspectRatio);
      };
      img.onerror = () => rej("Failed to fetch image");
    });
  };
  useEffect(() => {
    getAspectRatio()
      .then((aspectRatioValue) => setAspectRatio(aspectRatioValue))
      .catch((errMes) => new Error(errMes));
    // return () => console.log(aspectRatio);
  }, []);
  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate="visible"
      exit="exit"
      transition={{ duration: 1, delay: 0.18 }}
      className="card"
      key={id}
    >
      <div className="img center"  onClick={handleClickInCard}>
        <img
          src={srcImg}
          style={{ width: aspectRatio < 1 ? "50%" : "70%" }}
          alt=""
        />
      </div>
      <div className="product">
        <div className="text">
          <h6 className="russo">{title} </h6>
          <h1 className="anton">{price} $</h1>
        </div>
        <div className="btn-add-product center saira" onClick={clickInBuy}>
          <FontAwesomeIcon icon={faCartShopping} /> <span>Buy Now</span>
        </div>
      </div>
    </motion.div>
  );
}