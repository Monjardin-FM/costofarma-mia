import { NewOrderManagerPage } from "./modules/new-order/web/components/NewOrderManagerPage";
import { OrderDetailManagerPage } from "./modules/orders/web/components/OrderDetailManagerPage";
import { OrdersManagerPage } from "./modules/orders/web/components/OrdersManagerPage";
import { AppUserAuth } from "./modules/user/web/components/AppUserAuthPage";
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
      {
        key: "orders",
        path: "/orders",
        component: OrdersManagerPage,
      },
      { key: "new-order", path: "/new-order", component: NewOrderManagerPage },
      {
        key: "order-detail",
        path: "/orders/:id/:idpersona",
        component: OrderDetailManagerPage,
      },
    ],
  },
  {
    key: "page-not-found",
    path: "*",
    component: AppNotFoundPage,
  },
];
