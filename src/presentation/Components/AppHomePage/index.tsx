// import { Player } from "@lottiefiles/react-lottie-player";
// import Blogging from "../../../assets/json/pharmacy.json";
import { AppPageTransition } from "../AppPageTransition";
import OTCImage from "../../../assets/img/otcLogo-small.png";
import MainImage from "../../../assets/img/otc-main.png";

export const AppHomePage = () => (
  <AppPageTransition>
    <div className="">
      <div className="w-full min-h-screen flex items-center justify-center flex-col">
        <div className=" bg-primary-500 bg-opacity-5 rounded-lg mx-2">
          <div className="flex items-center justify-center flex-col bg-clip-padding backdrop-filter backdrop-blur-md border p-14 max-w-3xl rounded-lg border-gray-500 border-opacity-30">
            <div className="w-full max-w-md">
              {/* <Player
                autoplay
                loop
                src={Blogging}
                style={{
                  height: "100%",
                  width: "100%",
                }}
              /> */}
              <img
                title="Farmaleal "
                className="mx-auto w-14"
                src={MainImage}
                alt="OTC Logo"
                style={{
                  width: "60%",
                }}
              />
            </div>
            <h2 className="text-gray-800 text-xl mt-10 text-center">
              On Time Connect
            </h2>
            <p className="text-gray-700 mt-2 text-center max-w-3xl">
              We are working to improve the experience of our users.
            </p>

            <div className="mt-12 flex items-center space-x-4 text-center">
              <div className="text-center text-sm font-semibold text-gray-600">
                Developed by
              </div>

              <div>
                <img
                  title="Farmaleal "
                  className="mx-auto w-14"
                  src={OTCImage}
                  alt="OTC Logo"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </AppPageTransition>
);
