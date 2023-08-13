import ProductsRepository from "./products.repository.js"
import CartsRepository from "./carts.repository.js";
import { productsPersist, cartsPersist } from "../DAO/factory.js";

const productsServices = new ProductsRepository(new productsPersist.default());
const cartsServices = new CartsRepository(new cartsPersist.default());

export {productsServices, cartsServices};