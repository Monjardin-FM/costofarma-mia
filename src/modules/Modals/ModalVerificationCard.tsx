import React, { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Formik } from "formik";
import { AppTextField } from "../../presentation/Components/AppTextField";
import cardExample from "../../assets/img/cvv.png";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import Swal from "sweetalert2";
import { FooterModal } from "./FooterModal";
import { Card } from "../../Card/Card";
// import "../../index.css";

type ModalVerificationCardProps = {
  isVisible: boolean;
  onClose: () => void;
  setTypeCard: (type: string) => void;
  setTokenID: (token: string) => void;
  cardForm: any;
  setCardForm: (form: any) => void;
};

export const ModalVerificationCard = ({
  isVisible,
  onClose,
  setTypeCard,
  setTokenID,
  cardForm,
  setCardForm,
}: ModalVerificationCardProps) => {
  const [flagCardNumberValid, setFlagCardNumber] = useState(false);
  const [parent] = useAutoAnimate();
  const [CVV2Flag, setCVV2Flag] = useState();
  const [cardFormat, setCardFormat] = useState("");
  const [paymentData, setPaymentData] = useState({
    deviceSessionId: "",
    tokenId: "",
  });
  const [flagRotate, setFlagRotate] = useState(false);
  const { card_number, cvv2, expiration_month, expiration_year, holder_name } =
    cardForm;
  const onCVVFocus = () => {
    setFlagRotate(true);
  };
  const onCVVBlur = () => {
    setFlagRotate(false);
  };
  const handleChange = (e: any) => {
    setCardForm({
      ...cardForm,
      [e.target.name]: e.target.value,
    });
  };
  useEffect(() => {
    /*global OpenPay*/
    window.OpenPay.setId(import.meta.env.VITE_API_KEY_OPENPAY_ID);
    window.OpenPay.setApiKey(import.meta.env.VITE_API_KEY_OPENPAY);
    window.OpenPay.setSandboxMode(import.meta.env.VITE_API_KEY_OPENPAY_MODE);
    //Se genera el id de dispositivo
    setPaymentData({
      ...paymentData,
      deviceSessionId: window.OpenPay.deviceData.setup(),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = () => {
    handlePayment();
  };

  const handlePayment = () => {
    createToken();
  };

  const createToken = () => {
    window.OpenPay.token.create(cardForm, sucessCallbak, errorCallBack);
  };

  const sucessCallbak = (response: any) => {
    setPaymentData({
      ...paymentData,
      tokenId: response.data.id,
    });

    setTokenID(response.data.id);
    setTypeCard(response.data.card.type);

    Swal.fire({
      icon: "success",
      title: "Tarjeta Válida. Rellena los siguiente campos",
      showConfirmButton: false,
      timer: 2000,
    });
    // nextForm();
    onClose();
  };

  const errorCallBack = (response: any) => {
    Swal.fire({
      icon: "error",
      title: `${response.data.description}`,
      showConfirmButton: true,
    });
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
    const numbers = e.target.value.replace(/(\D)/g, "");
    setCardForm({
      ...cardForm,
      [e.target.name]: numbers,
    });
  };

  useEffect(() => {
    if (card_number.length >= 13) {
      const flagCardNumber =
        window.OpenPay.card.validateCardNumber(card_number);
      setFlagCardNumber(flagCardNumber);
    }
  }, [card_number]);
  useEffect(() => {
    const cvv2Flag = window.OpenPay.card.validateCVC(cvv2, card_number);
    setCVV2Flag(cvv2Flag);
  }, [cvv2, card_number]);

  return (
    <Transition appear show={isVisible} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-5xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Formik
                  initialValues={{
                    mesesSI: "0",
                    card_number: "",
                  }}
                  onSubmit={handleSubmit}
                >
                  {(props) => (
                    <form
                      action="#"
                      method="POST"
                      id="paymentForm"
                      onSubmit={props.handleSubmit}
                    >
                      <div className="pt-2">
                        <div className="grid grid-cols-12 mb-5">
                          <div className="col-span-6 flex flex-col justify-center items-center max-sm:col-span-12">
                            <Card
                              cardNumber={cardFormat}
                              cardForm={cardForm}
                              flagRotate={flagRotate}
                            />
                          </div>
                          <div className=" gap-x-5 rounded-lg pb-2 grid grid-cols-12 col-span-6 max-sm:col-span-12 max-sm:gap-4">
                            <div className="col-span-12 font-semibold text-xl text-cyan-900 max-sm:text-sm max-sm:text-center max-sm:my-3">
                              Datos de tarjeta
                            </div>
                            <div
                              ref={parent}
                              className="col-span-12 w-full  flex flex-col gap-2 justify-center items-start"
                            >
                              <AppFormLabel label="Nombre del titular:" />

                              <AppTextField
                                dataOpenCard="holder_name"
                                name="holder_name"
                                onChange={handleChange}
                                placeholder="Como aparece en la tarjeta"
                                value={holder_name}
                                className="w-full "
                                onBlur={props.handleBlur}
                                inputMode="text"
                              />
                              {holder_name === "" && (
                                <div className="border border-red-800 rounded-md bg w-full p-1 relative -top-2 bg-red-50">
                                  <span className="text-red-700 font-semibold text-sm max-sm:text-xs">
                                    {"Campo Obligatorio"}
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
                                  props.handleChange(e);
                                  handleChange(e);
                                  handleChangeCard(e);
                                }}
                                className="w-full"
                                inputMode="numeric"
                              />
                              {!flagCardNumberValid && (
                                <div className="border border-red-800 rounded-md bg w-full p-1 relative -top-2 bg-red-50">
                                  <span className="text-red-700 font-semibold text-sm max-sm:text-xs">
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
                                  value={expiration_month}
                                  onChange={handleChange}
                                  className="w-full"
                                  inputMode="numeric"
                                />
                                <AppTextField
                                  placeholder="YY"
                                  name="expiration_year"
                                  value={expiration_year}
                                  onChange={handleChange}
                                  className="w-full"
                                  inputMode="numeric"
                                />
                              </div>
                              {expiration_month.length !== 2 &&
                                expiration_year.length !== 2 && (
                                  <div className="border border-red-800 rounded-md bg w-full p-1 relative -top-2 bg-red-50">
                                    <span className="text-red-700 font-semibold text-sm max-sm:text-xs">
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
                                  value={cvv2}
                                  name="cvv2"
                                  onChange={handleChange}
                                  className="w-1/2 "
                                  onBlur={onCVVBlur}
                                  onFocus={onCVVFocus}
                                  inputMode="numeric"
                                />

                                <div className="full max-sm:hidden">
                                  <img src={cardExample} />
                                </div>
                              </div>
                              {!CVV2Flag && (
                                <div className="border border-red-800 rounded-md bg w-full p-1 relative -top-2 bg-red-50">
                                  <span className="text-red-700 font-semibold text-sm max-sm:text-xs">
                                    {"CVV Inválido"}
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                        <hr className="max-sm:hidden" />
                        <div className="max-sm:hidden">
                          <FooterModal />
                        </div>
                        <hr className="max-sm:hidden" />
                      </div>
                      <div className="flex justify-end mt-5">
                        <button
                          type="submit"
                          className="bg-sky-900 text-white px-10 py-3 hover:bg-sky-800 transition duration-200"
                          id="pay-button"
                          // onClick={handleSubmit}
                        >
                          Pagar
                        </button>
                      </div>
                    </form>
                  )}
                </Formik>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
