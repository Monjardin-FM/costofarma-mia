import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { Form, Formik } from "formik";
import { useEffect } from "react";
import { useGetMunicipios } from "../../hooks/use-get-municipios";
import AppSelect from "../../../../../presentation/Components/AppSelect";
import { useGetEstados } from "../../hooks/use-get-estados";
import { AppFormField } from "../../../../../presentation/Components/AppForm";
import { useGetColonias } from "../../hooks/use-get-colonias";
export type ShoppingCartPatientInfoValues = {
  rfc: string;
  nombre: string;
  paterno: string;
  materno: string;
  Calle: string;
  Colonia: string;
  Municipio: number;
  Estado: number;
  CP: string;
  Referencia1?: string;
  Referencia2?: string;
  Telefono: string;
  Mail: string;
};
export type ShoppingCartAddressProps = {
  isVisible?: boolean;
  onClose?: () => void;
};
export const ShoppingCartPatientInfo = ({
  isVisible,
  onClose,
}: ShoppingCartAddressProps) => {
  const { getMunicipios, municipios } = useGetMunicipios();
  const { getEstados, estados } = useGetEstados();
  const { colonias, getColonias } = useGetColonias();

  const initialValues: ShoppingCartPatientInfoValues = {
    rfc: "",
    nombre: "",
    paterno: "",
    materno: "",
    Calle: "",
    Colonia: "",
    Municipio: 0,
    Estado: 0,
    CP: "",
    Referencia1: "",
    Referencia2: "",
    Telefono: "",
    Mail: "",
  };
  useEffect(() => {
    getEstados();
  }, []);
  return (
    <Modal
      isOpen={isVisible}
      onClose={onClose}
      size="4xl"
      backdrop="blur"
      scrollBehavior="outside"
      isDismissable={false}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <Formik
              enableReinitialize
              initialValues={initialValues}
              onSubmit={() => {}}
              onReset={onClose}
              // validationSchema={ShoppingCartSchema}
            >
              {({
                handleSubmit,
                values,
                handleChange,
                // errors,
                setFieldValue,
              }) => {
                // Cargar Municipios cuando cambia Estado
                useEffect(() => {
                  if (values.Estado > 0) {
                    getMunicipios({
                      idEstado: values.Estado,
                    });
                  } else {
                    // setMunicipios([]);
                    setFieldValue("Municipio", 0);
                  }
                }, [values.Estado, setFieldValue]);
                useEffect(() => {
                  if (values.Municipio > 0) {
                    getColonias({
                      idMunicipio: values.Estado,
                      codigoPostal: values.CP,
                    });
                  } else {
                    // setMunicipios([]);
                    setFieldValue("Colonia", 0);
                  }
                }, [values.Municipio, values.CP, setFieldValue]);
                return (
                  <Form onSubmit={handleSubmit} autoComplete="off ">
                    <ModalHeader>Información del Paciente</ModalHeader>
                    <ModalBody>
                      {/* Datos Persona */}
                      <h2 className="text-lg font-bold">Datos del Paciente</h2>
                      <div className="grid grid-cols-6 gap-4">
                        <Input
                          className="col-span-2"
                          label="RFC"
                          name="rfc"
                          value={values.rfc}
                          onChange={handleChange}
                          id="rfc"
                          type="text"
                        />
                        <Input
                          className="col-span-2"
                          label="Nombre"
                          name="nombre"
                          value={values.nombre}
                          onChange={handleChange}
                        />
                        <Input
                          className="col-span-2"
                          label="Apellido Paterno"
                          name="paterno"
                          value={values.paterno}
                          type="text"
                          onChange={handleChange}
                        />
                        <Input
                          className="col-span-2"
                          label="Apellido Materno"
                          name="materno"
                          value={values.materno}
                          type="text"
                          onChange={handleChange}
                        />
                      </div>

                      {/* Dirección */}
                      <h2 className="text-lg font-bold">Dirección</h2>
                      <div className="grid grid-cols-6 gap-4 mb-4">
                        <Input
                          className="col-span-2"
                          label="Calle"
                          name="Calle"
                          value={values.Calle}
                          type="text"
                          onChange={handleChange}
                        />
                        <Input
                          className="col-span-2"
                          label="Colonia"
                          name="Colonia"
                          value={values.Colonia}
                          onChange={handleChange}
                        />

                        {/* Estado */}
                        <AppFormField className="col-span-2">
                          <AppSelect
                            name="Estado"
                            value={values.Estado}
                            onChange={handleChange}
                          >
                            <option value="">Selecciona un estado</option>
                            {estados?.map((estado) => (
                              <option
                                key={estado.idEstado}
                                value={estado.idEstado}
                              >
                                {estado.descripcion}
                              </option>
                            ))}
                          </AppSelect>
                        </AppFormField>

                        {/* Municipios */}
                        <AppFormField className="col-span-2">
                          <AppSelect
                            name="Municipio"
                            value={values.Municipio}
                            onChange={handleChange}
                            disabled={municipios && municipios.length === 0}
                          >
                            <option value="">
                              {municipios && municipios.length === 0
                                ? "Selecciona un estado"
                                : "Selecciona un municipio"}
                            </option>
                            {municipios?.map((municipio) => (
                              <option
                                key={municipio.idMunicipio}
                                value={municipio.idMunicipio}
                              >
                                {municipio.descripcion}
                              </option>
                            ))}
                          </AppSelect>
                        </AppFormField>

                        <Input
                          className="col-span-2"
                          label="Código Postal"
                          name="CP"
                          value={values.CP}
                          onChange={handleChange}
                        />
                        {/* Colonias */}
                        <AppFormField className="col-span-2">
                          <AppSelect
                            name="Colonia"
                            value={values.Municipio}
                            onChange={handleChange}
                            disabled={colonias && colonias.length === 0}
                          >
                            <option value="">
                              {colonias && colonias.length === 0
                                ? "Selecciona un municipio"
                                : "Selecciona una colonia"}
                            </option>
                            {colonias?.map((colonia) => (
                              <option
                                key={colonia.idColonia}
                                value={colonia.idColonia}
                              >
                                {colonia.descripcion}
                              </option>
                            ))}
                          </AppSelect>
                        </AppFormField>

                        <Input
                          className="col-span-2"
                          label="Referencia 1"
                          name="Referencia1"
                          value={values.Referencia1 || ""}
                          onChange={handleChange}
                        />
                        <Input
                          className="col-span-2"
                          label="Referencia 2"
                          name="Referencia2"
                          value={values.Referencia2 || ""}
                          onChange={handleChange}
                        />
                        <Input
                          className="col-span-2"
                          label="Teléfono"
                          name="Telefono"
                          value={values.Telefono}
                          onChange={handleChange}
                        />
                        <Input
                          className="col-span-2"
                          label="Correo"
                          name="Mail"
                          value={values.Mail}
                          onChange={handleChange}
                        />
                      </div>
                    </ModalBody>
                    <ModalFooter>
                      <Button
                        color="default"
                        onClick={onClose}
                        className=""
                        size="md"
                      >
                        Cancelar
                      </Button>
                      <Button color="primary">Guardar</Button>
                    </ModalFooter>
                  </Form>
                );
              }}
            </Formik>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
