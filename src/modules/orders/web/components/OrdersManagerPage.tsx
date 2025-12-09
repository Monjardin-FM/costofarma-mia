import { AppAuthorizationGuard } from "../../../../presentation/Components/AppAuthorizationGuard";
import { AppPageTransition } from "../../../../presentation/Components/AppPageTransition";
import { OrdersHeader } from "./OrdersHeader";
import AppConfig from "../../../../settings.json";
import { UserRole } from "../../../user/domain/entities/user-role";
import { Button } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useToggle } from "react-use";
import { OrderPersonTableResult } from "./table/OrderPersonTableResult";
import * as Icon from "react-feather";
import { useDeleteOrder } from "../hooks/use-delete-order";
import { AppToast } from "../../../../presentation/Components/AppToast";
import { AppSwal } from "../../../../presentation/Components/AppSwal";
import { ModalGenerateAgainOrder } from "./modals/ModalGenerateAgainOrder";
import { ModalTicket } from "./modals/Ticket/ModalTicket";
import { Step } from "react-joyride";
import { useTour } from "../../../../presentation/Components/AppTour/useTour";
import { useSearchOrder } from "../hooks/use-get-orders";

const STEPS: Step[] = [
  {
    target: "#rfc", // clase o selector del elemento
    content: "Puedes buscar por RFC del paciente",
    placement: "bottom",
  },
  {
    target: "#CrearPedido", // clase o selector del elemento
    content: "Aquí puedes crear un nuevo pedido",
    placement: "left",
  },
  {
    target: "#DetallePedido",
    content: "Puedes ver el detalle del pedido aquí",
    placement: "left",
  },
  {
    target: "#VerTicket", // clase o selector del elemento
    content: "Visualiza el ticket del pedido realizado",
    placement: "left",
  },
  {
    target: "#PagarPedido", // clase o selector del elemento
    content: "Realiza el pago del pedido aquí",
    placement: "left",
  },
  {
    target: "#GenerarOtraVez", // clase o selector del elemento
    content: "Genera el pedido nuevamente para este paciente",
    placement: "left",
  },

  {
    target: "#EliminarPedido", // clase o selector del elemento
    content: "Elimina el pedido si es necesario",
    placement: "left",
  },
];
export const OrdersManagerPage = () => {
  const navigate = useNavigate();
  const {
    orders,
    load: searchOrders,
    fetchMore,
    hasMoreResults,
  } = useSearchOrder();
  const [search, setSearch] = useState<string>("");
  const [idPerson, setIdPerson] = useState(0);
  const [modalGenerateOrder, setModalGenerateOrder] = useToggle(false);
  const [modalTicket, toggleModalTicket] = useToggle(false);
  const [toggleReload, setToggleReload] = useToggle(false);
  const [idOrder, setIdOrder] = useState<number>();
  const {
    deleteOrder,
    error: errorDeleteOrder,
    loading: loadingDeleteOrder,
  } = useDeleteOrder();
  const tourPedidos = useTour(STEPS, "TourPedidos");
  useEffect(() => {
    tourPedidos.run;
  }, [tourPedidos]);
  const askDeleteForce = () => {
    return AppSwal().fire({
      title: "¿Estás seguro de eliminar el pedido?",
      text: "No podrás revertir esto",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminarlo",
    });
  };
  const handleDeleteOrder = async (idOrder: number) => {
    const result = await askDeleteForce();

    if (result.isConfirmed && idOrder) {
      await deleteOrder({ idOrden: idOrder });
      if (!errorDeleteOrder) {
        AppToast().fire({
          title: "Pedido eliminado",
          text: "El pedido ha sido eliminado correctamente.",
          icon: "success",
        });
        setToggleReload(!toggleReload);
      }
    }
  };
  useEffect(() => {
    if (errorDeleteOrder) {
      AppToast().fire({
        title: "Error",
        icon: "error",
        text: "No se pudo eliminar el pedido.",
      });
    }
  }, [errorDeleteOrder]);

  const onSearch = async (search: string) => {
    await searchOrders({ query: { email: search } });
  };

  // Esto es para evitar hacer demasiadas peticiones al servidor mientras el usuario escribe
  useEffect(() => {
    if (search.length > 1 || search.length === 0) {
      const timeDelay = setTimeout(() => {
        onSearch(search);
      }, 50);
      return () => clearTimeout(timeDelay);
    }
  }, [search]);
  useEffect(() => {
    searchOrders({
      query: { email: search },
    });
  }, [search]);

  return (
    <AppAuthorizationGuard
      roles={
        AppConfig["masterOrder.managementPage.authorization"] as UserRole[]
      }
      redirect={{ to: "/" }}
    >
      <ModalGenerateAgainOrder
        isVisible={modalGenerateOrder}
        onClose={() => {
          setModalGenerateOrder(false);
        }}
        // items={orderDetail}
        idOrder={idOrder}
        idPerson={idPerson}
        onReload={() => setToggleReload(!toggleReload)}
      />
      <ModalTicket
        isVisible={modalTicket}
        onClose={() => toggleModalTicket(false)}
        idOrder={idOrder}
      />
      <AppPageTransition>
        <div className="items-center mx-auto mb-5">
          <OrdersHeader
            onSearch={onSearch}
            search={search}
            setSearch={setSearch}
            tour={tourPedidos.tour}
          />
          <section className="container px-4 mt-12 pb-16 mx-auto">
            <div className="flex justify-end">
              <AppAuthorizationGuard
                roles={
                  AppConfig[
                    "masterOrder.managementPage.actionsAuthorization"
                  ] as UserRole[]
                }
              >
                {tourPedidos.tour}
                <Button
                  variant="shadow"
                  size="sm"
                  color="success"
                  onClick={() => {
                    navigate("/new-order");
                  }}
                  startContent={<Icon.PlusCircle size={18} />}
                  id="CrearPedido"
                >
                  Crear Pedido
                </Button>
              </AppAuthorizationGuard>
            </div>
            <div className="mt-5 flex flex-col items-center w-full justify-center gap-5 mb-10">
              <div className="w-full container mx-auto">
                <OrderPersonTableResult
                  onView={(record) => {
                    navigate(
                      `/orders/${record.record.id}/${record.record.patient.id}`
                    );
                  }}
                  onDelete={(record) => {
                    handleDeleteOrder(record.record.id);
                  }}
                  onGenerateAgain={(record) => {
                    setIdPerson(record.record.patient.id);
                    setIdOrder(record.record.id);
                    setModalGenerateOrder(true);
                    setToggleReload(!toggleReload);
                  }}
                  onViewTIcket={(record) => {
                    toggleModalTicket(true);
                    setIdOrder(record.record.id);
                  }}
                  items={orders}
                  loadingDeleteOrder={loadingDeleteOrder}
                  tour={tourPedidos.tour}
                />
                <div className="flex justify-center mt-10">
                  {hasMoreResults && (
                    <Button
                      variant="bordered"
                      color="primary"
                      onPress={() => {
                        fetchMore({
                          query: {
                            email: search,
                          },
                        });
                      }}
                    >
                      Cargar más
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </section>
        </div>
      </AppPageTransition>
    </AppAuthorizationGuard>
  );
};
