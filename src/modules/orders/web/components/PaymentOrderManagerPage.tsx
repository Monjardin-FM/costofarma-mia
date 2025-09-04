import { Card, CardBody, CardHeader, Chip, Divider } from "@nextui-org/react";
import { AppPageTransition } from "../../../../presentation/Components/AppPageTransition";
import { useParams } from "react-router-dom";
import { Loader } from "../../../../presentation/Components/Loader/Loader";
import { Stepper } from "../../../../presentation/Components/AppStepper/app-stepper";
import { CardInfoForm } from "../../../Modals/CardInfoForm";
import { AppButton } from "../../../../presentation/Components/AppButton";
import { DataInformation } from "../../../Modals/DataInformation";
import { useGetOrderDetail } from "../hooks/use-get-order-detail";
import { useEffect, useState } from "react";
import { useToggle } from "react-use";
import { DataCard } from "../../../Modals/StepperFormPayment";
import { useFormik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import { OrderDetail } from "../../domain/entities/OrderDetail";

export const PaymentOrderManagerPage = () => {
  const { idOrder } = useParams<{ idOrder: string }>();
  const { orderDetail, getOrderDetail } = useGetOrderDetail();
  const [cardFormat, setCardFormat] = useState("");
  const [loadingPayment, setLoadingPayment] = useState(false);
  const [isLoadingCardValidate, setIsloadingValidateCard] = useToggle(false);
  //   const [modalSharePaymentOrder, toggleModalSharePaymentOrder] =
  //     useToggle(false);
  const [amount, setAmount] = useState(0);
  const [paymentData, setPaymentData] = useState({
    deviceSessionId: "",
    tokenId: "",
  });

  const [dataCard, setDataCard] = useState<DataCard>({
    adress: null,
    brand: null,
    card_number: null,
    creation_date: null,
    expiration_month: null,
    expiration_year: null,
    holder_name: null,
    type: null,
  });

  const cardInfoForm = useFormik({
    enableReinitialize: true,
    initialValues: {
      card_number: "",
      name: "",
      lastName: "",
      phoneNumber: "",
      email: "",
      expiration_year: "",
      expiration_month: "",
      cvv2: "",
      cupon: "",
    },
    validationSchema: Yup.object().shape({
      card_number: Yup.string().matches(
        /^\d+$/,
        "El número de tarjeta solo deben de ser dígitos"
      ),
      name: Yup.string().required("Campo Obligatorio"),
      lastName: Yup.string().required("Campo Obligatorio"),
      expiration_year: Yup.string()
        .matches(/^\d+$/)
        .length(2, "Fecha Inválida"),
      phoneNumber: Yup.string()
        .matches(/^\d+$/, "El número de teléfono solo deben de ser dígitos")
        .required("Campo Obligatorio"),
      email: Yup.string().email("Email inválido").required("Campo Obligatorio"),
      expiration_month: Yup.string()
        .matches(/^\d+$/)
        .length(2, "Fecha Inválida"),
      cvv2: Yup.string().required("Campo Obligatorio"),
    }),
    onSubmit: () => {},
  });
  // This function is used to handle the payment process
  const handlePaymentOP = async (
    endpoint: string = "/Order/PayOrder"
  ): Promise<any> => {
    setLoadingPayment(true);

    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_REACT_APP_API_URL
        }${endpoint}?idOrder=${idOrder}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${token()}`,
          },

          body: JSON.stringify({
            tokenId: paymentData.tokenId,
            deviceSessionId: paymentData.deviceSessionId,
            amount: amount,
            name: cardInfoForm.values.name,
            lastName: cardInfoForm.values.lastName,
            phoneNumber: cardInfoForm.values.phoneNumber,
            email: cardInfoForm.values.email,
            msi: 0,
            cupon: "",
          }),
        }
      );

      const data = await response.json();
      setLoadingPayment(false);

      if (data.data.result) {
        Swal.fire({
          title: "Pago exitoso",
          text: "Pago realizado correctamente.",
          icon: "success",
          confirmButtonText: "Ok",
          confirmButtonColor: "#15A186",
        });

        cardInfoForm.resetForm();
        setCardFormat("");
        setPaymentData({
          deviceSessionId: "",
          tokenId: "",
        });
        // onClose();
        // onReload();
        setDataCard({
          card_number: "",
          adress: "",
          brand: "",
          creation_date: "",
          expiration_month: "",
          expiration_year: "",
          holder_name: "",
          type: "",
        });
      } else {
        Swal.fire({
          title: "Error ",
          text: data.message,
          icon: "error",
          confirmButtonText: "Ok",
          confirmButtonColor: "#15A186",
        });
      }

      return data;
    } catch (error: any) {
      setLoadingPayment(false);
      Swal.fire({
        title: "Error de conexión",
        text: error.message || "No se pudo procesar el pago.",
        icon: "error",
        confirmButtonText: "Ok",
        confirmButtonColor: "#15A186",
      });
      throw error;
    }
  };

  // This function is used to handle idevice session id and token id. And confure the OpenPay API
  useEffect(() => {
    // if (isVisible) {
    /*global OpenPay*/
    window.OpenPay.setId(import.meta.env.VITE_API_KEY_OPENPAY_ID);
    window.OpenPay.setApiKey(import.meta.env.VITE_API_KEY_OPENPAY);
    window.OpenPay.setSandboxMode(
      import.meta.env.VITE_OPENPAY_SANDBOX === "true"
    );
    //Se genera el id de dispositivo
    setPaymentData({
      ...paymentData,
      deviceSessionId: window.OpenPay.deviceData.setup(),
    });
    // }
    return () => {
      setPaymentData({ deviceSessionId: "", tokenId: "" });
      cardInfoForm.resetForm();
      setCardFormat("");
      setIsloadingValidateCard(false);
      setLoadingPayment(false);
    };
  }, []);
  const calculateCost = (orderDetail: OrderDetail[]) => {
    const total = orderDetail.reduce((acc, item) => {
      return acc + item.precio * item.cantidad;
    }, 0);
    setAmount(Number(total.toFixed(2)));
  };
  useEffect(() => {
    if (idOrder) {
      getOrderDetail({ idOrder: parseInt(idOrder) });
    }
  }, [idOrder]);
  useEffect(() => {
    if (orderDetail) {
      calculateCost(orderDetail);
    }
  }, [orderDetail]);
  return (
    <AppPageTransition>
      <div className="grid grid-cols-12 gap-5 p-5">
        <div className="sm:col-span-6 col-span-12 order-2 sm:order-1">
          <Card className="bg-warn-50">
            <CardHeader>
              <h1 className="text-lg font-semibold">Detalle de la Orden</h1>
            </CardHeader>
            <CardBody className="flex flex-col items-start justify-start gap-3">
              {orderDetail && orderDetail.length > 0 && (
                <>
                  {orderDetail.map((item, index) => (
                    <div key={index} className="w-full">
                      <div className="grid grid-cols-12 w-full">
                        <div className="col-span-12 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                          {/* Descripción */}
                          <span className="font-semibold text-gray-800">
                            {item.descripcion}
                          </span>

                          {/* Cantidad y total */}
                          <div className="flex flex-wrap items-center gap-2">
                            <span>
                              {`${item.cantidad} pzas. x $${item.precio.toFixed(
                                2
                              )} = `}
                            </span>
                            <Chip color="warning" variant="shadow">
                              ${(item.precio * item.cantidad).toFixed(2)}
                            </Chip>
                          </div>
                        </div>
                      </div>
                      <Divider className="my-2" />
                    </div>
                  ))}
                </>
              )}
            </CardBody>
            <div className="flex items-center justify-end p-3">
              <Chip color="warning">
                <span className="font-semibold">
                  Total: $
                  {orderDetail &&
                    orderDetail
                      .reduce(
                        (acc, item) => acc + item.precio * item.cantidad,
                        0
                      )
                      .toFixed(2)}
                </span>
              </Chip>
            </div>
          </Card>
        </div>
        <Card className="sm:col-span-6 col-span-12 p-5 order-1 sm:order-2">
          <CardHeader className="flex flex-col items-start justify-center">
            <p className="flex items-center gap-3">
              <span>Pago de la orden {idOrder}</span>
            </p>
            <span className="text-sm text-gray-800 font-normal">
              Si requiere factura, favor de mandar un correo a
              info@costofarma.mx con su número de orden y sus datos fiscales
            </span>
          </CardHeader>
          <CardBody>
            {/* This loader is used to show a loading spinner when the card is being
                  validated */}
            <Loader isVisible={isLoadingCardValidate}>
              <div className="text-center">
                <span>
                  <p className="font-semibold text-lg text-info-300">
                    Validando los datos de la tarjeta
                  </p>
                  <br />
                  No recargues ni cierres la página. El proceso puede tardar
                  algunos segundos.
                </span>
              </div>
            </Loader>
            {/* This loader is used to show a loading spinner when the payment is being
                  processed */}
            <Loader isVisible={loadingPayment}>
              <div className="text-center">
                <span>
                  <p className="font-semibold text-lg text-info-300">
                    Generando Cobro
                  </p>
                  <br />
                  No recargues ni cierres la página. El proceso puede tardar
                  algunos segundos.
                </span>
              </div>
            </Loader>
            <Stepper initialValue={{ step: 1 }}>
              {({ handleChange }) => {
                const onSubmit = () => {
                  handlePayment();
                };
                const handlePayment = () => {
                  createToken();
                };
                // This function is used to create a token for the card
                const createToken = () => {
                  window.OpenPay.token.create(
                    {
                      card_number: cardInfoForm.values.card_number.replace(
                        /(\D)/g,
                        ""
                      ),
                      holder_name: `${cardInfoForm.values.name} ${cardInfoForm.values.lastName}`,
                      expiration_year: cardInfoForm.values.expiration_year,
                      expiration_month: cardInfoForm.values.expiration_month,
                      cvv2: cardInfoForm.values.cvv2,
                    },
                    sucessCallbak,
                    errorCallBack
                  );
                };
                // This function is used to handle the success callback of the token creation
                const sucessCallbak = (response: any) => {
                  setPaymentData({
                    ...paymentData,
                    tokenId: response.data.id,
                    deviceSessionId: paymentData.deviceSessionId,
                  });

                  setPaymentData({
                    ...paymentData,
                    tokenId: response.data.id,
                  });
                  setDataCard(response.data.card);
                  Swal.fire({
                    icon: "success",
                    title: "Tarjeta Válida",
                    showConfirmButton: false,
                    timer: 2000,
                  });
                  setIsloadingValidateCard(false);
                  handleChange({ value: 2 });
                };
                // This function is used to handle the error callback of the token creation
                const errorCallBack = (response: any) => {
                  Swal.fire({
                    icon: "error",
                    title: `${response.data.description}`,
                    showConfirmButton: true,
                  });
                  handleChange({ value: 1 });
                  setIsloadingValidateCard(false);
                  cardInfoForm.setFieldValue("card_number", "");
                  cardInfoForm.setFieldValue("expiration_month", "");
                  cardInfoForm.setFieldValue("expiration_year", "");
                  cardInfoForm.setFieldValue("cvv2", "");
                  setCardFormat("");
                };
                return (
                  <>
                    <Stepper.Header>
                      <Stepper.Step step={1} />
                      <Stepper.Step step={2} />
                    </Stepper.Header>
                    <form action="">
                      <Stepper.Items className="mt-4">
                        <Stepper.StepContent step={1}>
                          <div className="flex flex-col items-center justify-center">
                            <div className="w-full">
                              <CardInfoForm
                                cardInfoForm={cardInfoForm}
                                cardFormat={cardFormat}
                                setCardFormat={setCardFormat}
                                amount={amount}
                                items={orderDetail}
                                mode="page"
                              />
                            </div>
                            <div className="flex flex-row gap-3">
                              {/* <AppButton onClick={() => onClose()}>
                                Cancelar
                              </AppButton> */}
                              <AppButton
                                colorScheme="info"
                                onClick={() => {
                                  setIsloadingValidateCard(true);
                                  onSubmit();
                                }}
                                isDisabled={
                                  cardInfoForm.values.card_number === "" ||
                                  cardInfoForm.values.name === "" ||
                                  cardInfoForm.values.lastName === "" ||
                                  cardInfoForm.values.expiration_month === "" ||
                                  cardInfoForm.values.expiration_year === "" ||
                                  cardInfoForm.values.cvv2 === "" ||
                                  cardInfoForm.values.phoneNumber === "" ||
                                  cardInfoForm.values.email === "" ||
                                  isLoadingCardValidate
                                }
                              >
                                Siguiente
                              </AppButton>
                            </div>
                          </div>
                        </Stepper.StepContent>
                        <Stepper.StepContent step={2}>
                          <div className="flex flex-col items-center justify-center">
                            <DataInformation
                              cardInfoForm={cardInfoForm}
                              dataCard={dataCard}
                              amount={amount}
                            />
                            <div className="flex flex-row gap-3 mt-3">
                              <AppButton
                                onClick={() => handleChange({ value: 1 })}
                              >
                                Atrás
                              </AppButton>
                              <AppButton
                                colorScheme="info"
                                onClick={() => {
                                  handlePaymentOP();
                                }}
                                isDisabled={loadingPayment}
                              >
                                Realizar Pago
                              </AppButton>
                            </div>
                          </div>
                        </Stepper.StepContent>
                      </Stepper.Items>
                    </form>
                  </>
                );
              }}
            </Stepper>
          </CardBody>
        </Card>
      </div>
    </AppPageTransition>
  );
};
