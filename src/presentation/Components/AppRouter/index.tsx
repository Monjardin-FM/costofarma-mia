import { Route, Routes, useLocation } from "react-router-dom";

export interface IRoute {
  key: string | number;
  path: string;
  component: any;
  routes?: IRoute[];
}

export interface AppRouterProps {
  routes?: IRoute[];
}

export const AppRouter = ({ routes }: AppRouterProps) => {
  let location = useLocation();
  return (
    <>
      {/* <TransitionGroup> */}
      {/* <CSSTransition key={location.pathname} classNames="fade" timeout={500}> */}
      {routes && routes.length > 0 && (
        <Routes location={location}>
          {routes?.map((route) => (
            <Route
              key={route.key}
              path={route.path}
              element={<route.component />}
            >
              {route.routes?.map((r) => (
                <Route key={r.key} path={r.path} element={<r.component />} />
              ))}
            </Route>
          ))}
        </Routes>
      )}
      {/* </CSSTransition> */}
      {/* </TransitionGroup> */}
    </>
  );
};
