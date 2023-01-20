import { EventsClient } from "@/components/EventClient";
import { useEffect } from "react";
import { Listeners, Emitters, Item } from "@/components/Cart.schema";
import { Cart } from "@/components/Cart";
import { items } from "@/components/Items";
import { ItemList } from "@/components/ItemList";

const client = new EventsClient<Emitters, Listeners>();

export default function Page({ res }: { res: { name: string } }) {
  const handleAddToCart = ({ name, description, price }: Item) => {
    client.emit("addItemToCart", {
      id: Date.now(),
      name,
      description,
      price,
    });
  };

  useEffect(() => {
    client.removeAll();
    client.on("itemAddedToCart", "logDetails", ({ detail }) => {
      console.log("item added to cart", detail);
    });

    return () => {
      client.removeAll();
    };
  }, []);

  return (
    <div style={{ display: "flex" }}>
      <ItemList items={items} handleAddToCart={handleAddToCart} />
      <Cart />
    </div>
  );
}

export async function getServerSideProps() {
  const res = await Promise.resolve({
    json: () => Promise.resolve({ name: "iPhone 12" }),
  });

  return {
    props: {
      res: await res.json(),
    },
  };
}
