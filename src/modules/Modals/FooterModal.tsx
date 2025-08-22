import creditCards from "../../assets//img/cards1.png";
import debitCards from "../../assets/img/cards2.png";
import openpayLogo from "../../assets/img/openpay.png";
import encrypt from "../../assets/img/security.png";
export const FooterModal = () => {
  return (
    <div className="grid grid-cols-3 text-primary-800 font-semibold divide-x-2 mt-5 ">
      <div className="sm:col-span-1 col-span-3 flex flex-col items-center justify-center gap-4">
        <div className="flex flex-col items-center justify-center text-primary-800 font-semibold">
          <h4 className="text-xs">Tarjetas de crédito</h4>
          <img src={creditCards} />
        </div>
        <div className="flex flex-col items-center justify-center text-primary-800 font-semibold">
          <h4 className="text-xs">Tarjetas de débito</h4>
          <img src={debitCards} />
        </div>
      </div>

      <div className="flex flex-col gap-2 justify-center items-center sm:col-span-1 col-span-3">
        <div className="text-center">
          <span className="text-xs">Transacciones realizadas vía:</span>
        </div>
        <div className="w-full items-center justify-center flex">
          <img src={openpayLogo} />
        </div>
      </div>

      <div className="sm:col-span-1 col-span-3 flex flex-row items-center justify-center p-4 ">
        <div className="w-24 flex justify-center items-center">
          <img src={encrypt} />
        </div>
        <span className="text-xs text-start ">
          Tus pagos se realizan de forma segura con encriptación de 256 bits
        </span>
      </div>
    </div>
  );
};
