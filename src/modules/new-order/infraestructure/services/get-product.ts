import { api } from "../../../../utils/api";
import { verifyResponse } from "../../../../utils/check-response";
import { token } from "../../../../utils/token";
import { Product } from "../../domain/entities/product";
import { NewOrderRepository } from "../../domain/repositories/new-order-repository";

export const getProductService: NewOrderRepository["getProduct"] = async (
  params
) => {
  const response = await api().get("Catalog/Product", {
    headers: {
      Authorization: `Bearer ${token()}`,
      "Content-Type": "application/json",
    },
    searchParams: params,
  });
  const { body } = await verifyResponse({ response });
  const data = body.data as any[];

  const products = data.map<Product>((product) => ({
    idProducto: product.idProducto,
    ean: product.ean,
    descripcion: product.descripcion,
    cantidad: product.cantidad,
    precio: product.precio,
    requiereReceta: product.requiereReceta,
    idOrdenDetalle: product.idOrdenDetalle,
  }));
  return products;
};
