import { useEffect, useState } from "react";

import { DefendantForm } from "../forms/defendant-form";
import { VictimForm } from "../forms/victim-form";
import { AlarmForm } from "../forms/alarm-form";
import { useCreateDefendant } from "../../hooks/use-create-defendant";
import { Tab } from "@headlessui/react";
import { useGetDefendantsById } from "../../hooks/use-get-defendants-by-id";
import { createDefendantParams } from "../../../domain/repositories/defendant-repository";
import { AppToast } from "../../../../../presentation/Components/AppToast";
// import { AppBadge } from "../../../../../presentation/Components/AppBadge";
import {
  Chip,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
} from "@nextui-org/react";
import { useGetDefendantDevice } from "../../hooks/use-get-defendant-device";
import { useToggle } from "react-use";
import { DefendantById } from "../../../domain/entities/defendant-by-id";
import { TFunction } from "i18next";
function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}
export type AppNewDefendantModalProps = {
  isVisible: boolean;
  onClose: () => void;
  onReload: () => void;
  translation: TFunction<[string], undefined>;
};

export const AppNewDefendantModal = ({
  isVisible,
  onClose,
  onReload,
  translation,
}: AppNewDefendantModalProps) => {
  const {
    createDefendant,
    value: responseCreateDefendant,
    loading: loadingDefendant,
    // error: errorDefendant,
  } = useCreateDefendant();
  const [isCreatedDefendant, setIsCreatedDefendant] = useState(true);
  const [idDefendant, setIdDefendant] = useState<number | null>(null);
  const { getDefendantById, defendant: defendantInfo } = useGetDefendantsById();
  const { defendantDevice, getDefendantDevice } = useGetDefendantDevice();
  const [toggleReload, setToggleReload] = useToggle(false);
  const [defendantHeaderInfo, setDefendantHeaderInfo] =
    useState<DefendantById | null>(null);

  const onCreateDefendant = async (params: createDefendantParams) => {
    await createDefendant(params);
  };
  useEffect(() => {
    if (responseCreateDefendant && responseCreateDefendant.statusCode !== 200) {
      AppToast().fire({
        title: "Error",
        text: `${responseCreateDefendant.error.message}`,
        icon: "error",
      });
      // onReload();
    }
    if (
      responseCreateDefendant &&
      responseCreateDefendant?.statusCode === 200
    ) {
      AppToast().fire({
        title: translation("SwalCreateDefendantTitle"),
        text: translation("SwalCreateDefendantText"),
        icon: "success",
      });
      setIdDefendant(Number(responseCreateDefendant.data));
      onReload();
      setToggleReload(!toggleReload);
    }
  }, [responseCreateDefendant]);
  useEffect(() => {
    if (loadingDefendant) {
      AppToast().fire({
        title: translation("SwalCreatingDefendant"),
        text: translation("SwalCreatingDefendantText"),
        icon: "info",
      });
    }
  }, [loadingDefendant]);

  const handleClose = () => {
    onClose();
    setIsCreatedDefendant(true);
    setIdDefendant(null);
    setDefendantHeaderInfo(null);
  };

  useEffect(() => {
    if (idDefendant) {
      getDefendantById({ idPerson: idDefendant });
      getDefendantDevice({ idDefendant: idDefendant });
    }
  }, [idDefendant, toggleReload]);

  useEffect(() => {
    const deviceType = defendantDevice?.some((item) => item.idDeviceType === 1);
    if (deviceType) {
      setIsCreatedDefendant(false);
    }
  }, [idDefendant, toggleReload, defendantDevice]);
  useEffect(() => {
    if (defendantInfo) setDefendantHeaderInfo(defendantInfo);
  }, [defendantInfo]);

  return (
    <Modal size="full" isOpen={isVisible} onClose={handleClose} backdrop="blur">
      <ModalContent>
        {(onClose) => (
          <div className="overflow-auto">
            <ModalHeader>
              <div className="w-full flex flex-row items-center justify-evenly gap-5 relative">
                <span className="text-primaryColor-700 absolute left-0">
                  {translation("NewDefendantModalTitle")}
                </span>
                <Chip
                  color="warning"
                  variant="shadow"
                  className="flex flex-row gap-2"
                >
                  <span className="text-gray-200">
                    {translation("DefendantNameInfo")}
                  </span>
                  <span className="text-white font-semibold">
                    {defendantHeaderInfo
                      ? `${defendantHeaderInfo?.name} ${defendantHeaderInfo?.lastName} `
                      : ""}
                  </span>
                </Chip>
                <Chip
                  color="warning"
                  variant="shadow"
                  className="flex flex-row gap-2"
                >
                  <span className="text-gray-200">
                    {translation("DefendantSIDInfo")}{" "}
                  </span>
                  <span className="text-white font-semibold">
                    {defendantHeaderInfo?.sid}
                  </span>
                </Chip>
              </div>
            </ModalHeader>
            <ModalBody>
              <div className="w-full px-5 py-2">
                <Tab.Group
                  onChange={() => {
                    setToggleReload(!toggleReload);
                  }}
                >
                  <Tab.List className="flex space-x-1 rounded-xl border border-primary-100 p-1">
                    <Tab
                      className={({ selected }) =>
                        classNames(
                          "w-full rounded-lg py-2.5 text-sm font-medium leading-5",
                          "ring-white ring-offset-2 ring-offset-info-100 focus:outline-none focus:ring-2",
                          selected
                            ? "bg-info-500 text-white shadow"
                            : "text-info-600 hover:bg-white hover:text-info-600 transition-all duration-150"
                        )
                      }
                    >
                      {translation("DefendantTabDefendant")}
                    </Tab>
                    <Tab
                      disabled={isCreatedDefendant}
                      className={({ selected }) =>
                        classNames(
                          "w-full rounded-lg py-2.5 text-sm font-medium leading-5",
                          "ring-white ring-offset-2 ring-offset-info-100 focus:outline-none focus:ring-2",
                          selected
                            ? "bg-info-500 text-white shadow"
                            : "text-info-600 hover:bg-white hover:text-info-600 transition-all duration-150"
                        )
                      }
                    >
                      {translation("DefendantTabVictims")}
                    </Tab>
                    <Tab
                      disabled={isCreatedDefendant}
                      className={({ selected }) =>
                        classNames(
                          "w-full rounded-lg py-2.5 text-sm font-medium leading-5",
                          "ring-white ring-offset-2 ring-offset-info-100 focus:outline-none focus:ring-2",
                          selected
                            ? "bg-info-500 text-white shadow"
                            : "text-info-600 hover:bg-white hover:text-info-600 transition-all duration-150"
                        )
                      }
                    >
                      {translation("DefendantTabAlarms")}
                    </Tab>
                    <Tab
                      hidden
                      disabled={isCreatedDefendant}
                      className={({ selected }) =>
                        classNames(
                          "w-full rounded-lg py-2.5 text-sm font-medium leading-5",
                          "ring-white ring-offset-2 ring-offset-info-100 focus:outline-none focus:ring-2",
                          selected
                            ? "bg-info-500 text-white shadow"
                            : "text-info-600 hover:bg-white hover:text-info-600 transition-all duration-150"
                        )
                      }
                    >
                      Reference Contacts
                    </Tab>
                  </Tab.List>
                  <Tab.Panels>
                    <Tab.Panel>
                      <DefendantForm
                        defendantInfo={defendantInfo}
                        onCreateDefendant={onCreateDefendant}
                        onClose={onClose}
                        idDefendant={idDefendant}
                        loadingDefendant={loadingDefendant}
                        onReload={() => setToggleReload(!toggleReload)}
                        translation={translation}
                      />
                    </Tab.Panel>
                    <Tab.Panel>
                      <VictimForm
                        idDefendant={idDefendant}
                        translation={translation}
                      />
                    </Tab.Panel>
                    <Tab.Panel>
                      <AlarmForm
                        idDefendant={idDefendant}
                        onClose={onClose}
                        translation={translation}
                      />
                    </Tab.Panel>
                    {/* <Tab.Panel>
                      <ReferenceForm />
                    </Tab.Panel> */}
                  </Tab.Panels>
                </Tab.Group>
              </div>
            </ModalBody>
          </div>
        )}
      </ModalContent>
    </Modal>
  );
};
