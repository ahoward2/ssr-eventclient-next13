import React from "react";
import styled from "styled-components";
import AddToCartButton from "./AddToCartButton";
import { Item } from "./Cart.schema";

export const ItemList = ({
  items,
  handleAddToCart,
}: {
  items: Item[];
  handleAddToCart: (item: Item) => void;
}) => {
  return (
    <div
      style={{
        backgroundColor: "white",
        padding: "8px",
        height: "100%",
        width: "100%",
        color: "black",
      }}
    >
      <ul
        style={{
          listStyle: "none",
          padding: "0",
          margin: "0",
        }}
      >
        {items.map((item) => (
          <li
            key={item.id}
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
              padding: "8px 0",
            }}
          >
            <div
              style={{
                display: "flex",
                width: "75%",
                flexDirection: "column",
              }}
            >
              <span
                style={{
                  fontWeight: "bold",
                }}
              >
                {item.name}
              </span>
              <span
                style={{
                  fontWeight: "bold",
                }}
              >
                {item.description}
              </span>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyItems: "end",
              }}
            >
              <span>{"$" + item.price}</span>
              <AddToCartButton item={item} handleClick={handleAddToCart} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
