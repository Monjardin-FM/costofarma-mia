import { Player } from "@lottiefiles/react-lottie-player";
import Astronaut from "../../../assets/json/astronaut.json";
export const AppNotFoundPage = () => {
  return (
    <div className="w-full min-h-screen py-20 flex items-center justify-center flex-col">
      <Player
        autoplay
        loop
        src={Astronaut}
        style={{ height: "300px", width: "300px" }}
      />
      <h2 className="font-bold text-gray-800 text-4xl">Hmmm!</h2>
      <p className="text-gray-800 mt-3">Page not found</p>
      {/* <AppButton
        type="button"
        className="mt-10"
        colorScheme="primary"
        // onClick={() => Navigate={}}
      > */}
    </div>
  );
};
