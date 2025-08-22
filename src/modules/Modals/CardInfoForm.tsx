import React, { useEffect, useState } from "react";
import { FooterModal } from "./FooterModal";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { Card } from "../../Card/Card";
import cardExample from "../../assets/img/cvv.png";
import { AppFormLabel } from "../../presentation/Components/AppForm";
import { Button, Chip, Input, Tooltip } from "@nextui-org/react";
import * as Icon from "react-feather";
import { useToggle } from "react-use";
import { ModalDetailPayment } from "../orders/web/components/modals/ModalDetailPayment";
import { OrderDetail } from "../orders/domain/entities/OrderDetail";
type CardInfoProps = {
  cardInfoForm: any;
  cardFormat: string;
  setCardFormat: React.Dispatch<React.SetStateAction<string>>;
  emailURL?: string;
  amount?: number;
  cupon?: string;
  items?: OrderDetail[];
};

export const CardInfoForm = ({
  cardInfoForm,
  cardFormat,
  setCardFormat,
  emailURL,
  amount,
  items,
}: CardInfoProps) => {
  const [flagCardNumberValid, setFlagCardNumber] = useState(false);
  const [parent] = useAutoAnimate();
  const [CVV2Flag, setCVV2Flag] = useState();
  const [flagRotate, setFlagRotate] = useState(false);
  const [modalDetailPayment, setModalDetailPayment] = useToggle(false);
  // Function to handle the focus and blur events for the CVV input
  const onCVVFocus = () => {
    setFlagRotate(true);
  };
  // Function to handle the blur event for the CVV input
  const onCVVBlur = () => {
    setFlagRotate(false);
  };
  // Function to validate the card number and set the card type
  const handleValidateCard = () => {
    const typeTarjeta = window.OpenPay.card.cardType(
      cardInfoForm.values.card_number
    );
    return typeTarjeta;
  };
  // Function to format the card number input
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
  // Effect to validate the card number and CVV inputs
  useEffect(() => {
    if (cardInfoForm.values.card_number.length > 1) {
      const flagCardNumber = window.OpenPay.card.validateCardNumber(
        cardInfoForm.values.card_number
      );
      setFlagCardNumber(flagCardNumber);
    }
  }, [cardInfoForm.values.card_number]);
  // Effect to validate the CVV input based on the card number
  useEffect(() => {
    const cvv2Flag = window.OpenPay.card.validateCVC(
      cardInfoForm.values.cvv2,
      cardInfoForm.values.card_number
    );
    setCVV2Flag(cvv2Flag);
  }, [cardInfoForm.values.cvv2, cardInfoForm.values.card_number]);

  return (
    <>
      <ModalDetailPayment
        isVisible={modalDetailPayment}
        onClose={setModalDetailPayment}
        items={items}
      />
      <div className="pt-2">
        <div className="grid grid-cols-12">
          <div className="col-span-12 font-semibold text-lg text-center color-primary max-sm:text-sm max-sm:text-center mb-8">
            <span className="text-lg text-primaryColor-600">
              Total a pagar:{" "}
            </span>
            <Chip
              color="primary"
              variant="shadow"
              className="font-semibold text-lg "
            >
              <p className="flex items-center justify-center gap-x-2">
                <span>{`$${amount}`} </span>
                <Tooltip
                  content="Ver detalles del pedido"
                  disableAnimation
                  showArrow
                  color="primary"
                >
                  <Button
                    isIconOnly
                    variant="light"
                    color="default"
                    size="sm"
                    onClick={() => setModalDetailPayment(true)}
                  >
                    <Icon.Eye size={18} color="white" />
                  </Button>
                </Tooltip>
              </p>
            </Chip>
            {/* <span className="text-sm font-semibold">(IVA incluido)</span> */}
          </div>
          <div className="col-span-6 flex flex-col justify-start items-center max-sm:col-span-12 gap-5">
            <Card
              cardNumber={cardFormat}
              cardForm={cardInfoForm.values}
              flagRotate={flagRotate}
            />
            <div className="flex flex-col items-center justify-center px-5 text-justify">
              <span className="sm:text-sm text-xs text-gray-700 self-start">
                Al proporcionar los datos de su tarjeta de débito o crédito,
                usted autoriza expresamente a FarmaLeal a almacenar de manera
                segura su información de pago y a realizar cargos recurrentes
                según los términos acordados.
              </span>
            </div>
          </div>
          <div className=" gap-x-5 rounded-lg gap-3 grid grid-cols-12 col-span-6 max-sm:col-span-12 max-sm:gap-4">
            <div
              ref={parent}
              className="col-span-6 w-full  flex flex-col gap-2 justify-center items-start"
            >
              <Input
                label="Nombre (s)"
                data-openpay-card={"name"}
                name="name"
                onChange={cardInfoForm.handleChange}
                value={cardInfoForm.values.name}
                onBlur={cardInfoForm.handleBlur}
                inputMode="text"
                errorMessage={
                  cardInfoForm.errors.name ? cardInfoForm.errors.name : ""
                }
                isRequired
                color="primary"
                radius="md"
                isInvalid={!!cardInfoForm.errors.name}
                className="w-full"
              />
            </div>
            <div
              ref={parent}
              className="col-span-6 w-full  flex flex-col gap-2 justify-center items-start"
            >
              <Input
                label="Apellidos"
                data-openpay-card={"lastName"}
                name="lastName"
                onChange={cardInfoForm.handleChange}
                value={cardInfoForm.values.lastName}
                onBlur={cardInfoForm.handleBlur}
                inputMode="text"
                errorMessage={
                  cardInfoForm.errors.lastName
                    ? cardInfoForm.errors.lastName
                    : ""
                }
                isRequired
                color="primary"
                radius="md"
                isInvalid={!!cardInfoForm.errors.lastName}
                className="w-full"
              />
            </div>
            <div
              ref={parent}
              className="col-span-6 w-full  flex flex-col gap-2 justify-center items-start"
            >
              <Input
                label="Correo electrónico"
                name="email"
                onChange={cardInfoForm.handleChange}
                value={cardInfoForm.values.email}
                onBlur={cardInfoForm.handleBlur}
                inputMode="text"
                errorMessage={
                  cardInfoForm.errors.email ? cardInfoForm.errors.email : ""
                }
                isRequired
                color="primary"
                radius="md"
                isInvalid={!!cardInfoForm.errors.email}
                className="w-full"
                disabled={emailURL ? true : false}
              />
            </div>
            <div
              ref={parent}
              className="col-span-6 w-full  flex flex-col gap-2 justify-center items-start"
            >
              <Input
                label="Teléfono"
                data-openpay-card={"phoneNumber"}
                name="phoneNumber"
                onChange={cardInfoForm.handleChange}
                value={cardInfoForm.values.phoneNumber}
                onBlur={cardInfoForm.handleBlur}
                inputMode="numeric"
                errorMessage={
                  cardInfoForm.errors.phoneNumber
                    ? cardInfoForm.errors.phoneNumber
                    : ""
                }
                isRequired
                color="primary"
                radius="md"
                isInvalid={!!cardInfoForm.errors.phoneNumber}
                className="w-full"
              />
            </div>
            <div
              ref={parent}
              className="w-full col-span-12 flex flex-col gap-2 justify-center items-start text-lg font-extralight"
            >
              <Input
                label="Número de Tarjeta"
                placeholder="0000 0000 0000 0000"
                name="card_number"
                onChange={(e: any) => {
                  cardInfoForm.handleChange(e);
                  handleChangeCard(e);
                }}
                value={cardFormat}
                inputMode="numeric"
                errorMessage={
                  !flagCardNumberValid || cardFormat === ""
                    ? "Tarjeta inválida"
                    : "Tarjeta válida"
                }
                isRequired
                color="primary"
                radius="md"
                isInvalid={!flagCardNumberValid || cardFormat === ""}
                className="w-full"
                maxLength={19}
                isClearable={true}
                onClear={() => {
                  setCardFormat("");
                  cardInfoForm.setFieldValue("card_number", "");
                }}
              />
            </div>
            <div
              ref={parent}
              className="w-full col-span-6 flex flex-col gap-2 justify-center items-start text-lg font-extralight"
            >
              <AppFormLabel
                label="Fecha de expiración:"
                className="text-primaryColor-500 text-sm font-semibold"
              />
              <div className="flex flex-row gap-3 ">
                <Input
                  placeholder="MM"
                  name="expiration_month"
                  onChange={cardInfoForm.handleChange}
                  value={cardInfoForm.values.expiration_month}
                  inputMode="numeric"
                  maxLength={2}
                  isRequired
                  color="primary"
                  radius="md"
                  className="w-full"
                  isInvalid={cardInfoForm.errors.expiration_month}
                  errorMessage={"Mes inválido"}
                />
                <Input
                  name="expiration_year"
                  onChange={cardInfoForm.handleChange}
                  value={cardInfoForm.values.expiration_year}
                  inputMode="numeric"
                  placeholder="YY"
                  isRequired
                  color="primary"
                  radius="md"
                  className="w-full"
                  maxLength={2}
                  isInvalid={cardInfoForm.errors.expiration_year}
                  errorMessage={"Año inválido"}
                />
              </div>
            </div>
            <div
              ref={parent}
              className="w-full col-span-6 flex flex-col gap-2 justify-end items-start text-lg font-extralight"
            >
              <AppFormLabel
                label="CVV:"
                className="text-primaryColor-500 text-sm font-semibold"
              />
              <div className="flex flex-row items-center gap-2">
                <Input
                  name="cvv2"
                  onChange={cardInfoForm.handleChange}
                  value={cardInfoForm.values.cvv2}
                  onBlur={() => {
                    onCVVBlur();
                    handleValidateCard();
                  }}
                  inputMode="numeric"
                  placeholder="XXX"
                  isRequired
                  color="primary"
                  radius="md"
                  className="w-full"
                  isInvalid={!CVV2Flag || cardInfoForm.values.cvv2 === ""}
                  errorMessage={"CVV inválido"}
                  onFocus={onCVVFocus}
                />

                <div className="full max-sm:hidden">
                  <img src={cardExample} />
                </div>
              </div>
            </div>
            {/* {!emailURL && (
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
            )} */}
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
