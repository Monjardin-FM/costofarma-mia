import React, { useEffect, useState } from "react";
import { FooterModal } from "./FooterModal";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { Card } from "../../Card/Card";
import cardExample from "../../assets/img/cvv.png";
import { AppFormLabel } from "../../presentation/Components/AppForm";
import { AppTextField } from "../../presentation/Components/AppTextField";

type CardInfoProps = {
  cardInfoForm: any;
  cardFormat: string;
  setCardFormat: React.Dispatch<React.SetStateAction<string>>;
  emailURL?: string;
  amount?: number;
  cupon?: string;
};

export const CardInfoForm = ({
  cardInfoForm,
  cardFormat,
  setCardFormat,
  emailURL,
  amount,
  cupon,
}: CardInfoProps) => {
  const [flagCardNumberValid, setFlagCardNumber] = useState(false);
  const [parent] = useAutoAnimate();
  const [CVV2Flag, setCVV2Flag] = useState();
  const [flagRotate, setFlagRotate] = useState(false);

  const onCVVFocus = () => {
    setFlagRotate(true);
  };
  const onCVVBlur = () => {
    setFlagRotate(false);
  };

  const handleValidateCard = () => {
    const typeTarjeta = window.OpenPay.card.cardType(
      cardInfoForm.values.card_number
    );
  };

  const handleChangeCard = (e: any) => {
    const cardValue = e.target.value
      .replace(/\D/g, "")
      .match(/(\d{0,4})(\d{0,4})(\d{0,4})(\d{0,4})/);
    setCardFormat(
      (e.target.value = !cardValue[2]
        ? cardValue[1]
        : `${cardValue[1]} ${cardValue[2]}${`${
            cardValue[3] ? ` ${cardValue[3]}` : ""
          }`}${`${cardValue[4] ? ` ${cardValue[4]}` : ""}`}`)
    );
  };

  useEffect(() => {
    if (cardInfoForm.values.card_number.length > 1) {
      const flagCardNumber = window.OpenPay.card.validateCardNumber(
        cardInfoForm.values.card_number
      );
      setFlagCardNumber(flagCardNumber);
    }
  }, [cardInfoForm.values.card_number]);
  useEffect(() => {
    const cvv2Flag = window.OpenPay.card.validateCVC(
      cardInfoForm.values.cvv2,
      cardInfoForm.values.card_number
    );
    setCVV2Flag(cvv2Flag);
  }, [cardInfoForm.values.cvv2, cardInfoForm.values.card_number]);

  return (
    <>
      <div className="pt-2">
        <div className="grid grid-cols-12 mb-5">
          <div className="col-span-12 font-semibold text-lg text-center color-primary max-sm:text-sm max-sm:text-center mb-3">
            <span>Pago de membresía</span>
            {amount === 1914 ? (
              <span> a 12 MSI</span>
            ) : amount === 175 ? (
              <span> mensual (pago recurrente)</span>
            ) : (
              <span> a 12 meses de contado</span>
            )}
            <br />
            <span>{`$${amount}`} </span>
            <span className="text-sm font-semibold">(IVA incluido)</span>
          </div>
          <div className="col-span-6 flex flex-col justify-center items-center max-sm:col-span-12 gap-5">
            <Card
              cardNumber={cardFormat}
              cardForm={cardInfoForm.values}
              flagRotate={flagRotate}
            />{" "}
            {amount === 175 && (
              <div className="w-full flex flex-col items-center justify-center px-5 text-justify">
                <span className="sm:text-sm text-xs text-gray-700 self-start">
                  Al proporcionar los datos de su tarjeta de débito o crédito,
                  usted autoriza expresamente a FarmaLeal a almacenar de manera
                  segura su información de pago y a realizar cargos recurrentes
                  según los términos acordados.
                </span>
              </div>
            )}
          </div>
          <div className=" gap-x-5 rounded-lg pb-2 grid grid-cols-12 col-span-6 max-sm:col-span-12 max-sm:gap-4">
            <div className="col-span-12 font-semibold text-xl color-primary max-sm:text-sm max-sm:text-center max-sm:my-3">
              Datos de tarjeta
            </div>
            <div
              ref={parent}
              className="col-span-6 w-full  flex flex-col gap-2 justify-center items-start"
            >
              <AppFormLabel label="Nombre(s):" />

              <AppTextField
                dataOpenCard="name"
                name="name"
                onChange={cardInfoForm.handleChange}
                placeholder=""
                value={cardInfoForm.values.name}
                className="w-full "
                onBlur={cardInfoForm.handleBlur}
                inputMode="text"
              />
              {cardInfoForm.errors.name && (
                <div className="border border-danger-800 bg-danger-100 rounded-md bg w-full p-1 relative -top-2 ">
                  <span className="text-danger-500 font-semibold text-sm max-sm:text-xs">
                    {cardInfoForm.errors.name}
                  </span>
                </div>
              )}
            </div>
            <div
              ref={parent}
              className="col-span-6 w-full  flex flex-col gap-2 justify-center items-start"
            >
              <AppFormLabel label="Apellidos:" />

              <AppTextField
                dataOpenCard="lastName"
                name="lastName"
                onChange={cardInfoForm.handleChange}
                placeholder=""
                value={cardInfoForm.values.lastName}
                className="w-full "
                onBlur={cardInfoForm.handleBlur}
                inputMode="text"
              />
              {cardInfoForm.errors.lastName && (
                <div className="border border-danger-800 bg-danger-100 rounded-md bg w-full p-1 relative -top-2 ">
                  <span className="text-danger-500 font-semibold text-sm max-sm:text-xs">
                    {cardInfoForm.errors.lastName}
                  </span>
                </div>
              )}
            </div>
            <div
              ref={parent}
              className="col-span-6 w-full  flex flex-col gap-2 justify-center items-start"
            >
              <AppFormLabel label="Correo:" />

              <AppTextField
                // dataOpenCard="email"
                name="email"
                onChange={cardInfoForm.handleChange}
                placeholder=""
                value={cardInfoForm.values.email}
                className="w-full "
                onBlur={cardInfoForm.handleBlur}
                inputMode="text"
                disabled={emailURL ? true : false}
              />
              {cardInfoForm.errors.email && (
                <div className="border border-danger-800 bg-danger-100 rounded-md bg w-full p-1 relative -top-2 ">
                  <span className="text-danger-500 font-semibold text-sm max-sm:text-xs">
                    {cardInfoForm.errors.email}
                  </span>
                </div>
              )}
            </div>
            <div
              ref={parent}
              className="col-span-6 w-full  flex flex-col gap-2 justify-center items-start"
            >
              <AppFormLabel label="Teléfono:" />

              <AppTextField
                dataOpenCard="phoneNumber"
                name="phoneNumber"
                onChange={cardInfoForm.handleChange}
                placeholder=""
                value={cardInfoForm.values.phoneNumber}
                className="w-full "
                onBlur={cardInfoForm.handleBlur}
                inputMode="numeric"
              />
              {cardInfoForm.errors.phoneNumber && (
                <div className="border border-danger-800 bg-danger-100 rounded-md bg w-full p-1 relative -top-2 ">
                  <span className="text-danger-500 font-semibold text-sm max-sm:text-xs">
                    {cardInfoForm.errors.phoneNumber}
                  </span>
                </div>
              )}
            </div>
            <div
              ref={parent}
              className="w-full col-span-12 flex flex-col gap-2 justify-center items-start text-lg font-extralight"
            >
              <AppFormLabel label="Número de Tarjeta:" />
              <AppTextField
                placeholder={"0000 0000 0000 0000"}
                name="card_number"
                value={cardFormat}
                onChange={(e: any) => {
                  cardInfoForm.handleChange(e);
                  handleChangeCard(e);
                }}
                className={
                  !flagCardNumberValid || cardFormat === ""
                    ? "w-full bg-danger-100"
                    : "w-full bg-success-200"
                }
                inputMode="numeric"
                maxLength={19}
              />
              {(!flagCardNumberValid || cardFormat === "") && (
                <div className="border border-danger-800 rounded-md bg w-full p-1 relative -top-2 bg-danger-100">
                  <span className="text-danger-500 font-semibold text-sm max-sm:text-xs">
                    {"Tarjeta Inválida"}
                  </span>
                </div>
              )}
            </div>
            <div
              ref={parent}
              className="w-full col-span-6 flex flex-col gap-2 justify-center items-start text-lg font-extralight"
            >
              <AppFormLabel label="Fecha de expiración:" />
              <div className="flex flex-row gap-3 ">
                <AppTextField
                  placeholder="MM"
                  name="expiration_month"
                  value={cardInfoForm.values.expiration_month}
                  onChange={cardInfoForm.handleChange}
                  className="w-full"
                  inputMode="numeric"
                  maxLength={2}
                />
                <AppTextField
                  placeholder="YY"
                  name="expiration_year"
                  value={cardInfoForm.values.expiration_year}
                  onChange={cardInfoForm.handleChange}
                  className="w-full"
                  inputMode="numeric"
                  maxLength={2}
                />
              </div>
              {(cardInfoForm.errors.expiration_month ||
                cardInfoForm.errors.expiration_year) && (
                <div className="border border-danger-800 rounded-md bg w-full p-1 relative -top-2 bg-danger-100">
                  <span className="text-danger-500 font-semibold text-sm max-sm:text-xs">
                    {"Fecha Inválida"}
                  </span>
                </div>
              )}
            </div>
            <div
              ref={parent}
              className="w-full col-span-6 flex flex-col gap-2 justify-center items-start text-lg font-extralight"
            >
              <AppFormLabel label="Código CVV:" />
              <div className="flex flex-row items-center gap-2">
                <AppTextField
                  placeholder="CVV"
                  value={cardInfoForm.values.cvv2}
                  name="cvv2"
                  onChange={cardInfoForm.handleChange}
                  className="w-1/2 "
                  onBlur={() => {
                    onCVVBlur();
                    handleValidateCard();
                  }}
                  onFocus={onCVVFocus}
                  inputMode="numeric"
                />

                <div className="full max-sm:hidden">
                  <img src={cardExample} />
                </div>
              </div>
              {!CVV2Flag && (
                <div className="border border-danger-800 rounded-md bg w-full p-1 relative -top-2 bg-danger-100">
                  <span className="text-danger-500 font-semibold text-sm max-sm:text-xs">
                    {"CVV Inválido"}
                  </span>
                </div>
              )}
            </div>
            {!emailURL && (
              <div
                ref={parent}
                className="w-full col-span-6 flex flex-col gap-2 justify-center items-start text-lg font-extralight"
              >
                <AppFormLabel label="Cupón:" />
                <AppTextField
                  placeholder="Ingresa tu cupón"
                  value={cardInfoForm.values.cupon}
                  name="cupon"
                  onChange={cardInfoForm.handleChange}
                  className="w-full"
                  inputMode="text"
                  disabled={cupon ? true : false}
                />
              </div>
            )}
          </div>
        </div>

        <hr className="max-sm:hidden" />
        <div className="max-sm:hidden">
          <FooterModal />
        </div>
        <hr className="max-sm:hidden mb-3" />
      </div>
    </>
  );
};
