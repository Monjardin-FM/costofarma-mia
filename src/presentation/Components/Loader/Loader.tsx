import { ReactNode } from "react";
import { BeatLoader } from "react-spinners";

type LoaderProps = {
  // text: ReactNode;
  children: ReactNode;
  isVisible: boolean;
};

export const Loader = ({ children, isVisible }: LoaderProps) => {
  return (
    <>
      {isVisible && (
        <div className="fixed inset-0 z-50 overflow-hidden w-full min-h-full">
          <div className="w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
            <div className="container mx-auto">
              <div className="mx-auto relative max-w-md bg-info-900 bg-opacity-80 flex flex-col items-center justify-center rounded-xl p-14 gap-4 text-white border border-gray-700">
                <BeatLoader color="#FFE600" />
                {children}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
    // <div className="absolute z-50 w-full min-h-screen flex flex-col justify-center items-center">
    //   <div className="w-2/5 h-3/5  bg-slate-700 bg-opacity-30 flex flex-col justify-center items-center rounded-xl bg-clip-padding backdrop-filter backdrop-blur-lg gap-5 max-sm:h-48 max-sm:w-full">
    //     <BeatLoader color="#15A186" />
    //     <div className="text-white text-xl font-semibold max-sm:text-sm ">
    //       <div>{text}</div>
    //     </div>
    //   </div>
    // </div>
  );
};
