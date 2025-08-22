import { DataCard } from "./StepperFormPayment";
import { FooterModal } from "./FooterModal";
type DataInformationProps = {
  // formInfoClient: any;
  cardInfoForm: any;
  dataCard: DataCard;
  amount: number;
};
export const DataInformation = ({
  cardInfoForm,
  // formInfoClient,
  amount,
  dataCard,
}: DataInformationProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 items-start w-full sm:gap-3 gap-2">
      <div className="sm:p-4 p-2 col-span-1 flex flex-col gap-2 bg-info-100 rounded-lg h-full">
        <h1 className="text-info-800 font-semibold text-lg">
          Información del Cliente
        </h1>
        <span>
          <b className="text-info-700">Nombre del Cliente:</b>
          {` ${cardInfoForm.values.name} ${cardInfoForm.values.lastName}`}
        </span>
        <span>
          <b className="text-info-700">Correo:</b>
          {` ${cardInfoForm.values.email}`}
        </span>
        <span>
          <b className="text-info-700">Teléfono:</b>
          {` ${cardInfoForm.values.phoneNumber}`}
        </span>
      </div>

      <div className="sm:p-4 p-2 col-span-1 flex flex-col gap-2 bg-info-100 rounded-lg h-full">
        <h1 className="text-info-800 font-semibold text-lg">
          Datos de la tarjeta
        </h1>
        <span>
          <b className="text-info-700">Número de tarjeta: </b>
          {dataCard.card_number}
        </span>
        <span>
          <b className="text-info-700">Tipo de tarjeta: </b>
          {dataCard.type === "debit" ? "Débito" : "Crédito"}
        </span>
        <span>
          <b className="text-info-700">Fecha de expiración: </b>
          {`${dataCard.expiration_month} / ${dataCard.expiration_year}`}
        </span>
        <span>
          <b className="text-info-700">Monto: </b>
          <span>{`$${amount} MXN `}</span>
          <span className="text-xs font-semibold">(IVA incluido)</span>
        </span>
      </div>

      {/* {dataCard.type === "credit" && ( */}
      <div className="col-span-1 sm:col-span-2 gap-6 bg-warn-100 p-6 flex flex-col items-center justify-center w-full">
        {amount === 1914 ? (
          <div className="text-warn-900 w-full text-center">
            El cobro se realizará a 12 meses sin intereses.
          </div>
        ) : (
          <div className="text-warn-900 w-full text-center">
            El cobro se realizará de contado
          </div>
        )}
      </div>
      {/* )} */}
      <div className="sm:col-span-2 col-span-1">
        <FooterModal />
      </div>
    </div>
  );
};
