import ProductsRepository from "./products.repository.js"
import { productsPersist } from "../DAO/factory.js";

const productsServices = new ProductsRepository(productsPersist);

export {productsServices};