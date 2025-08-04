import { useEffect, useState } from "react";
import AppTextField from "../../../../../presentation/Components/AppTextField";
import { useAssignDefendantVictim } from "../../../../victim/web/hooks/use-assign-defendant-victim";
import { useGetVictimByMail } from "../../../../victim/web/hooks/useGetVictimByMail";
import { Button, CircularProgress, Code } from "@nextui-org/react";
// import Select from "react-select";\
import * as Icon from "react-feather";
import { AppToast } from "../../../../../presentation/Components/AppToast";
import { VictimMail } from "../../../../victim/domain/entities/victim-mail";
import { TFunction } from "i18next";

type AddExistingVictimProps = {
  idDefendant?: number | null;
  onReload: () => void;
  translation: TFunction<[string], undefined>;
};
export const AddExistingVictim = ({
  onReload,
  idDefendant,
  translation,
}: AddExistingVictimProps) => {
  const {
    assignDefendantVictim,
    loading: loadingAssign,
    error: errorAssign,
  } = useAssignDefendantVictim();
  const {
    getVictimByMail,
    victimMail,
    loading: loadingVictim,
  } = useGetVictimByMail();
  const [search, setSearch] = useState<string>("");
  const [victimResult, setVictimResult] = useState<VictimMail>();
  const onAssign = async () => {
    if (victimResult && idDefendant)
      await assignDefendantVictim({
        idDefendant: idDefendant,
        idVictim: victimResult?.idPerson,
      });
    if (!errorAssign) {
      onReload();
    }
  };
  const onClick = (search: string) => {
    getVictimByMail({ mail: search });
  };
  useEffect(() => {
    if (search.length > 1 || search.length === 0) {
      const timeDelay = setTimeout(() => {
        onClick(search);
      }, 500);
      return () => clearTimeout(timeDelay);
    }
  }, [search]);
  useEffect(() => {
    if (victimMail) setVictimResult(victimMail[0]);
  }, [victimMail]);
  useEffect(() => {
    if (errorAssign) {
      AppToast().fire({
        title: "Error",
        icon: "error",
        text: translation("ToastErrorSaveVictim"),
      });
    }
    if (loadingAssign) {
      AppToast().fire({
        title: translation("ToastLoadingVictimTitle"),
        icon: "info",
        text: translation("ToastLoadingVictimText"),
      });
    }
  }, [errorAssign, loadingAssign]);
  return (
    <div className="w-full flex flex-col items-start justify-center gap-5 p-5 border bg-gray-100 rounded-lg col-span-12">
      <div className="w-6/12 flex flex-row items-center gap-2">
        <AppTextField
          className=""
          placeholder={translation("PlaceHolderSearchVictim")}
          type="text"
          onChange={(e: any) => setSearch(e.target.value)}
          value={search}
        />
        <Button
          color="primary"
          startContent={<Icon.Search size={200} />}
          onPress={() => onClick(search)}
          isDisabled={loadingVictim}
          isLoading={loadingVictim}
        >
          Search
        </Button>
      </div>

      {loadingVictim && <CircularProgress color="warning" />}
      {victimMail && victimMail?.length > 0 && victimResult?.idPerson !== 0 ? (
        <div className="flex flex-row items-center gap-2">
          <span className="font-semibold text-primaryColor-800">
            {translation("SpanVictim")}{" "}
          </span>
          <span>
            {victimResult?.name} {victimResult?.lastName}
          </span>
        </div>
      ) : (
        <>
          <Code color="danger">{translation("CodeNoresults")}</Code>
        </>
      )}
      <div className="self-end">
        <Button
          color="primary"
          onPress={() => onAssign()}
          isDisabled={
            loadingAssign ||
            !(victimMail && victimMail?.length > 0) ||
            loadingVictim
          }
          isLoading={loadingAssign}
        >
          {translation("ButtonAssignVictim")}
        </Button>
      </div>
    </div>
  );
};
