import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Radio,
  RadioGroup,
} from "@nextui-org/react";
import { ShoppingCartFormMode } from "../NewOrderManagerPage";
import * as Yup from "yup";
import { Formik } from "formik";

export type ShoppingCartFormValues = {
  idProducto: number;
  ean: string;
  descripcion: string;
  cantidad: number;
  precio: number;
  requiereReceta: boolean;
  idOrdenDetalle: number;
  recurrencia:
    | "semanal"
    | "quincenal"
    | "mensual"
    | "bimestral"
    | "trimestral"
    | "semestral"
    | ""
    | string;
  //   activo?: boolean;
};

type ShoppingCartFormProps = {
  isVisible: boolean;
  onClose: () => void;
  mode: ShoppingCartFormMode;
  onSubmit: (data: ShoppingCartFormValues) => void;
  initialValues?: ShoppingCartFormValues;
  onDelete?: () => void;
};
const ShoppingCartSchema = Yup.object().shape({
  cantidad: Yup.number()
    .integer("La cantidad de articulos tienen que ser enteros")
    .min(1, "Los articulos tienen que ser mayores a cero")
    .required("Es necesario especificar una cantidad"),
});
export const ShoppingCartForm = ({
  isVisible,
  mode,
  onClose,
  initialValues = {
    cantidad: 0,
    ean: "",
    descripcion: "",
    idOrdenDetalle: 0,
    idProducto: 0,
    precio: 0,
    requiereReceta: false,
    recurrencia: "",
  },
  onSubmit,
  onDelete = () => {},
}: ShoppingCartFormProps) => {
  return (
    <Modal
      isOpen={isVisible}
      onClose={onClose}
      size="xl"
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
              onSubmit={onSubmit}
              onReset={onClose}
              validationSchema={ShoppingCartSchema}
            >
              {({
                handleSubmit,
                values,
                handleChange,
                errors,
                setFieldValue,
              }) => (
                <form onSubmit={handleSubmit} autoComplete="off ">
                  <ModalHeader>
                    {mode === "create" ? "Agregar" : "Actualizar"}
                  </ModalHeader>
                  <ModalBody>
                    <div className="grid grid-cols-4 gap-4">
                      <Input
                        className="col-span-4"
                        id="descripcion"
                        label="Artículo"
                        name="descripcion"
                        type="text"
                        disabled
                        value={values.descripcion}
                      />
                      <Input
                        className="col-span-2"
                        id="ean"
                        label="EAN"
                        name="ean"
                        type="text"
                        disabled
                        value={values.ean}
                      />
                      <Input
                        className="col-span-2"
                        id="cantidad"
                        label="Cantidad"
                        name="cantidad"
                        type="number"
                        value={values.cantidad.toString()}
                        min={0}
                        step={1}
                        onChange={handleChange}
                        errorMessage={errors.cantidad}
                      />
                      <RadioGroup
                        label="Recurrencia"
                        orientation="horizontal"
                        className="col-span-4"
                        value={values.recurrencia}
                        onValueChange={(val) =>
                          setFieldValue("recurrencia", val)
                        }
                      >
                        <Radio value="semanal">Semanal</Radio>
                        <Radio value="quincenal">Quincenal</Radio>
                        <Radio value="mensual">Mensual</Radio>
                        <Radio value="bimestral">Bimestral</Radio>
                        <Radio value="trimestral">Trimestral</Radio>
                        <Radio value="semestral">Semestral</Radio>
                      </RadioGroup>
                    </div>
                  </ModalBody>
                  <ModalFooter>
                    <div className="flex flex-row items-end justify-end gap-2">
                      <Button onPress={onClose}>Cancel</Button>
                      {mode === "update" && (
                        <Button
                          onPress={() => onDelete()}
                          type="button"
                          color="danger"
                          variant="bordered"
                        >
                          Eliminar
                        </Button>
                      )}

                      <Button
                        type="submit"
                        color="primary"
                        isDisabled={
                          values.cantidad <= 0 || values.recurrencia === ""
                        }
                      >
                        {mode === "create" ? "Guardar" : "Actualizar"}
                      </Button>
                    </div>
                  </ModalFooter>
                </form>
              )}
            </Formik>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
