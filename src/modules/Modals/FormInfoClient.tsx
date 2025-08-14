import React, { useEffect, useState } from "react";
import { AppFormLabel } from "../../presentation/Components/AppFormLabel";
import { AppTextField } from "../../presentation/Components/AppTextField";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { getEstados } from "../../services/getEstados";
import { getCity } from "../../services/getCity";
import { FooterModal } from "./FooterModal";
import { FaWhatsapp } from "react-icons/fa";

type FormPaymentProps = {
  formInfoClient: any;
  setStateName: (state: string) => void;
  setMunicipioName: (state: string) => void;
};

export const FormInfoClient = ({
  formInfoClient,
  setStateName,
  setMunicipioName,
}: FormPaymentProps) => {
  const [estados, setEstados] = useState([
    {
      idEstado: 5,
      descripcion: "",
    },
  ]);
  const [municipios, setMunicipios] = useState([
    {
      idMunicipio: 5,
      descripcion: "",
    },
  ]);

  const [parent] = useAutoAnimate();
  const [idEstadoState, setIdEstadoState] = useState(33);
  const [idMunicipioState, setIdMunicipioState] = useState(0);

  // const { loading: loadingPayment, paymentMembership } = usePaymentMembership();

  useEffect(() => {
    const esta = getEstados();
    esta.then((response) => setEstados(response));
  }, []);
  useEffect(() => {
    const muni = getCity(idEstadoState);
    muni.then((response) => setMunicipios(response));
  }, [idEstadoState]);

  useEffect(() => {
    const s = estados.filter((element) => element.idEstado === idEstadoState);
    if (s.length > 0) {
      setStateName(s[0].descripcion);
    }
    if (municipios.length > 0) {
      const m = municipios.filter(
        (element) => element.idMunicipio === idMunicipioState
      );
      if (m.length > 0) {
        setMunicipioName(m[0].descripcion);
      }
    }
  }, [idEstadoState, idMunicipioState]);

  // const handleSubmit = async (values: any, actions: any) => {
  //   // const respuesta = await paymentMembership({
  //   //   cargo: {
  //   //     name: values.nombre,
  //   //     lastName: values.paterno,
  //   //     email: values.correo,
  //   //     city: municipioName,
  //   //     state: stateName,
  //   //     idCiudad: idMunicipioState.toString(),
  //   //     idEstado: idEstadoState.toString(),
  //   //     postalCode: values.postalCode,
  //   //     line1: values.line1,
  //   //     cardNumber: cardForm.card_number,
  //   //     holderName: cardForm.holder_name,
  //   //     expirationMonth: cardForm.expiration_month,
  //   //     expirationYear: cardForm.expiration_year,
  //   //     cvv2: cardForm.cvv2,
  //   //     mesesSI: values.mesesSI,
  //   //   },
  //   //   persona: {
  //   //     correo: values.correo,
  //   //     nombre: values.nombre,
  //   //     paterno: values.paterno,
  //   //     materno: values.materno,
  //   //     edad: values.edad.toString,
  //   //     sexo: values.sexo,
  //   //   },
  //   //   sessionId: tokenID,
  //   // });
  //   // if (respuesta.data.result) {
  //   //   Swal.fire({
  //   //     title: "Pago exitoso",
  //   //     text: `Para finalizar tu suscripción revisa tu correo ${values.correo}`,
  //   //     icon: "success",
  //   //     confirmButtonText: "Ok",
  //   //     confirmButtonColor: "#15A186",
  //   //   });
  //   //   actions.resetForm({
  //   //     nombre: "",
  //   //     correo: "",
  //   //     paterno: "",
  //   //     materno: "",
  //   //     edad: "",
  //   //     sexo: "",
  //   //     city: "",
  //   //     state: "",
  //   //     postalCode: "",
  //   //     line1: "",
  //   //     mesesSI: "0",
  //   //   });
  //   //   onClose();
  //   // }
  //   // if (!respuesta.data.result) {
  //   //   Swal.fire({
  //   //     title: "Error al crear la cuenta",
  //   //     text: `${respuesta.data.exceptionMessage}`,
  //   //     icon: "error",
  //   //     confirmButtonText: "Ok",
  //   //     confirmButtonColor: "#15A186",
  //   //   });
  //   // }
  // };
  // useEffect(() => {
  //   setLoadPayment(loadingPayment);
  // }, [loadingPayment]);
  return (
    <>
      <div className="mb-3">
        <div className="gap-2 grid grid-cols-12 bg-gray-100 rounded-xl p-3">
          <div className="col-span-12 font-semibold text-lg max-sm:text-sm text-primary-800">
            Datos del Cliente
          </div>
          <div className="col-span-12 flex flex-row items-center justify-between mb-3">
            <div className="text-danger-500 text-sm font-semibold">
              A continuación recabaremos tu información que servirá para generar
              tu membresía. Y posteriormente el cobro de la misma.
            </div>
            <div className="font-semibold text-sm color-primary gap-2 flex flex-row items-center justify-center">
              <FaWhatsapp size={20} />
              <a href="tel:5531451948" target="_blank">
                01 (55) 3145 1948
              </a>
            </div>
          </div>
          <div
            ref={parent}
            className="w-full col-span-2  flex flex-col gap-2 justify-center items-start text-lg font-extralight max-sm:col-span-12"
          >
            <AppFormLabel label="Nombre(s):" />
            <AppTextField
              placeholder=""
              value={formInfoClient.values.nombre}
              name="nombre"
              onChange={formInfoClient.handleChange}
              className="w-full"
              onBlur={formInfoClient.handleBlur}
              inputMode="text"
            />
            {formInfoClient.errors.nombre && formInfoClient.touched.nombre && (
              <div className="border border-danger-800 rounded-md  w-full p-1 relative -top-2 bg-danger-100">
                <span className="text-danger-500 font-semibold text-sm max-sm:text-xs">
                  {formInfoClient.errors.nombre}
                </span>
              </div>
            )}
          </div>
          <div
            ref={parent}
            className="w-full col-span-2  flex flex-col gap-2 justify-center items-start text-lg font-extralight max-sm:col-span-6"
          >
            <AppFormLabel label="Apellido Paterno:" />
            <AppTextField
              placeholder=""
              value={formInfoClient.values.paterno}
              name="paterno"
              onChange={formInfoClient.handleChange}
              className="w-full"
              onBlur={formInfoClient.handleBlur}
              inputMode="text"
            />
            {formInfoClient.errors.paterno &&
              formInfoClient.touched.paterno && (
                <div className="border border-danger-800 rounded-md  w-full p-1 relative -top-2 bg-danger-100">
                  <span className="text-danger-500 font-semibold text-sm max-sm:text-xs">
                    {formInfoClient.errors.paterno}
                  </span>
                </div>
              )}
          </div>
          <div
            ref={parent}
            className="w-full col-span-2  flex flex-col gap-2 justify-center items-start text-lg font-extralight max-sm:col-span-6"
          >
            <AppFormLabel label="Apellido Materno:" />
            <AppTextField
              placeholder=""
              value={formInfoClient.values.materno}
              name="materno"
              onChange={formInfoClient.handleChange}
              className="w-full"
              onBlur={formInfoClient.handleBlur}
              inputMode="text"
            />
            {formInfoClient.errors.materno &&
              formInfoClient.touched.materno && (
                <div className="border border-danger-800 rounded-md  w-full p-1 relative -top-2 bg-danger-100">
                  <span className="text-danger-500 font-semibold text-sm max-sm:text-xs">
                    {formInfoClient.errors.materno}
                  </span>
                </div>
              )}
          </div>
          <div
            ref={parent}
            className="w-full col-span-3  flex flex-col gap-2 justify-center items-start text-lg font-extralight max-sm:col-span-6"
          >
            <AppFormLabel label="Calle:" />
            <AppTextField
              placeholder=""
              value={formInfoClient.values.line1}
              name="line1"
              onChange={formInfoClient.handleChange}
              className="w-full"
              onBlur={formInfoClient.handleBlur}
              inputMode="text"
            />
            {formInfoClient.errors.line1 && formInfoClient.touched.line1 && (
              <div className="border border-danger-800 rounded-md  w-full p-1 relative -top-2 bg-danger-100">
                <span className="text-danger-500 font-semibold text-sm max-sm:text-xs">
                  {formInfoClient.errors.line1}
                </span>
              </div>
            )}
          </div>
          <div
            ref={parent}
            className="w-full col-span-2  flex flex-col gap-2 justify-center items-start text-lg font-extralight max-sm:col-span-6"
          >
            <AppFormLabel label="Código Postal:" />
            <AppTextField
              placeholder="5 dígitos"
              value={formInfoClient.values.postalCode}
              name="postalCode"
              onChange={formInfoClient.handleChange}
              className="w-full"
              onBlur={formInfoClient.handleBlur}
              inputMode="numeric"
            />
            {formInfoClient.errors.postalCode &&
              formInfoClient.touched.postalCode && (
                <div className="border border-danger-800 rounded-md w-full p-1 relative -top-2 bg-danger-100">
                  <span className="text-danger-500 font-semibold text-sm max-sm:text-xs">
                    {formInfoClient.errors.postalCode}
                  </span>
                </div>
              )}
          </div>
          <div
            ref={parent}
            className="w-full col-span-3  flex flex-col gap-2 justify-center items-start text-lg font-extralight max-sm:col-span-6"
          >
            <AppFormLabel label="Estado:" />
            <select
              value={formInfoClient.values.state}
              onChange={(ev) => {
                formInfoClient.handleChange(ev);
                setIdEstadoState(parseInt(ev.target.value));
              }}
              name="state"
              onBlur={formInfoClient.handleBlur}
              className="max-sm:text-xs w-full"
            >
              <option value="">Estado</option>
              {estados.map((item) => (
                <option key={item.idEstado} value={item.idEstado}>
                  {item.descripcion}
                </option>
              ))}
            </select>
            {formInfoClient.errors.state && formInfoClient.touched.state && (
              <div className="border border-danger-800 rounded-md  w-full p-1 relative -top-2 bg-danger-100">
                <span className="text-danger-500 font-semibold text-sm max-sm:text-xs">
                  {formInfoClient.errors.state}
                </span>
              </div>
            )}
          </div>
          <div
            ref={parent}
            className="w-full col-span-3  flex flex-col gap-2 justify-center items-start text-lg font-extralight max-sm:col-span-6"
          >
            <AppFormLabel label="Ciudad:" />
            <select
              value={formInfoClient.values.city}
              onChange={(ev) => {
                formInfoClient.handleChange(ev);
                setIdMunicipioState(parseInt(ev.target.value));
              }}
              name="city"
              onBlur={formInfoClient.handleBlur}
              className="max-sm:text-xs w-full"
            >
              <option value={""}>Ciudad</option>
              {municipios.map((item) => (
                <option key={item.idMunicipio} value={item.idMunicipio}>
                  {item.descripcion}
                </option>
              ))}
            </select>
            {formInfoClient.errors.city && formInfoClient.touched.city && (
              <div className="border border-danger-800 rounded-md  w-full p-1 relative -top-2 bg-danger-100">
                <span className="text-danger-500 font-semibold text-sm max-sm:text-xs">
                  {formInfoClient.errors.city}
                </span>
              </div>
            )}
          </div>

          <div
            ref={parent}
            className="w-full col-span-3  flex flex-col gap-2 justify-center items-start text-lg font-extralight max-sm:col-span-12"
          >
            <AppFormLabel label="Correo Electrónico:" />
            <AppTextField
              placeholder="juan@example.com"
              value={formInfoClient.values.correo}
              name="correo"
              onChange={formInfoClient.handleChange}
              className="w-full"
              type="email"
              onBlur={formInfoClient.handleBlur}
              inputMode="email"
            />
            {formInfoClient.errors.correo && formInfoClient.touched.correo && (
              <div className="border border-danger-800 rounded-md bg w-full p-1 relative -top-2 bg-danger-100">
                <span className="text-danger-500 font-semibold text-sm max-sm:text-xs">
                  {formInfoClient.errors.correo}
                </span>
              </div>
            )}
          </div>
          <div
            ref={parent}
            className="w-full col-span-1  flex flex-col gap-2 justify-center items-start text-lg font-extralight max-sm:col-span-6"
          >
            <AppFormLabel label="Edad:" />
            <AppTextField
              placeholder="Edad"
              type="text"
              value={formInfoClient.values.edad}
              name="edad"
              onChange={formInfoClient.handleChange}
              className="w-full"
              onBlur={formInfoClient.handleBlur}
              inputMode="numeric"
            />
            {formInfoClient.errors.edad && formInfoClient.touched.edad && (
              <div className="border border-danger-800 rounded-md bg w-full p-1 relative -top-2 bg-danger-100">
                <span className="text-danger-500 font-semibold text-sm max-sm:text-xs">
                  {formInfoClient.errors.edad}
                </span>
              </div>
            )}
          </div>
          <div
            ref={parent}
            className="w-full col-span-2  flex flex-col gap-2 justify-center items-start text-lg font-extralight max-sm:col-span-6"
          >
            <AppFormLabel label="Sexo:" />
            <select
              value={formInfoClient.values.sexo}
              name="sexo"
              onChange={formInfoClient.handleChange}
              onBlur={formInfoClient.handleBlur}
              className="max-sm:text-xs w-full"
            >
              <option value="">Selecciona una opción</option>
              <option value="Masculino">Masculino</option>
              <option value="Femenino">Femenino</option>
            </select>
            {formInfoClient.errors.sexo && formInfoClient.touched.sexo && (
              <div className="border border-danger-800 rounded-md bg w-full p-1 relative -top-2 bg-danger-100">
                <span className="text-danger-500 font-semibold text-sm max-sm:text-xs">
                  {formInfoClient.errors.sexo}
                </span>
              </div>
            )}
          </div>

          {/* <div
            ref={parent}
            className="w-full col-span-2 flex flex-col gap-2 justify-center items-start text-lg font-extralight max-sm:col-span-6"
          >
            <AppFormLabel label="Meses sin Intereses" />
            <select
              value={formInfoClient.values.mesesSI}
              onChange={formInfoClient.handleChange}
              name="mesesSI"
              onBlur={formInfoClient.handleBlur}
              className="max-sm:text-xs"
            >
              <option value="">Escoge una opción</option>
              <option value="0">Una sola exhibición</option>
              <option value="3">3 Meses sin Intereses</option>
              <option value="6">6 Meses sin Intereses</option>
              <option value="9">9 Meses sin Intereses</option>
              <option value="12">12 Meses sin Intereses</option>
            </select>
            {formInfoClient.errors.mesesSI &&
              formInfoClient.touched.mesesSI && (
                <div className="border border-danger-800 rounded-md bg w-full p-1 relative -top-2 bg-danger-100">
                  <span className="text-danger-500 font-semibold text-sm max-sm:text-xs">
                    {formInfoClient.errors.mesesSI}
                  </span>
                </div>
              )}
          </div> */}
        </div>
        <div className="max-sm:hidden">
          <FooterModal />
        </div>
        <hr className="max-sm:hidden" />
      </div>
    </>
  );
};
