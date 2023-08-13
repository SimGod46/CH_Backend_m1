import { persistance } from "../config/app.config.js";

let productsPersist;
let cartsPersist;

console.log(`Persistencia en: ${persistance}`);
switch (persistance) {
  case "MONGO":
    productsPersist = await import("./mongo/products.mongo.js");
    cartsPersist = await import("./mongo/carts.mongo.js");
    break;
  
  case "MEMORY":
    productsPersist = await import("./memory/products.memory.js");
    cartsPersist = await import("./memory/carts.memory.js");
    break;

  case "FILES":
    productsPersist = await import("./files/products.file.js");
    cartsPersist = await import("./files/carts.file.js");
    break;
}

export { productsPersist, cartsPersist};