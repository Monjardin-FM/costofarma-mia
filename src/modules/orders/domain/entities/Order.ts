export type Order = {
  id: number;
  invoiceNumber: string;
  idTipoCobro: number;
  created: string;
  patient: {
    id: number;
    paternalName: string;
    maternalname: string;
    name: string;
  };
  banContrapropuesta: boolean;
  diasReceta: number;
  banContrapropuestFile: boolean;
  banVigenciaFile: boolean;
  idEstado: number;
  inventario: boolean;
};
