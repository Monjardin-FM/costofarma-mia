import { Product } from "../entities/product";

export type NewOrderRepository = {
  getProduct(params: { description: string }): Promise<Product[]>;
};
