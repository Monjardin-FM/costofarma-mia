import { Button, Pagination, Tooltip } from "@nextui-org/react";
import { AppAuthorizationGuard } from "../../../../presentation/Components/AppAuthorizationGuard";
import { AppPageTransition } from "../../../../presentation/Components/AppPageTransition";
import AppConfig from "../../../../settings.json";
import { UserRole } from "../../../user/domain/entities/user-role";
import { NewOrderHeader } from "./NewOrderHeader";
import { User } from "react-feather";
import { useEffect, useMemo, useState } from "react";
import { useGetProduct } from "../hooks/use-get-product";
import { NewOrderTable } from "./tables/NewOrderTable";
import { useShoppingCart } from "../hooks/use-shopping-cart";
import {
  ShoppingCartForm,
  ShoppingCartFormValues,
} from "./modals/ShoppingCartForm";
import { useToggle } from "react-use";
import { AppToast } from "../../../../presentation/Components/AppToast";
import * as Icon from "react-feather";
import { ShoppingCartViewer } from "./modals/ShoppingCartViewer";
import {
  ShoppingCartPatientInfo,
  ShoppingCartPatientInfoValues,
} from "./modals/ShoppingCartPatientInfo";
import { ShoppingCartConfirmOrder } from "./modals/ShoppingCartConfirmOrder";
import { useTour } from "../../../../presentation/Components/AppTour/useTour";
import { Step } from "react-joyride";
import { StepperFormPayment } from "../../../Modals/StepperFormPayment";
import { DeliverInfo } from "./DeliverInfo";
export type ShoppingCartFormMode = "create" | "update";
const STEPS: Step[] = [
  {
    target: "#carrito", // clase o selector del elemento
    content: "Aquí puedes ver el carrito de compra",
    placement: "left",
  },
  {
    target: "#patient-info", // clase o selector del elemento
    content: "Aquí puedes ingresar la información del paciente",
    placement: "left",
  },
  {
    target: "#save-order", // clase o selector del elemento
    content: "Desde este botón puedes guardar el pedido",
    placement: "left",
  },
  {
    target: "#agregar-carrito", // clase o selector del elemento
    content: "Desde este botón puedes agregar el producto al carrito de compra",
    placement: "left",
  },
];
export const NewOrderManagerPage = () => {
  const [search, setSearch] = useState<string>("");
  const { getProduct, products } = useGetProduct();
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(0);
  const [productIndex, setProductIndex] = useState<number | null>(null);
  const [onShoppingCartForm, toggleShoppingCartForm] = useToggle(false);
  const [shoppingCartIndex, setShoppingCartIndex] = useState<number | null>(
    null
  );
  const [onPaymentComplete, setOnPaymentComplete] = useState<
    (() => void) | null
  >(null);
  const [modalPayment, setModalPayment] = useState(false);
  const [confirmOrderModal, setConfirmOrderModal] = useToggle(false);
  const [onShoppingCartViewer, toggleShoppingCartViewer] = useToggle(false);
  const [onCustomerForm, toggleCustomerForm] = useToggle(false);
  const {
    addItem: addItemToShoppingCart,
    updateItem,
    cart: shoppingCartItems,
    removeItem,
    clear: clearShoppingCart,
  } = useShoppingCart();
  const [shoppingCartValues, setShoppingCartFormValues] =
    useState<ShoppingCartFormValues>();
  const [shoppingCartFormMode, setShoppingCartFormMode] =
    useState<ShoppingCartFormMode>("create");
  const tourAcciones = useTour(STEPS, "TourAccionesNuevaOrden");
  useEffect(() => {
    // Si el usuario ya completó el tour, no lo vuelvas a ejecutar
    const tourDone = localStorage.getItem("TourAccionesNuevaOrden");
    if (tourDone === "done") return;

    // Si ya hay productos y el tour aún no está corriendo, lo lanzamos
    if (products && products.length > 0 && !tourAcciones.run) {
      const timeout = setTimeout(() => {
        tourAcciones.setRun(true);
      }, 400); // Esperamos un poco para asegurar que el DOM esté listo

      return () => clearTimeout(timeout);
    }
  }, [products, tourAcciones]);
  const rowsPerPage = 10;
  const [patientFormValues, setPatientFormValues] =
    useState<ShoppingCartPatientInfoValues>({
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
    });
  const onSelectShoppingCartItem = (index: number) => {
    const shoppigCartItem = shoppingCartItems[index];
    if (shoppigCartItem) {
      setShoppingCartFormValues({
        descripcion: shoppigCartItem.descripcion,
        ean: shoppigCartItem.ean,
        idOrdenDetalle: shoppigCartItem.idOrdenDetalle,
        idProducto: shoppigCartItem.idProducto ?? 0,
        precio: shoppigCartItem.precio,
        cantidad: shoppigCartItem.cantidad,
        requiereReceta: shoppigCartItem.requiereReceta,
      });
    }
    setShoppingCartFormMode("update");
    setShoppingCartIndex(index);
    toggleShoppingCartViewer(false);
    toggleShoppingCartForm(true);
  };
  const updateItemOnShoppingCart = (payload: ShoppingCartFormValues) => {
    if (shoppingCartIndex !== null) {
      updateItem({
        changes: payload,
        index: shoppingCartIndex,
      });
      AppToast().fire({
        icon: "success",
        title: "Se ha actualizado el articulo de compra",
      });
    }
  };

  const addToShoppingCart = (data: ShoppingCartFormValues) => {
    if (productIndex !== null && products) {
      const productOnFocus = products[productIndex];
      addItemToShoppingCart({
        item: {
          ...data,
          idProducto: productOnFocus.idProducto,
          ean: productOnFocus.ean,
          descripcion: productOnFocus.descripcion,
          cantidad: data.cantidad,
          precio: productOnFocus.precio,
          requiereReceta: productOnFocus.requiereReceta,
          idOrdenDetalle: 0,
        },
      });
      AppToast().fire({
        icon: "success",
        title: "Producto agregado a carrito de compra",
      });
    }
  };
  const shoppingCartFormHandler = (payload: ShoppingCartFormValues) => {
    if (shoppingCartFormMode === "create") addToShoppingCart(payload);
    else updateItemOnShoppingCart(payload);
    toggleShoppingCartForm(false);
  };

  const onAddHandler = (index: number) => {
    if (products) {
      const globalIndex = (page - 1) * rowsPerPage + index; // índice real en products
      const product = products[globalIndex];
      if (!product) return;

      setShoppingCartFormValues({
        descripcion: product.descripcion,
        ean: product.ean,
        cantidad: 0,
        idProducto: product.idProducto,
        precio: product.precio,
        requiereReceta: product.requiereReceta,
        idOrdenDetalle: 0,
      });
      setProductIndex(globalIndex);
      setShoppingCartFormMode("create");
      toggleShoppingCartForm(true);
    }
  };
  const onDeleteHandler = () => {
    if (shoppingCartIndex !== null) {
      removeItem({
        index: shoppingCartIndex,
      });
      toggleShoppingCartForm(false);
      AppToast().fire({
        icon: "info",
        title: "Producto eliminado del carrito de compra",
      });
    }
  };
  const data = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return products?.slice(start, end);
  }, [page, products]);

  const onSearch = (search: string) => {
    getProduct({ description: search });
  };
  // const onPayStep = () => {
  //   return true;
  // };
  const onPay = () => {
    return new Promise<boolean>((resolve) => {
      const handlePaymentDone = () => {
        resolve(true);
        setModalPayment(false);
      };

      setOnPaymentComplete(() => handlePaymentDone);
      setModalPayment(true);
    });
  };
  useEffect(() => {
    if (search.length > 1 || search.length === 0) {
      const timeDelay = setTimeout(() => {
        onSearch(search);
      }, 50);
      return () => clearTimeout(timeDelay);
    }
  }, [search]);
  useEffect(() => {
    if (products) {
      const nPages = Math.ceil(products?.length / rowsPerPage);
      setPages(nPages);
    }
  }, [products]);

  return (
    <AppAuthorizationGuard
      redirect={{ to: "/" }}
      roles={
        AppConfig[
          "masterOrder.managementPage.actionsAuthorization"
        ] as UserRole[]
      }
    >
      {/* Formulario para agregar al carrito de compra */}
      <ShoppingCartForm
        mode={shoppingCartFormMode}
        isVisible={onShoppingCartForm}
        initialValues={shoppingCartValues}
        onClose={() => toggleShoppingCartForm(false)}
        onSubmit={shoppingCartFormHandler}
        onDelete={onDeleteHandler}
      />
      {/* Modal de Carrito de compras */}
      <ShoppingCartViewer
        onTab={onSelectShoppingCartItem}
        isVisible={onShoppingCartViewer}
        items={shoppingCartItems}
        onClose={() => toggleShoppingCartViewer(false)}
      />
      {/* Modal para ingresar información del paciente */}
      <ShoppingCartPatientInfo
        isVisible={onCustomerForm}
        onClose={() => toggleCustomerForm(false)}
        patientFormValues={patientFormValues}
        setPatientFormValues={setPatientFormValues}
      />
      <StepperFormPayment
        isVisible={modalPayment}
        onClose={() => {
          setModalPayment(false);
        }}
        // idOrder={}
        onPay={() => {
          if (onPaymentComplete) {
            onPaymentComplete(); // se resuelve la promesa
          }
          return true;
        }}
      />
      {/* Modal para confirmar pedido */}
      <ShoppingCartConfirmOrder
        isVisible={confirmOrderModal}
        onClose={() => {
          setConfirmOrderModal(false);
        }}
        onPay={onPay}
        items={shoppingCartItems}
        patientInfo={patientFormValues}
        onEdit={() => {
          toggleCustomerForm(true);
          setConfirmOrderModal(false);
        }}
        onConfirm={() => {
          setPatientFormValues({
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
          });
          clearShoppingCart();
        }}
      />
      <AppPageTransition>
        <div className="items-center mx-auto mb-5">
          <NewOrderHeader
            onSearch={onSearch}
            search={search}
            setSearch={setSearch}
            mode="new"
          />
          <section className="container px-4 mt-12 pb-16 mx-auto">
            <div className="flex items-center justify-center">
              <DeliverInfo />
            </div>
            <div className="flex justify-end gap-2">
              <div className="flex flex-row items-center justify-end gap-2">
                {tourAcciones.tour}
                <div className="flex-none relative">
                  {shoppingCartItems.length > 0 && (
                    <div className="absolute -right-2 -top-2 h-6 w-6 bg-primary-500 rounded-full font-semibold text-primary-100 text-sm flex items-center justify-center z-50">
                      <span>{shoppingCartItems.length}</span>
                    </div>
                  )}
                  <div className="group relative inline-block text-center">
                    <Tooltip
                      content="Ver Carrito de Compra"
                      color="primary"
                      disableAnimation
                    >
                      <Button
                        onClick={() => toggleShoppingCartViewer(true)}
                        title="Ver carrito de compra"
                        type="button"
                        size="md"
                        isIconOnly
                      >
                        <Icon.ShoppingCart size={18} id="carrito" />
                      </Button>
                    </Tooltip>
                  </div>
                </div>
                <Tooltip
                  content="Información del paciente"
                  color="primary"
                  disableAnimation
                >
                  <Button
                    variant="shadow"
                    size="md"
                    color="default"
                    startContent={<User size={18} id="patient-info" />}
                    onClick={() => {
                      toggleCustomerForm(true);
                    }}
                    isIconOnly
                  ></Button>
                </Tooltip>
                <Tooltip
                  content="Generar pedido"
                  color="primary"
                  disableAnimation
                >
                  <Button
                    isIconOnly
                    size="md"
                    color="primary"
                    onClick={() => setConfirmOrderModal(true)}
                    isDisabled={
                      (!patientFormValues.rfc &&
                        !patientFormValues.nombre &&
                        !patientFormValues.paterno &&
                        !patientFormValues.Calle &&
                        patientFormValues.Municipio === 0 &&
                        patientFormValues.Estado === 0 &&
                        !patientFormValues.CP &&
                        !patientFormValues.Telefono &&
                        !patientFormValues.Mail) ||
                      shoppingCartItems.length === 0
                    }
                  >
                    <Icon.Save size={18} id="save-order" />
                  </Button>
                </Tooltip>
              </div>
            </div>
            <div className="mt-5 flex flex-col items-center w-full justify-center gap-5 mb-10">
              <div className="w-full container mx-auto">
                <NewOrderTable
                  onAdd={(data) => onAddHandler(data.index)}
                  items={data}
                  tour={tourAcciones.tour}
                />
              </div>
              <div>
                <Pagination
                  loop
                  isCompact
                  showControls
                  showShadow
                  color="primary"
                  page={page}
                  total={pages}
                  onChange={(page) => setPage(page)}
                  className="w-full"
                />
              </div>
            </div>
          </section>
        </div>
      </AppPageTransition>
    </AppAuthorizationGuard>
  );
};
