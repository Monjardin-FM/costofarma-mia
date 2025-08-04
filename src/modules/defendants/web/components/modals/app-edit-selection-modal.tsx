import {
  Button,
  Chip,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
} from "@nextui-org/react";
import * as Icon from "react-feather";
import { useGetDefendantsById } from "../../hooks/use-get-defendants-by-id";
import { useEffect } from "react";
import { TFunction } from "i18next";
export type AppEditSelectionModalProps = {
  isVisible: boolean;
  onClose: () => void;
  idDefendant?: number | null;
  onEditInfo: (param: string) => void;
  translation: TFunction<[string], undefined>;
};
export const AppEditSelectionModal = ({
  isVisible,
  onClose,
  idDefendant,
  onEditInfo,
  translation,
}: AppEditSelectionModalProps) => {
  const { defendant, getDefendantById } = useGetDefendantsById();
  useEffect(() => {
    if (idDefendant) getDefendantById({ idPerson: idDefendant });
  }, [idDefendant]);
  return (
    <Modal size="md" isOpen={isVisible} onClose={onClose} backdrop="blur">
      <ModalContent>
        <>
          <ModalHeader className="flex flex-col gap-1 items-center">
            <Chip color="primary" variant="bordered">
              <div className="flex flex-row items-center jusitfy-center gap-3">
                <Icon.User size={15} />
                <span>
                  {translation("SpanDefendant")}
                  {` ${defendant?.name} ${defendant?.lastName}`}
                </span>
              </div>
            </Chip>
          </ModalHeader>
          <ModalBody className="flex flex-col items-center justify-center w-full p-5 gap-5">
            <Button
              size="lg"
              className="w-3/4"
              startContent={<Icon.AlignCenter size={18} />}
              color="primary"
              variant="shadow"
              onPress={() => onEditInfo("editInfo")}
            >
              {translation("ButtonEditDefendant")}
            </Button>
            <Button
              size="lg"
              className="w-3/4"
              startContent={<Icon.Users size={18} />}
              color="success"
              variant="shadow"
              onPress={() => onEditInfo("victims")}
            >
              {translation("ButtonEditDefendantVictims")}
            </Button>
            <Button
              size="lg"
              className="w-3/4"
              startContent={<Icon.Bell size={18} />}
              color="warning"
              variant="shadow"
              onPress={() => onEditInfo("editAlarm")}
            >
              {translation("ButtonEditDefendantAlarms")}
            </Button>
            <Button
              size="lg"
              className="w-3/4"
              startContent={<Icon.Clock size={18} />}
              color="default"
              variant="shadow"
              onPress={() => {
                onEditInfo("scheduleAlarms");
              }}
            >
              {translation("ButtonAlarms")}
            </Button>
            <Button
              size="lg"
              className="w-3/4"
              startContent={<Icon.Edit2 size={18} />}
              color="secondary"
              variant="shadow"
              onPress={() => {
                onEditInfo("addNote");
              }}
            >
              {translation("ButtonEditNote")}
            </Button>
          </ModalBody>
        </>
      </ModalContent>
    </Modal>
  );
};
