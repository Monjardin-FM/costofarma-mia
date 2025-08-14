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
import { ShoppingCartPatientInfo } from "./modals/ShoppingCartPatientInfo";
export type ShoppingCartFormMode = "create" | "update";

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
  const [onShoppingCartViewer, toggleShoppingCartViewer] = useToggle(false);
  const [onCustomerForm, toggleCustomerForm] = useToggle(false);

  const {
    addItem: addItemToShoppingCart,

    updateItem,
    cart: shoppingCartItems,
    // removeItem,
    // clear: clearShoppingCart,
  } = useShoppingCart();
  const [shoppingCartValues, setShoppingCartFormValues] =
    useState<ShoppingCartFormValues>();
  const [shoppingCartFormMode, setShoppingCartFormMode] =
    useState<ShoppingCartFormMode>("create");
  const rowsPerPage = 10;

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
      const product = products[index];
      setShoppingCartFormValues({
        descripcion: product.descripcion,
        ean: product.ean,

        cantidad: 0,
        idProducto: product.idProducto,
        precio: product.precio,
        requiereReceta: product.requiereReceta,
        idOrdenDetalle: 0,
      });
      setProductIndex(index);
      setShoppingCartFormMode("create");
      toggleShoppingCartForm(true);
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
        AppConfig["masterOrder.managementPage.authorization"] as UserRole[]
      }
    >
      {/* Formulario para agregar al carrito de compra */}
      <ShoppingCartForm
        mode={shoppingCartFormMode}
        isVisible={onShoppingCartForm}
        initialValues={shoppingCartValues}
        onClose={() => toggleShoppingCartForm(false)}
        onSubmit={shoppingCartFormHandler}
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
      />
      <AppPageTransition>
        <div className="items-center mx-auto mb-5">
          <NewOrderHeader
            onSearch={onSearch}
            search={search}
            setSearch={setSearch}
          />
          <section className="container px-4 mt-12 pb-16 mx-auto">
            <div className="flex justify-end gap-2">
              <div className="flex-none relative">
                {shoppingCartItems.length > 0 && (
                  <div className="absolute -right-2 -top-2 h-6 w-6 bg-primary-500 rounded-full font-semibold text-primary-100 text-sm flex items-center justify-center z-50">
                    <span>{shoppingCartItems.length}</span>
                  </div>
                )}
                <div className="group relative inline-block text-center">
                  <Tooltip content="Ver Carrito de Compra" color="primary">
                    <Button
                      onClick={() => toggleShoppingCartViewer(true)}
                      title="Ver carrito de compra"
                      type="button"
                      size="sm"
                    >
                      <Icon.ShoppingCart size={20} />
                    </Button>
                  </Tooltip>
                </div>
              </div>
              <Button
                variant="shadow"
                size="sm"
                color="default"
                startContent={<User size={15} />}
                onClick={() => {
                  toggleCustomerForm(true);
                }}
              >
                Paciente
              </Button>
              <Tooltip content="Guardar pedido" color="primary">
                <Button isIconOnly size="sm" color="primary">
                  <Icon.Save size={18} />
                </Button>
              </Tooltip>
            </div>
            <div className="mt-5 flex flex-col items0center w-full justify-center gap-5 mb-10">
              <div className="w-full container">
                <NewOrderTable onAdd={onAddHandler} items={data} />
              </div>
              <div>
                <Pagination
                  loop
                  // isCompact
                  showControls
                  showShadow
                  color="primary"
                  page={page}
                  total={pages}
                  onChange={(page) => setPage(page)}
                  className="w-full container"
                />
              </div>
            </div>
          </section>
        </div>
      </AppPageTransition>
    </AppAuthorizationGuard>
  );
};
