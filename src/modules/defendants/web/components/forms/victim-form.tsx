import { useEffect } from "react";
import { useGetVictims } from "../../../../victim/web/hooks/use-get-victims";
import { AddVictimForm } from "./app-add-victim-form";
import { useToggle } from "react-use";
import { DefendantById } from "../../../domain/entities/defendant-by-id";
import { VictimTableForms } from "./victim-table";
import { Tab, Tabs } from "@nextui-org/react";
import * as Icon from "react-feather";
import { AddExistingVictim } from "./add-existing-victim";
import { TFunction } from "i18next";
type VictimFormProps = {
  idDefendant?: number | null;
  defendantInfo?: DefendantById;
  translation: TFunction<[string], undefined>;
};
export const VictimForm = ({
  idDefendant,
  defendantInfo,
  translation,
}: VictimFormProps) => {
  const [toggleReload, setToggleReload] = useToggle(false);
  const { getVictims, victims } = useGetVictims();

  useEffect(() => {
    if (idDefendant) getVictims({ idDefendant: idDefendant, completeName: "" });
  }, [toggleReload]);
  return (
    <div className="flex flex-col items-start justify-center gap-3 w-full">
      <Tabs aria-label="options" variant="bordered" fullWidth color="primary">
        <Tab
          key="ExistingVictim"
          title={
            <div className="flex items-center space-x-2 w-full">
              <Icon.User size={18} />
              <span>"{translation("SpanExistingVictim")}"</span>
            </div>
          }
          className="w-full"
        >
          <div className="w-full">
            <AddExistingVictim
              idDefendant={idDefendant}
              onReload={() => {
                setToggleReload(!toggleReload);
              }}
              translation={translation}
            />
          </div>
        </Tab>
        <Tab
          key="NewVictim"
          title={
            <div className="flex items-center space-x-2">
              <Icon.UserPlus size={18} />
              <span>{translation("SpanExistingVictim")}</span>
            </div>
          }
          className="w-full"
        >
          <div className="w-full">
            <AddVictimForm
              idDefendant={idDefendant}
              onReload={() => {
                setToggleReload(!toggleReload);
              }}
              translation={translation}
            />
          </div>
        </Tab>
      </Tabs>
      <VictimTableForms
        defendantInfo={defendantInfo}
        idDefendant={idDefendant}
        victims={victims}
        translation={translation}
      />
    </div>
  );
};
