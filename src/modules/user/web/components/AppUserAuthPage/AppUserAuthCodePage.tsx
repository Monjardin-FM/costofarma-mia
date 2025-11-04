import { AppBackgroundImageMotion } from "../../../../../presentation/Components/AppBackgroundImageMotion";
import { AppPageTransition } from "../../../../../presentation/Components/AppPageTransition";
import AuthPageBackground from "../../../../../assets/img/bg-costofarma.jpg";
import CostoFarmaLogo from "../../../../../assets/img/farmaleal-logo.png";
import { useEffect } from "react";
import { AppToast } from "../../../../../presentation/Components/AppToast";
import { Button, Input } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
export const AppUserAuthCodePage = () => {
  const navigate = useNavigate();

  const handleVerify = () => {
    // Aquí puedes hacer validaciones antes
    navigate("/"); // por ejemplo: "/dashboard"
  };
  useEffect(() => {
    AppToast().fire({
      title: "Código de verificación",
      text: "Te llegará un código de verificación por sms",
      icon: "success",
    });
  }, []);
  return (
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
                  className="mx-auto w-36"
                  src={CostoFarmaLogo}
                  alt="CostoFarma Logo"
                />
                <div className="flex flex-col items-center justify-center gap-4 mt-10">
                  <Input
                    label="Código de verificación"
                    maxLength={4}
                    inputMode="numeric"
                    pattern="[0-9]*"
                  />
                  <Button color="primary" onClick={handleVerify}>
                    Verificar
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </AppBackgroundImageMotion>
      </div>
    </AppPageTransition>
  );
};
