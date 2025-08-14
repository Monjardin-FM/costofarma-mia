import { useRef } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useToggle, useClickAway } from "react-use";
import { AppAsideV2 } from "../AppAside";
import { AppPageTransition } from "../AppPageTransition";
import { IRoute } from "../AppRouter";
import { useMargin } from "../../../utils/hooks/use-margin";
import { useUser } from "../../../modules/user/web/hooks/use-user";
import * as Icon from "react-feather";
export type AppLayoutProps = {
  routes?: IRoute[];
};

export const AppLayout = () => {
  const margin = useMargin();
  const { user } = useUser();

  const ref = useRef(null);
  const [on, toggle] = useToggle(false);
  useClickAway(ref, () => toggle(false));

  return (
    <>
      {!user ? (
        <Navigate to={"/sign"} />
      ) : (
        <div className="w-full min-h-screen  overflow-hidden absolute">
          <AppPageTransition>
            <button
              onClick={() => toggle(true)}
              style={{ left: margin }}
              className="p-3 rounded-full bg-gray-100 text-gray-700 top-6 inline-block absolute shadow appearance-none focus:outline-none z-30"
            >
              <Icon.Menu size={20} />
            </button>
            {/* <AppAlertButton /> */}
            <AppAsideV2
              isVisible={on}
              onClose={() => {
                toggle(false);
              }}
            />
            <Outlet />
          </AppPageTransition>
        </div>
      )}
    </>
  );
};
