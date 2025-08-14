import { Navigate } from "react-router-dom";
import AuthPageBackground from "../../../../../assets/img/bg-costofarma.jpg";
import CostoFarmaLogo from "../../../../../assets/img/FarmaCosto_Logotipo-04.png";
import { AppPageTransition } from "../../../../../presentation/Components/AppPageTransition";
import { AppBackgroundImageMotion } from "../../../../../presentation/Components/AppBackgroundImageMotion";
import { AppUserAuthForm } from "../AppUserAuthForm";
import { useUser } from "../../hooks/use-user";
import { useTranslation } from "react-i18next";

export const AppUserAuth = () => {
  const { t } = useTranslation(["Login"]);
  const { user } = useUser();
  return (
    <>
      {user ? (
        <Navigate to="/" />
      ) : (
        <AppPageTransition>
          <div className="flex min-h-screen min-w-full">
            <AppBackgroundImageMotion
              duration={18}
              backgroundImage={AuthPageBackground}
            >
              <div className="max-w-4xl flex py-8 px-36 bg-black bg-opacity-15 rounded-xl bg-clip-padding backdrop-filter backdrop-blur-sm border border-white border-opacity-10 shadow-xl">
                <div className="w-full max-w-md ">
                  <div className="rounded-xl">
                    <img
                      className="mx-auto w-48"
                      src={CostoFarmaLogo}
                      alt="CostoFarma Logo"
                    />
                    <div className="text-primary-900 text-center text-lg">
                      {t("Welcome")}
                    </div>
                  </div>
                  <AppUserAuthForm />
                </div>
              </div>
            </AppBackgroundImageMotion>
          </div>
        </AppPageTransition>
      )}
    </>
  );
};
