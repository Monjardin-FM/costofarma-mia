import { useEffect, useState } from "react";
import { useGetInactiveDefendants } from "../hooks/use-get-inactive-defendant";
import { AppHero } from "../../../../presentation/Components/AppHero";
import Select from "react-select";
import { TFunction } from "i18next";

type AppTrackinInactgiveDefendantsgHeaderProps = {
  // setTrackingId: (trackingId: number | undefined) => void;
  onSearch: (id: number | undefined) => void;
  translation: TFunction<[string], undefined>;
};
export const AppTrackingInactiveDefendantsHeader = ({
  onSearch,
  translation,
}: AppTrackinInactgiveDefendantsgHeaderProps) => {
  const { getInactiveDefendants, inactiveDefendants } =
    useGetInactiveDefendants();
  const [defendantsList, setDefendantsList] =
    useState<{ value: number; label: string }[]>();

  useEffect(() => {
    getInactiveDefendants();
  }, []);
  useEffect(() => {
    if (inactiveDefendants) {
      setDefendantsList(
        inactiveDefendants.map((item) => ({
          value: item.idPerson,
          label: `${item.name} ${item.lastName}`,
        }))
      );
    }
  }, [inactiveDefendants]);
  return (
    <AppHero
      size="base"
      style={{
        background: "linear-gradient(to right, #091970, #133a94)",
      }}
    >
      <div className=" flex flex-row items-center justify-between mx-auto gap-5 w-2/3 z-50">
        <h1 className="text-xl font-semibold text-white center text-opacity-90">
          {translation("TrackingInactiveTitle")}
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
    </AppHero>
  );
};
