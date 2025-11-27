import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { AppFormField } from "../../../../../presentation/Components/AppForm";
import AppSelect from "../../../../../presentation/Components/AppSelect";
import { useGetAseguradoras } from "../../../../new-order/web/hooks/use-get-aseguradoras";
import { useEffect } from "react";
import { Form, Formik } from "formik";
import { useCreatePatient } from "../../hooks/use-create-patient";
import { AppToast } from "../../../../../presentation/Components/AppToast";
type AppCreatePatientModalProps = {
  isVisible: boolean;
  onClose: () => void;
};
type AppCreatePatientFormValues = {
  telefono: string;
  poliza: string;
  idAseguradora: number;
  Email: string;
};
export const AppCreatePatientModal = ({
  isVisible,
  onClose,
}: AppCreatePatientModalProps) => {
  const { aseguradoras, getAseguradoras } = useGetAseguradoras();
  const { createPatient, loading, error, isCreated } = useCreatePatient();
  const handleSubmit = async (values: AppCreatePatientFormValues) => {
    await createPatient({
      Telefono: values.telefono,
      Email: values.Email,
      Poliza: values.poliza,
      idAseguradora: Number(values.idAseguradora),
    });
    // if (response.idPersona && response.idPersona > 0) {
    //   AppToast().fire({
    //     icon: "success",
    //     title: "Paciente creado",
    //     text: "El paciente se ha creado correctamente.",
    //   });
    //   onClose();
    // }
  };
  useEffect(() => {
    getAseguradoras();
  }, []);
  useEffect(() => {
    if (error) {
      AppToast().fire({
        icon: "error",
        title: "Error al crear el paciente",
        text: "Ocurrió un error al crear el paciente. Por favor, intenta de nuevo.",
      });
    }
  }, [error]);
  useEffect(() => {
    console.log(isCreated);
    if (!isCreated) return;

    if (isCreated.idPersona && isCreated.idPersona > 0) {
      AppToast().fire({
        icon: "success",
        title: "Paciente creado",
        text: "El paciente se ha creado correctamente.",
      });

      onClose();
    }
  }, [isCreated]);
  return (
    <Modal
      isOpen={isVisible}
      onClose={onClose}
      size="md"
      backdrop="opaque"
      scrollBehavior="outside"
      isDismissable={false}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <Formik
              enableReinitialize={true}
              initialValues={{
                telefono: "",
                poliza: "",
                idAseguradora: 0,
                Email: "",
              }}
              onSubmit={handleSubmit}
              // onReset={onClose}
            >
              {({ values, handleSubmit, handleChange }) => {
                return (
                  <Form onSubmit={handleSubmit} autoComplete="off">
                    <ModalHeader>Alta de Paciente</ModalHeader>
                    <ModalBody>
                      {/* <div className="grid grid-cols-12 gap-4"> */}
                      <Input
                        className="col-span-4"
                        label="Teléfono"
                        id="telefono"
                        name="telefono"
                        value={values.telefono}
                        onChange={handleChange}
                        isRequired
                        errorMessage="Campo requerido"
                      />
                      <Input
                        className="col-span-4"
                        label="Correo electrónico"
                        id="Email"
                        name="Email"
                        value={values.Email}
                        onChange={handleChange}
                        isRequired
                        errorMessage="Campo requerido"
                      />
                      <Input
                        className="col-span-4"
                        label="Poliza"
                        id="poliza"
                        name="poliza"
                        value={values.poliza}
                        onChange={handleChange}
                        isRequired
                        errorMessage="Campo requerido"
                      />
                      <AppFormField className="col-span-4">
                        <AppSelect
                          name="idAseguradora"
                          id="idAseguradora"
                          value={values.idAseguradora}
                          onChange={handleChange}
                          required
                        >
                          <option value="">Selecciona una aseguradora</option>
                          {aseguradoras?.map((aseguradora) => (
                            <option
                              key={aseguradora.idAseguradora}
                              value={aseguradora.idAseguradora}
                            >
                              {aseguradora.descripcion}
                            </option>
                          ))}
                        </AppSelect>
                      </AppFormField>
                    </ModalBody>
                    <ModalFooter>
                      <Button
                        color="danger"
                        onPress={onClose}
                        className=""
                        size="md"
                        variant="bordered"
                      >
                        Cerrar
                      </Button>
                      <Button
                        color="primary"
                        type="submit"
                        isDisabled={loading}
                        isLoading={loading}
                      >
                        Guardar
                      </Button>
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
