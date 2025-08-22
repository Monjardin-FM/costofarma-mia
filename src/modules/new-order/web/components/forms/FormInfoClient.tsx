import { useEffect } from "react";
import { useGetColonias } from "../../hooks/use-get-colonias";
import { useGetEstados } from "../../hooks/use-get-estados";
import { useGetMunicipios } from "../../hooks/use-get-municipios";
import { ShoppingCartPatientInfoValues } from "../modals/ShoppingCartPatientInfo";
import { Form, Formik } from "formik";
import { AppToast } from "../../../../../presentation/Components/AppToast";
import { Button, Input, ModalFooter } from "@nextui-org/react";
import AppSelect from "../../../../../presentation/Components/AppSelect";
import { AppFormField } from "../../../../../presentation/Components/AppForm";
import * as Icon from "react-feather";
export type ShoppingCartViewerProps = {
  patientFormValues: ShoppingCartPatientInfoValues;
  setPatientFormValues: (values: ShoppingCartPatientInfoValues) => void;
  onClose?: () => void;
  mode: "view" | "edit" | "regenerate";
  onEdit?: () => void;
};

export const FormInfoClient = ({
  patientFormValues,
  setPatientFormValues,
  onClose = () => {},
  onEdit = () => {},
  mode,
}: ShoppingCartViewerProps) => {
  const { getMunicipios, municipios } = useGetMunicipios();
  const { getEstados, estados } = useGetEstados();
  const { colonias, getColonias } = useGetColonias();

  const initialValues: ShoppingCartPatientInfoValues = {
    rfc: patientFormValues.rfc ?? "",
    nombre: patientFormValues.nombre ?? "",
    paterno: patientFormValues.paterno ?? "",
    materno: patientFormValues.materno ?? "",
    Calle: patientFormValues.Calle ?? "",
    Colonia: patientFormValues.Colonia ?? "",
    Municipio: patientFormValues.Municipio ?? 0,
    Estado: patientFormValues.Estado ?? 0,
    CP: patientFormValues.CP ?? "",
    Referencia1: patientFormValues.Referencia1 ?? "",
    Referencia2: patientFormValues.Referencia2 ?? "",
    Telefono: patientFormValues.Telefono ?? "",
    Mail: patientFormValues.Mail ?? "",
  };
  useEffect(() => {
    getEstados();
  }, []);
  return (
    <>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        onSubmit={(values) => {
          setPatientFormValues(values);
          onClose();
          AppToast().fire({
            title: "Información guardada",
            text: "La información del paciente ha sido guardada correctamente.",
            icon: "success",
          });
        }}
        onReset={onClose}
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
            if (
              values.Municipio > 0 &&
              values.CP.length === 5
              // values.CP.trim() !== ""
            ) {
              getColonias({
                idMunicipio: Number(values.Municipio),
                codigoPostal: values.CP,
              });
            } else {
              setFieldValue("Colonia", "");
            }
          }, [values.Municipio, values.CP, setFieldValue]);

          return (
            <Form onSubmit={handleSubmit} autoComplete="off ">
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
                  isRequired
                  errorMessage="Campo requerido"
                  readOnly={mode === "view"}
                />
                <Input
                  className="col-span-2"
                  label="Nombre"
                  name="nombre"
                  value={values.nombre}
                  onChange={handleChange}
                  isRequired
                  errorMessage="Campo requerido"
                  readOnly={mode === "view"}
                />
                <Input
                  className="col-span-2"
                  label="Apellido Paterno"
                  name="paterno"
                  value={values.paterno}
                  type="text"
                  onChange={handleChange}
                  isRequired
                  errorMessage="Campo requerido"
                  readOnly={mode === "view"}
                />
                <Input
                  className="col-span-2"
                  label="Apellido Materno"
                  name="materno"
                  value={values.materno}
                  type="text"
                  onChange={handleChange}
                  isRequired
                  errorMessage="Campo requerido"
                  readOnly={mode === "view"}
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
                  isRequired
                  errorMessage="Campo requerido"
                  readOnly={mode === "view"}
                />

                {/* Estado */}
                <AppFormField className="col-span-2">
                  <AppSelect
                    name="Estado"
                    value={values.Estado}
                    onChange={handleChange}
                    required
                    disabled={mode === "view"}
                  >
                    <option value="">Selecciona un estado</option>
                    {estados?.map((estado) => (
                      <option key={estado.idEstado} value={estado.idEstado}>
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
                    disabled={mode === "view"}
                  >
                    <option value="">Selecciona un municipio</option>
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
                  isRequired
                  errorMessage="Campo requerido"
                  readOnly={mode === "view"}
                />
                {/* Colonias */}
                <AppFormField className="col-span-2">
                  {colonias && colonias.length > 0 ? (
                    <AppSelect
                      name="Colonia"
                      value={values.Colonia}
                      onChange={handleChange}
                      disabled={mode === "view"}
                    >
                      <option value="">Selecciona una colonia</option>
                      {colonias.map((colonia) => (
                        <option
                          key={colonia.idColonia}
                          value={colonia.descripcion}
                        >
                          {colonia.descripcion}
                        </option>
                      ))}
                    </AppSelect>
                  ) : (
                    <Input
                      type="text"
                      name="Colonia"
                      value={values.Colonia}
                      onChange={handleChange}
                      disabled={mode === "view"}
                      placeholder="Escribe tu colonia"
                      readOnly={mode === "view"}
                    />
                  )}
                </AppFormField>

                <Input
                  className="col-span-2"
                  label="Referencia 1"
                  name="Referencia1"
                  value={values.Referencia1 || ""}
                  onChange={handleChange}
                  readOnly={mode === "view"}
                />
                <Input
                  className="col-span-2"
                  label="Referencia 2"
                  name="Referencia2"
                  value={values.Referencia2 || ""}
                  onChange={handleChange}
                  readOnly={mode === "view"}
                />
                <Input
                  className="col-span-2"
                  label="Teléfono"
                  name="Telefono"
                  value={values.Telefono}
                  onChange={handleChange}
                  isRequired
                  errorMessage="Campo requerido"
                  readOnly={mode === "view"}
                />
                <Input
                  className="col-span-2"
                  label="Correo"
                  name="Mail"
                  value={values.Mail}
                  onChange={handleChange}
                  isRequired
                  errorMessage="Campo requerido"
                  readOnly={mode === "view"}
                />
              </div>
              {mode === "edit" ? (
                <ModalFooter>
                  <Button
                    color="default"
                    onClick={onClose}
                    className=""
                    size="md"
                  >
                    Cancelar
                  </Button>
                  <Button
                    type="submit"
                    color="primary"
                    isDisabled={
                      !values.rfc ||
                      !values.nombre ||
                      !values.paterno ||
                      !values.materno ||
                      !values.Calle ||
                      !values.CP ||
                      !values.Telefono ||
                      !values.Mail ||
                      values.Estado === 0 ||
                      values.Municipio === 0
                    }
                  >
                    Guardar
                  </Button>
                </ModalFooter>
              ) : mode === "view" ? (
                <ModalFooter>
                  <Button
                    color="primary"
                    onClick={onEdit}
                    startContent={<Icon.Edit size={18} />}
                  >
                    Editar Información
                  </Button>
                </ModalFooter>
              ) : (
                <ModalFooter>
                  <Button
                    type="submit"
                    color="primary"
                    isDisabled={
                      !values.rfc ||
                      !values.nombre ||
                      !values.paterno ||
                      !values.materno ||
                      !values.Calle ||
                      !values.CP ||
                      !values.Telefono ||
                      !values.Mail ||
                      values.Estado === 0 ||
                      values.Municipio === 0
                    }
                  >
                    Guardar
                  </Button>
                </ModalFooter>
              )}
            </Form>
          );
        }}
      </Formik>
    </>
  );
};
