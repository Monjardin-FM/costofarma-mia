import { TFunction } from "i18next";
import { AppButton } from "../../../../presentation/Components/AppButton";
import { AppHero } from "../../../../presentation/Components/AppHero";
import AppTextField from "../../../../presentation/Components/AppTextField";
import * as Icon from "react-feather";

export type AppManagemenetUsersHeaderProps = {
  onClick: (search: string) => void;
  loadingUsers: boolean;
  search: string;
  setSearch: (search: string) => void;
  translation: TFunction<[string], undefined>;
};
export const AppManagemenetUsersHeader = ({
  loadingUsers,
  onClick,
  search,
  setSearch,
  translation,
}: AppManagemenetUsersHeaderProps) => {
  return (
    <AppHero
      size="base"
      style={{
        background: "linear-gradient(to right,#091970, #133a94)",
      }}
    >
      <div className=" flex flex-row items-center justify-between mx-auto gap-5 w-2/3">
        <h1 className="text-xl font-semibold text-white center text-opacity-90">
          {translation("UserTitle")}
        </h1>
        <div className="w-2/3 flex flex-row items-center bg-white rounded-lg ">
          <AppTextField
            placeholder={translation("PlaceholderSearch")}
            type="text"
            onChange={(e: any) => {
              setSearch(e.target.value);
            }}
            value={search}
          ></AppTextField>
          <AppButton
            isDisabled={loadingUsers}
            variant="ghost"
            isLoading={loadingUsers}
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
