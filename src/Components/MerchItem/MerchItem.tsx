import { useState } from "react";
import "./MerchItem.css";
import PhotoCarousel from "../PhotoCarousel/PhotoCarousel";
import { IcartItem } from "../../types";

interface MerchItemProps {
  product: IcartItem;
  addToCart: (item: IcartItem) => void;
}

const MerchItem: React.FC<MerchItemProps> = ({ product, addToCart }) => {
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");

  const hasVariants =
    (product.availableSizes && product.availableSizes.length > 0) ||
    (product.availableColors && product.availableColors.length > 0);

  const needsSize = product.availableSizes && product.availableSizes.length > 0;
  const needsColor = product.availableColors && product.availableColors.length > 0;

  const canAddToCart =
    (!needsSize || selectedSize) && (!needsColor || selectedColor);

  const handleAddToCart = () => {
    if (!canAddToCart) return;

    const itemToAdd: IcartItem = {
      ...product,
      selectedSize: selectedSize || undefined,
      selectedColor: selectedColor || undefined,
    };
    addToCart(itemToAdd);

    // Reset selections after adding
    setSelectedSize("");
    setSelectedColor("");
  };

  return (
    <div className="mainMerchItemDiv">
      <div className="merchImageDiv">
        <PhotoCarousel photos={product.photos} alt={product.name} />
      </div>
      <div className="titleAndBtns">
        <h1 className="merchItemName">{product.name}</h1>
        <p className="merchItemPrice">${product.price}</p>

        {hasVariants && (
          <div className="variantSelectors">
            {needsSize && (
              <div className="variantGroup">
                <label className="variantLabel">Size:</label>
                <div className="variantButtons">
                  {product.availableSizes!.map((size) => (
                    <button
                      key={size}
                      className={`variantBtn ${selectedSize === size ? "selected" : ""}`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {needsColor && (
              <div className="variantGroup">
                <label className="variantLabel">Color:</label>
                <div className="variantButtons">
                  {product.availableColors!.map((color) => (
                    <button
                      key={color}
                      className={`variantBtn colorBtn ${selectedColor === color ? "selected" : ""}`}
                      onClick={() => setSelectedColor(color)}
                      data-color={color.toLowerCase()}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        <div className="merchItemBtnDiv">
          <button
            className={`merchItemBtn ${!canAddToCart ? "disabled" : ""}`}
            onClick={handleAddToCart}
            disabled={!canAddToCart}
          >
            {canAddToCart ? "Add To Cart" : "Select Options"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MerchItem;
