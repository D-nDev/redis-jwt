import { setRedisTime } from "./RedisClient";

export async function removefromcart(
  id: number,
  tokenid: number,
  cart: string,
  quantity: any = "all"
) {
  const jsoncart = JSON.parse(cart);
  const productisincart = jsoncart.findIndex(
    (product: any) => product.id == id
  );
  if (productisincart != -1) {
    if (quantity == "all") {
      jsoncart.splice(productisincart, 1);
    } else {
      if (jsoncart[productisincart].quantity == quantity) {
        jsoncart.splice(productisincart, 1);
      } else {
        jsoncart[productisincart].quantity -= quantity;
      }
    }
  } else {
    throw "itemnotfound";
  }
  setRedisTime(`cart-${tokenid}`, JSON.stringify(jsoncart), 604800);
  return;
}
