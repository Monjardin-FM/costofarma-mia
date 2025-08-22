import { AppAuthorizationGuard } from "../../../../presentation/Components/AppAuthorizationGuard";
import { AppPageTransition } from "../../../../presentation/Components/AppPageTransition";
import { OrdersHeader } from "./OrdersHeader";
import AppConfig from "../../../../settings.json";
import { UserRole } from "../../../user/domain/entities/user-role";
import { Button, Pagination } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { useGetPerson } from "../hooks/use-get-person";
import { useEffect, useMemo, useState } from "react";
import { useToggle } from "react-use";
import { ModalResultPerson } from "./modals/ModalResultPerson";
// import { useGetOrderPerson } from "../hooks/use-get-order-person";
import { OrderPersonTableResult } from "./table/OrderPersonTableResult";
import { StepperFormPayment } from "../../../Modals/StepperFormPayment";
import * as Icon from "react-feather";
import { useDeleteOrder } from "../hooks/use-delete-order";
import { AppToast } from "../../../../presentation/Components/AppToast";
import { AppSwal } from "../../../../presentation/Components/AppSwal";
import { useGetOrderByPerson } from "../hooks/get-order-by-person";
import { OrdenPerson } from "../../domain/entities/OrdenPerson";
import { useGetOrderPerson } from "../hooks/use-get-order-person";
import { useGetOrderDetail } from "../hooks/use-get-order-detail";
import { ModalGenerateAgainOrder } from "./modals/ModalGenerateAgainOrder";
export const OrdersManagerPage = () => {
  const navigate = useNavigate();
  const { getPerson, person } = useGetPerson();
  const { getOrderPerson, orderPerson } = useGetOrderPerson();
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(0);
  const [search, setSearch] = useState<string>("");
  const [togglemodaResultPerson, setModalResultPerson] = useToggle(false);
  const [idPerson, setIdPerson] = useState(0);
  const [modalPayment, setModalPayment] = useToggle(false);
  const [toggleReload, setToggleReload] = useToggle(false);
  const { getOrdersByPerson, ordersByPerson } = useGetOrderByPerson();
  const { getOrderDetail, orderDetail } = useGetOrderDetail();
  const [modalGenerateOrder, setModalGenerateOrder] = useToggle(false);
  const [sortedOrders, setSortedOrders] = useState<OrdenPerson[]>([]);
  const [idOrder, setIdOrder] = useState<number | null>(null);
  const {
    deleteOrder,
    error: errorDeleteOrder,
    loading: loadingDeleteOrder,
  } = useDeleteOrder();
  const rowsPerPage = 10;
  const data = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return sortedOrders?.slice(start, end);
  }, [page, sortedOrders]);
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

  const onSearch = (search: string) => {
    getPerson({ rfc: search });
  };

  // Cada vez que cambie el search, se ejecuta la función onSearch con un pequeño delay
  // Esto es para evitar hacer demasiadas peticiones al servidor mientras el usuario escribe
  useEffect(() => {
    if (search.length > 1 || search.length === 0) {
      const timeDelay = setTimeout(() => {
        onSearch(search);
      }, 50);
      return () => clearTimeout(timeDelay);
    }
  }, [search]);
  // Cada vez que cambie person, se actualiza el idPerson
  const onSearchOrderPerson = async () => {
    await getOrderPerson({ idPerson: idPerson });
  };

  // Cada vez que cambie person, se actualiza el modalResultPerson
  useEffect(() => {
    if (person) {
      setModalResultPerson(true);
    }
  }, [person]);
  // Cada vez que cambie idPerson, se obtiene el pedido de la persona
  useEffect(() => {
    if (idPerson) {
      getOrderPerson({ idPerson: idPerson });
    }
  }, [idPerson, toggleReload]);
  // Cada vez que cambie ordersByPerson, lo ordenamos
  useEffect(() => {
    if (ordersByPerson && ordersByPerson.length > 0) {
      const sorted = [...ordersByPerson].sort(
        (a, b) =>
          new Date(b.fechaCreacion).getTime() -
          new Date(a.fechaCreacion).getTime()
      );
      setSortedOrders(sorted);
    }
  }, [ordersByPerson]);
  // Cada vez que cambie sortedOrders, actualizamos el número de páginas
  useEffect(() => {
    if (sortedOrders) {
      const nPages = Math.ceil(sortedOrders?.length / rowsPerPage);
      setPages(nPages);
    }
  }, [sortedOrders]);
  // Cada vez que cambie el search, se obtienen los pedidos de la persona
  useEffect(() => {
    if (search.length === 0) {
      getOrdersByPerson();
    }
  }, [search, toggleReload]);
  // Cada vez que cambie orderPerson, se actualiza el sortedOrders
  useEffect(() => {
    if (orderPerson && orderPerson.length > 0) {
      setSortedOrders(orderPerson);
    }
  }, [orderPerson]);
  useEffect(() => {
    if (idOrder) {
      getOrderDetail({ idOrder: idOrder });
    }
  }, [idOrder]);
  return (
    <AppAuthorizationGuard
      redirect={{ to: "/" }}
      roles={
        AppConfig["masterOrder.managementPage.authorization"] as UserRole[]
      }
    >
      <ModalResultPerson
        items={person}
        setIdPerson={setIdPerson}
        isVisible={togglemodaResultPerson}
        onClose={() => setModalResultPerson(false)}
        onSearchOrderPerson={onSearchOrderPerson}
      />
      <StepperFormPayment
        isVisible={modalPayment}
        onClose={() => {
          setModalPayment(false);
        }}
        idOrder={idOrder}
        onReload={() => setToggleReload(!toggleReload)}
      />
      <ModalGenerateAgainOrder
        isVisible={modalGenerateOrder}
        onClose={() => {
          setModalGenerateOrder(false);
        }}
        items={orderDetail}
        idPerson={idPerson}
        onReload={() => setToggleReload(!toggleReload)}
      />
      <AppPageTransition>
        <div className="items-center mx-auto mb-5">
          <OrdersHeader
            onSearch={onSearch}
            search={search}
            setSearch={setSearch}
          />
          <section className="container px-4 mt-12 pb-16 mx-auto">
            <div className="flex justify-end">
              <Button
                variant="shadow"
                size="sm"
                color="success"
                onClick={() => {
                  navigate("/new-order");
                }}
                startContent={<Icon.PlusCircle size={18} />}
              >
                Crear Pedido
              </Button>
            </div>
            <div className="mt-5 flex flex-col items-center w-full justify-center gap-5 mb-10">
              <div className="w-full container mx-auto">
                <OrderPersonTableResult
                  onPay={(record) => {
                    setIdOrder(record.record.idOrden);
                    setModalPayment(true);
                  }}
                  onView={(record) => {
                    navigate(
                      `/orders/${record.record.idOrden}/${record.record.idpersona}`
                    );
                  }}
                  onDelete={(record) => {
                    handleDeleteOrder(record.record.idOrden);
                  }}
                  onGenerateAgain={(record) => {
                    setIdPerson(record.record.idpersona);
                    setIdOrder(record.record.idOrden);
                    setModalGenerateOrder(true);
                    setToggleReload(!toggleReload);
                  }}
                  items={data}
                  loadingDeleteOrder={loadingDeleteOrder}
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
