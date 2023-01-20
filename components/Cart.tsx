import React, { useState, useEffect } from "react";
import { EventsClient } from "./EventClient";
import { Button } from "./Button";
import {
  Listeners as CartListeners,
  Item,
  ItemSchema,
  Emitters as CartEmitters,
} from "./Cart.schema";

const eventsClient = new EventsClient<CartListeners, CartEmitters>();

export const Cart = () => {
  const [items, setItems] = useState<Item[]>([]);

  const handleRemoveButtonClick = (item: Item) => {
    eventsClient.invoke("removeItemFromCart", item);
  };

  const calculateTotal = (items: Item[]) => {
    let sum = 0.0;
    items.forEach((item) => (sum += item.price));
    return parseFloat(sum.toString()).toFixed(2);
  };

  useEffect(() => {
    eventsClient.on(
      "addItemToCart",
      "addItemToState",
      ({ detail, error }) => {
        if (error) {
          console.error(error);
        } else {
          setItems((current) => [detail, ...current]);
          eventsClient.emit("itemAddedToCart", detail);
        }
      },
      ItemSchema
    );
    eventsClient.on(
      "removeItemFromCart",
      "removeItemFromState",
      ({ detail, error }) => {
        if (error) {
          console.error(error);
        } else {
          setItems((current) => {
            const itemIndex = current.findIndex(
              (itemSearched) => itemSearched.id === detail.id
            );
            if (itemIndex === -1) return [...current];
            current.splice(itemIndex, 1);
            return [...current];
          });
          eventsClient.emit("itemRemovedFromCart", detail);
        }
      },
      ItemSchema
    );
    return () => {
      console.log("removing all listeners");
      eventsClient.removeAll();
    };
  }, []);

  return (
    <div
      style={{
        backgroundColor: "white",
        border: "solid 1px",
        padding: "8px",
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        color: "black",
      }}
    >
      <div
        style={{
          borderBottom: "solid 1px",
          paddingBottom: "8px",
        }}
      >
        <span
          style={{
            textTransform: "uppercase",
            fontWeight: "bold",
          }}
        >
          cart 🛒
        </span>
      </div>
      <ul
        style={{
          listStyle: "none",
          padding: "0",
          margin: "0",
          height: "100%",
          overflowY: "scroll",
        }}
      >
        {items?.length > 0 &&
          items.map((item, index) => (
            <li
              key={item.id + "-" + index}
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
                  width: "100%",
                  justifyContent: "space-between",
                  padding: "8px 0",
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
                  width: "25%",
                  justifyContent: "space-between",
                }}
              >
                <span>{"$" + item.price}</span>
                <Button
                  handleClick={() => handleRemoveButtonClick(item)}
                  text="remove"
                />
              </div>
            </li>
          ))}
      </ul>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <span
          style={{
            fontWeight: "bold",
          }}
        >
          {"$" + calculateTotal(items)}
        </span>
        <Button
          handleClick={() => console.log(`checking out...`)}
          text="checkout"
        ></Button>
      </div>
    </div>
  );
};
