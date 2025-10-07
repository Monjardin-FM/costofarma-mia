import { api } from "../../../../utils/api";
import { verifyResponse } from "../../../../utils/check-response";
// import { token } from "../../../../utils/token";
import { OrderDetail } from "../../domain/entities/OrderDetail";
import { OrderRepository } from "../../domain/repositories/order-repository";

export const getOrderDetailService: OrderRepository["getOrderDetail"] = async (
  params
) => {
  const response = await api().get("Order/OrderDetail", {
    headers: {
      // Authorization: `Bearer ${token()}`,
      "Content-Type": "application/json",
    },
    searchParams: { idOrder: params.idOrder.toString() },
  });
  const { body } = await verifyResponse({ response });
  const data = body.data as any;

  const orderDetail: OrderDetail = {
    idOrden: data.idOrden,
    fechaCreacion: data.fechaCreacion,
    direccion: {
      idDomicilio: data.direccion.idDomicilio,
      idMunicipio: data.direccion.idMunicipio,
      idEstado: data.direccion.idEstado,
    },
    productos: data.productos.map((item: any) => ({
      idProducto: item.idProducto,
      ean: item.ean,
      descripcion: item.descripcion,
      cantidad: item.cantidad,
      piezasGratis: item.piezasGratis,
      precio: item.precio,
      requiereReceta: item.requiereReceta,
      idOrdenDetalle: item.idOrdenDetalle,
      activo: item.activo,
      banCronico: item.banCronico,
      banRefrigerado: item.banRefrigerado,
      banControlado: item.banControlado,
    })),
    persona: {
      idUser: data.persona.idUser,
      idPersona: data.persona.idPersona,
      idPersonaConvenio: data.persona.idPersonaConvenio,
      idGenero: data.persona.idGenero,
      idConvenio: data.persona.idConvenio,
    },
    idStatus: data.idStatus,
    idStatusAutorizacion: data.idStatusAutorizacion,
    pagado: data.pagado,
    idpersona: data.idpersona,
  };
  return orderDetail;
};
