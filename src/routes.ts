import { AppAlarmConfigManagerPage } from "./modules/alarm-config/web/components/app-alarm-config-manager-page";
import { AppBroadcastMessagesManagerPage } from "./modules/broadcast-messages/web/components/app-broadcast-messages-manager-page";
import { AppDefendantsManagerPage } from "./modules/defendants/web/components/app-defendants-manager-page";
import { AppDevicesManagerPage } from "./modules/devices/web/components/app-devices-manager-page";
import { ManagementUsersManagerPage } from "./modules/management-users/web/components/app-management-users-manager-page";
import { AppRequestAdminManagerPage } from "./modules/request-admin/web/components/app-request-admin-manager-page";
import { AppTrackingInactiveDefendantsManagerPage } from "./modules/tracking-inactive/web/components/app-tracking-inactive-defendants-manager-page";
import { AppTrackingPlusManagerPage } from "./modules/tracking-plus/web/components/app-tracking-plus-manager-page";
import { AppTrackingManagerPage } from "./modules/tracking/web/components/app-tracking-manager-page";
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
        key: "alarm-config-view",
        path: "/alarm-config",
        component: AppAlarmConfigManagerPage,
      },
      {
        key: "broadcast-messages-view",
        path: "/broadcast-messages",
        component: AppBroadcastMessagesManagerPage,
      },
      {
        key: "defendants-view",
        path: "/defendants",
        component: AppDefendantsManagerPage,
      },
      {
        key: "devices-view",
        path: "/devices",
        component: AppDevicesManagerPage,
      },
      {
        key: "management-users-view",
        path: "/management-users",
        component: ManagementUsersManagerPage,
      },
      {
        key: "request-admin-view",
        path: "/request-admin",
        component: AppRequestAdminManagerPage,
      },
      {
        key: "tracking-view",
        path: "/tracking",
        component: AppTrackingManagerPage,
      },
      {
        key: "tracking-inactive-defendants",
        path: "/tracking-inactive-defendants",
        component: AppTrackingInactiveDefendantsManagerPage,
      },
      {
        key: "tracking-plus-view",
        path: "/tracking-plus",
        component: AppTrackingPlusManagerPage,
      },
      {
        key: "home-view",
        path: "/",
        // exact: true,
        component: AppHomePage,
      },
    ],
  },
  {
    key: "page-not-found",
    path: "*",
    component: AppNotFoundPage,
  },
];
