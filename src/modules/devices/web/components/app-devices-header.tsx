import * as Icon from "react-feather";
import { AppHero } from "../../../../presentation/Components/AppHero";
import AppTextField from "../../../../presentation/Components/AppTextField";
import { AppButton } from "../../../../presentation/Components/AppButton";
import { TFunction } from "i18next";
export type AppDevicesHeaderProps = {
  onClick: (search: string) => void;
  loadingDevices: boolean;
  search: string;
  setSearch: (search: string) => void;
  translation: TFunction;
};
export const AppDevicesHeader = ({
  loadingDevices,
  onClick,
  search,
  setSearch,
  translation,
}: AppDevicesHeaderProps) => {
  return (
    <AppHero
      size="base"
      style={{
        background: "linear-gradient(to right,#091970, #133a94)",
      }}
    >
      <div className=" flex flex-row items-center justify-between mx-auto gap-5 w-2/3">
        <h1 className="text-xl font-semibold text-white center text-opacity-90">
          {translation("DevicesTitle")}
        </h1>
        <div className="w-2/3 flex flex-row items-center bg-white rounded-lg ">
          <AppTextField
            placeholder={translation("DevicesPlaceHolderSearch")}
            type="text"
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            value={search}
          ></AppTextField>
          <AppButton
            variant="ghost"
            isLoading={loadingDevices}
            onClick={() => {
              onClick(search);
            }}
          >
            <Icon.Search />
          </AppButton>
        </div>
      </div>
    </AppHero>
  );
};
