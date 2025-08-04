import { AppHero } from "../../../../presentation/Components/AppHero";
import Select from "react-select";
import { useGetDefendants } from "../../../defendants/web/hooks/use-get-defendants";
import { useEffect, useState } from "react";
import { Badge, Button } from "@nextui-org/react";
import * as Icon from "react-feather";
import { TFunction } from "i18next";
type AppTrackingHeaderProps = {
  onSearch: (id: number | undefined) => void;
  onShowNotifications: () => void;
  notificationCount?: number;
  translation: TFunction<[string], undefined>;
};
export const AppTrackingHeader = ({
  onSearch,
  onShowNotifications,
  notificationCount,
  translation,
}: AppTrackingHeaderProps) => {
  const { defendants, getDefendants } = useGetDefendants();
  const [defendantsList, setDefendantsList] =
    useState<{ value: number; label: string }[]>();

  useEffect(() => {
    getDefendants({ completeName: "" });
  }, []);
  useEffect(() => {
    if (defendants) {
      setDefendantsList(
        defendants.map((item) => ({
          value: item.idPerson,
          label: `${item.name} ${item.lastName}`,
        }))
      );
    }
  }, [defendants]);
  return (
    <AppHero
      size="base"
      style={{
        background: "linear-gradient(to right, #091970, #133a94)",
      }}
      className="relative"
    >
      <div className=" flex flex-row items-center justify-between mx-auto gap-5 w-2/3">
        <h1 className="text-xl font-semibold text-white center text-opacity-90">
          {translation("TrackingTitle")}
        </h1>
        <div className="w-2/3 flex flex-row items-center bg-white rounded-lg ">
          <Select
            placeholder={translation("PlaceholderSearch")}
            className="w-full"
            options={defendantsList}
            onChange={(e) => onSearch(e?.value)}
            isSearchable={true}
          />
        </div>
      </div>
      <div className="absolute right-32">
        <Badge content={notificationCount} size="lg" color="warning">
          <Button isIconOnly color="warning" onPress={onShowNotifications}>
            <Icon.Bell size={18} />
          </Button>
        </Badge>
      </div>
    </AppHero>
  );
};
