import { Item } from "./Cart.schema";
import React from "react";
import styled from "styled-components";

const AddToCartButton = ({
  item,
  handleClick,
}: {
  item: Item;
  handleClick: (item: Item) => void;
}) => {
  return (
    <button
      style={{ width: "100%", height: "24px" }}
      onClick={() => handleClick(item)}
    >
      add to cart
    </button>
  );
};

export default AddToCartButton;
