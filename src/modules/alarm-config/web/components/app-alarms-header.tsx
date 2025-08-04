import * as Icon from "react-feather";
import { AppHero } from "../../../../presentation/Components/AppHero";
import AppTextField from "../../../../presentation/Components/AppTextField";
import { AppButton } from "../../../../presentation/Components/AppButton";
import { useTranslation } from "react-i18next";

export type AppAlarmsHeaderProps = {
  onClick: (search: string) => void;
  loadingAlarms: boolean;
  search: string;
  setSearch: (search: string) => void;
};

export const AppAlarmsHeader = ({
  loadingAlarms,
  onClick,
  search,
  setSearch,
}: AppAlarmsHeaderProps) => {
  const { t } = useTranslation(["AutomaticAlarms"]);
  return (
    <AppHero
      size="base"
      style={{
        background: "linear-gradient(to right,#091970, #133a94)",
      }}
    >
      <div className=" flex flex-row items-center justify-between mx-auto gap-5 w-2/3">
        <h1 className="text-xl font-semibold text-white center text-opacity-90">
          {t("TitleHeader")}
        </h1>
        <div className="w-2/3  flex-row items-center bg-white rounded-lg hidden ">
          <AppTextField
            placeholder={t("PlaceHolderSearch")}
            type="text"
            onChange={(e: any) => {
              setSearch(e.target.value);
            }}
            value={search}
          ></AppTextField>
          <AppButton
            isDisabled={loadingAlarms}
            variant="ghost"
            isLoading={loadingAlarms}
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
