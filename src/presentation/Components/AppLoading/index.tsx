import Loader from "react-loader-spinner";

export const AppLoading = () => (
  <div className="w-full h-screen flex flex-col gap-5 items-center justify-center bg-info-900 text-white absolute z-50">
    <Loader type="Puff" color="#fff" height={40} width={40} />
    <span>Loading</span>
  </div>
);
