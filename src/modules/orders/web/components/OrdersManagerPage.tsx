import { AppAuthorizationGuard } from "../../../../presentation/Components/AppAuthorizationGuard";
import { AppPageTransition } from "../../../../presentation/Components/AppPageTransition";
import { OrdersHeader } from "./OrdersHeader";
import AppConfig from "../../../../settings.json";
import { UserRole } from "../../../user/domain/entities/user-role";
import { Button } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { useGetPerson } from "../hooks/use-get-person";
import { useEffect, useState } from "react";
import { useToggle } from "react-use";
import { ModalResultPerson } from "./modals/ModalResultPerson";
import { useGetOrderPerson } from "../hooks/use-get-order-person";
import { OrderPersonTableResult } from "./table/OrderPersonTableResult";
import { ModalPayment } from "./modals/modalPayment";
export const OrdersManagerPage = () => {
  const navigate = useNavigate();
  const { getPerson, person } = useGetPerson();
  const { getOrderPerson, orderPerson } = useGetOrderPerson();
  const [search, setSearch] = useState<string>("");
  const [togglemodaResultPerson, setModalResultPerson] = useToggle(false);
  const [idPerson, setIdPerson] = useState(0);
  const [modalPayment, setModalPayment] = useToggle(false);
  const onSearch = (search: string) => {
    getPerson({ rfc: search });
  };
  useEffect(() => {
    if (search.length > 1 || search.length === 0) {
      const timeDelay = setTimeout(() => {
        onSearch(search);
      }, 50);
      return () => clearTimeout(timeDelay);
    }
  }, [search]);
  const onSearchOrderPerson = async () => {
    await getOrderPerson({ idPerson: idPerson });
  };
  useEffect(() => {
    if (person) {
      setModalResultPerson(true);
    }
  }, [person]);
  useEffect(() => {
    if (idPerson) {
      getOrderPerson({ idPerson: idPerson });
    }
  }, [idPerson]);
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
      <ModalPayment
        isVisible={modalPayment}
        onClose={() => {
          setModalPayment(false);
        }}
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
              >
                Crear Pedido
              </Button>
            </div>
            <div className="mt-5 flex flex-col items0center w-full justify-center gap-5 mb-10">
              <div className="w-full container mx-auto">
                <OrderPersonTableResult
                  onPay={() => {
                    setModalPayment(true);
                  }}
                  onView={() => {}}
                  items={orderPerson}
                />
              </div>
            </div>
          </section>
        </div>
      </AppPageTransition>
    </AppAuthorizationGuard>
  );
};
