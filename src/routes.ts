import { NewOrderManagerPage } from "./modules/new-order/web/components/NewOrderManagerPage";
import { OrderDetailManagerPage } from "./modules/orders/web/components/OrderDetailManagerPage";
import { OrdersManagerPage } from "./modules/orders/web/components/OrdersManagerPage";
import { PaymentOrderManagerPage } from "./modules/orders/web/components/PaymentOrderManagerPage";
import { AppPatientManagerPage } from "./modules/patient/web/components/AppPatientManagerPage";
import { AppUserAuth } from "./modules/user/web/components/AppUserAuthPage";
import { AppUserAuthCodePage } from "./modules/user/web/components/AppUserAuthPage/AppUserAuthCodePage";
import { AppHomePage } from "./presentation/Components/AppHomePage";
import { AppLayout } from "./presentation/Components/AppLayout";
import { AppNotFoundPage } from "./presentation/Components/AppNotFoundPage";
import { IRoute } from "./presentation/Components/AppRouter";

export const routes: IRoute[] = [
  {
    key: "auth-user",
    path: "/sign",
    component: AppUserAuth,
  },
  {
    key: "confirm-code",
    path: "/confirm-code",
    component: AppUserAuthCodePage,
  },
  {
    key: "payment-order",
    path: "/orders/payorder/:idOrder",
    component: PaymentOrderManagerPage,
  },
  {
    key: "private-layout",
    path: "/",
    component: AppLayout,
    routes: [
      {
        key: "home-view",
        path: "/",
        // exact: true,
        component: AppHomePage,
      },
      { key: "new-order", path: "/new-order", component: NewOrderManagerPage },
      {
        key: "order-detail",
        path: "/orders/:id/:idpersona",
        component: OrderDetailManagerPage,
      },
      {
        key: "orders",
        path: "/orders",
        component: OrdersManagerPage,
      },
      {
        key: "patient-manager",
        path: "/patients",
        component: AppPatientManagerPage,
      },
    ],
  },
  {
    key: "page-not-found",
    path: "*",
    component: AppNotFoundPage,
  },
];
