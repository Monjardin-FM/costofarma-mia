export type ShoppingCartItem = {
  idProducto?: number;
  ean: string;
  descripcion: string;
  cantidad: number;
  precio: number;
  requiereReceta: boolean;
  idOrdenDetalle: number;
};
