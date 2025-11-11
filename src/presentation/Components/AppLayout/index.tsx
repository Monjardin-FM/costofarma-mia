import { useEffect, useRef } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useToggle, useClickAway } from "react-use";
import { AppAsideV2 } from "../AppAside";
import { AppPageTransition } from "../AppPageTransition";
import { IRoute } from "../AppRouter";
import { useMargin } from "../../../utils/hooks/use-margin";
import { useUser } from "../../../modules/user/web/hooks/use-user";
import { Step } from "react-joyride";
import * as Icon from "react-feather";
import { useTour } from "../AppTour/useTour";
export type AppLayoutProps = {
  routes?: IRoute[];
};
const STEPS: Step[] = [
  {
    target: "#Menu", // clase o selector del elemento
    content: "Aquí puedes abrir el menú principal",
  },
];
export const AppLayout = () => {
  const margin = useMargin();
  const { user } = useUser();
  const ref = useRef(null);
  const [on, toggle] = useToggle(false);
  useClickAway(ref, () => toggle(false));
  const tour1 = useTour(STEPS, "TourMenu");
  useEffect(() => {
    tour1.run;
  }, [tour1]);
  return (
    <>
      {!user ? (
        <Navigate to={"/sign"} />
      ) : (
        <div className="w-full min-h-screen  overflow-hidden absolute">
          {tour1.tour}
          <AppPageTransition>
            <button
              onClick={() => toggle(true)}
              style={{ left: margin }}
              className="p-3 rounded-full bg-gray-100 text-gray-700 top-6 inline-block absolute shadow appearance-none focus:outline-none z-30"
            >
              <Icon.Menu size={20} id="Menu" />
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
