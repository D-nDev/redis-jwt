import { setRedisTime } from "./RedisClient";

export async function cartalreadyexists(
  id: number,
  tokenid: number,
  cart: string
) {
  const jsoncart = JSON.parse(cart);
  const productisincart = jsoncart.findIndex(
    (product: any) => product.id == id
  );
  if (productisincart != -1) {
    jsoncart[productisincart].quantity += 1;
  } else {
    jsoncart.push({ id: id, quantity: 1 });
  }
  setRedisTime(`cart-${tokenid}`, JSON.stringify(jsoncart), 604800);
  return;
}

export async function cartdoesntexists(id: number, tokenid: number) {
  setRedisTime(
    `cart-${tokenid}`,
    JSON.stringify([{ id: id, quantity: 1 }]),
    604800
  );
  return;
}
