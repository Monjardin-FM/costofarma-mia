import { useNavigate, useParams } from "react-router-dom";
import { AppAuthorizationGuard } from "../../../../presentation/Components/AppAuthorizationGuard";
import AppConfig from "../../../../settings.json";
import { UserRole } from "../../../user/domain/entities/user-role";
import { AppPageTransition } from "../../../../presentation/Components/AppPageTransition";
import { OrderDetailHeader } from "./OrderDetailHeader";
import { OrderDetailTable } from "./table/OrderDetailTable";
import { useEffect } from "react";
import { useGetOrderDetail } from "../hooks/use-get-order-detail";
import { Button, Tooltip } from "@nextui-org/react";
import * as Icon from "react-feather";
import { ModalGenerateAgainOrder } from "./modals/ModalGenerateAgainOrder";
import { useToggle } from "react-use";
export const OrderDetailManagerPage = () => {
  const { id, idpersona } = useParams<{ id: string; idpersona: string }>();
  const { getOrderDetail, orderDetail } = useGetOrderDetail();
  const navigate = useNavigate();

  const [modalGenerateOrder, setModalGenerateOrder] = useToggle(false);
  useEffect(() => {
    if (id) {
      getOrderDetail({ idOrder: parseInt(id) });
    }
  }, [id]);

  return (
    <AppAuthorizationGuard
      redirect={{ to: "/" }}
      roles={
        AppConfig["masterOrder.managementPage.authorization"] as UserRole[]
      }
    >
      <ModalGenerateAgainOrder
        isVisible={modalGenerateOrder}
        onClose={() => {
          setModalGenerateOrder(false);
        }}
        idPerson={idpersona ? parseInt(idpersona) : 0}
        onReload={() => navigate(`/orders`)}
        idOrder={parseInt(id ?? "")}
      />
      <AppPageTransition>
        <div className="items-center mx-auto mb-5">
          <OrderDetailHeader />
          <section className="container px-4 mt-12 pb-16 mx-auto">
            <div className="flex justify-end mb-4">
              <Tooltip
                content="Volver a generar pedido"
                color="secondary"
                style={{
                  zIndex: 0,
                }}
                offset={1}
                showArrow
                closeDelay={10}
                disableAnimation
              >
                <Button
                  onClick={() => {
                    setModalGenerateOrder(true);
                  }}
                  size="sm"
                  variant="shadow"
                  isIconOnly
                  color="secondary"
                >
                  <Icon.RefreshCw size={18} />
                </Button>
              </Tooltip>
            </div>
            <div className="w-full container mx-auto">
              <OrderDetailTable items={orderDetail} />
            </div>
          </section>
        </div>
      </AppPageTransition>
    </AppAuthorizationGuard>
  );
};
