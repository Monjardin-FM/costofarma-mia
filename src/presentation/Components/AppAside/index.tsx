import { useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import AppConfig from "../../../settings.json";
import { AppAsideLink } from "./AppAsideLink";
import { useClickAway } from "react-use";
import { AppAuthorizationGuard } from "../AppAuthorizationGuard";
import { AppButton } from "../AppButton";
import { useUser } from "../../../modules/user/web/hooks/use-user";
import { UserRole } from "../../../modules/user/domain/entities/user-role";
import { capitalize } from "../../../utils/capitalize";
import CostoFarmaLogo from "../../../assets/img/FarmaCosto_Logotipo-04.png";
import * as Icon from "react-feather";
import { Suspense } from "react";
export type AppAsideV2Props = {
  isVisible?: boolean;
  onClose?: () => void;
};

export const AppAsideV2 = ({
  isVisible = false,
  onClose = () => {},
}: AppAsideV2Props) => {
  const ref = useRef(null);
  useClickAway(ref, onClose);

  const { signOut, user } = useUser();

  return (
    <Suspense fallback="loading">
      <AnimatePresence>
        {isVisible && (
          <motion.aside
            ref={ref}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{
              opacity: 0,
              x: -20,
            }}
            className="fixed z-40 inline-block px-8 py-12 overflow-y-auto bg-white shadow-lg inset-y-8 left-8 rounded-xl bg-opacity-75 filter backdrop-filter backdrop-blur-sm hover:bg-white hover:bg-opacity-100 transition ease-in-out duration-700"
          >
            <div className="flex justify-center w-full">
              <img
                className="w-32 h-auto"
                src={CostoFarmaLogo}
                alt="CostoFarma Logo"
              />
            </div>

            {user && (
              <div className="w-full  text-center">
                <div className="text-sm text-primary-500">Bienvenido</div>
                <div className="font-bold text-primary-600">
                  {capitalize(`${user.firstname} ${user.lastname} `)}
                </div>
              </div>
            )}

            <div className="mt-8 space-y-4">
              <AppAuthorizationGuard
                roles={
                  AppConfig[
                    "masterOrder.managementPage.authorization"
                  ] as UserRole[]
                }
              >
                <AppAsideLink
                  icon={<Icon.PlusCircle size={20} />}
                  label="Pedidos"
                  to="/orders"
                />
              </AppAuthorizationGuard>
            </div>

            <div className="mt-14 flex flex-col items-center jusitfy-content-center gap-8">
              <AppButton
                className="flex items-center text-white p-3  rounded-lg"
                onClick={() => {
                  signOut.execute();
                }}
                colorScheme="red"
                variant="solid"
              >
                <div className="text-white">
                  <Icon.LogOut />
                </div>
                <div className="ml-3 text-sm font-medium text-white">
                  Cerrar Sesión
                </div>
              </AppButton>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </Suspense>
  );
};
