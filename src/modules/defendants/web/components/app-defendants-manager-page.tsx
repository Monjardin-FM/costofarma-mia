import { Suspense, useEffect, useState } from "react";
import AppConfig from "../../../../settings.json";
import { AppDefendantsHeader } from "./app-defendants-header";
import * as Icon from "react-feather";
import { useToggle } from "react-use";
import { AppDefendantsTable } from "./tables/app-defendants-table";
import { AppNewDefendantModal } from "./modals/app-new-defendant-modal";
import { useGetDefendants } from "../hooks/use-get-defendants";
import { AppAuthorizationGuard } from "../../../../presentation/Components/AppAuthorizationGuard";
import { UserRole } from "../../../user/domain/entities/user-role";
import { AppLoading } from "../../../../presentation/Components/AppLoading";
import { AppPageTransition } from "../../../../presentation/Components/AppPageTransition";
import { Button, Tooltip } from "@nextui-org/react";
import { useDeleteDefendant } from "../hooks/use-delete-defendant";
import { AppToast } from "../../../../presentation/Components/AppToast";
import { AppEditSelectionModal } from "./modals/app-edit-selection-modal";
import { AppEditInfoDefendantModal } from "./modals/app-edit-info-defendant-modal";
import { AppEditVictimDefendantModal } from "./modals/app-edit-victim-defendant-modal";
import { AppEditAlarmDefendantModal } from "./modals/app-edit-alarm-defendant-modal";
import { AppAlarmsDefendantScheduleModal } from "./modals/app-alarms-defendant-schedule";
import { AppAddNoteDefendantModal } from "./modals/app-add-note-defendant";
import { AppEditNoteDefendantModal } from "./modals/app-edit-note-defendant";
import { AppSwal } from "../../../../presentation/Components/AppSwal";
import { useTranslation } from "react-i18next";
export const AppDefendantsManagerPage = () => {
  const { t: translation } = useTranslation("Defendants");
  const {
    defendants,
    getDefendants,
    loading: loadingDefendants,
  } = useGetDefendants();
  const [toggleReload, setToggleReload] = useToggle(false);
  const [visibleNewDefendantModal, setVisibleNewDefendantModal] =
    useToggle(false);
  const [search, setSearch] = useState<string>("");
  const {
    deleteDefendant,
    error: errorDelete,
    loading: loadingDeleteDefendant,
  } = useDeleteDefendant();
  const [idDefendant, setIdDefendant] = useState<number | null>(null);
  const [visibleEditSelectionModal, setVIsibleEditSelectionmodal] =
    useToggle(false);
  const [visibleEditDefendantInfoModal, setVisibleEditDefendantInfoModal] =
    useToggle(false);
  const [visibleEditVictimDefendantModal, setVisibleEditVictimDefendantModal] =
    useToggle(false);
  const [visibleEditAlarmDefendantModal, setVisibleEditAlarmDefendantModal] =
    useToggle(false);
  const [visibleScheduleAlarmsModal, setVisibleScheduleAlarmsModal] =
    useToggle(false);
  const [visibleAddNoteDefendant, setVisibleAddNoteDefendant] =
    useToggle(false);
  const [visibleEditNoteDefendant, setVisibleEditNoteDefendant] =
    useToggle(false);
  const onClick = (search: string) => {
    getDefendants({ completeName: search });
  };
  const askDeleteForce = () => {
    return AppSwal().fire({
      icon: "question",
      title: translation("SwalDeleteDefendantTitle"),
      text: translation("SwalDeleteDefendantText"),
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: translation("SwalDeleteDefendantConfirmButtonText"),
      cancelButtonText: translation("SwalDeleteDefendantCancelButtonText"),
    });
  };
  const onDelete = async () => {
    const result = await askDeleteForce();
    if (result.isConfirmed && idDefendant) {
      await deleteDefendant({ idPerson: idDefendant });
      if (!errorDelete) {
        AppToast().fire({
          title: translation("SwalDeleteDefendantDeleted"),
          icon: "success",
          text: translation("SwalDeleteDefendantDeletedText"),
        });
        setToggleReload(!toggleReload);
      }
    }
  };
  useEffect(() => {
    if (search.length > 1 || search.length === 0) {
      const timeDelay = setTimeout(() => {
        onClick(search);
      }, 500);
      return () => clearTimeout(timeDelay);
    }
  }, [search, toggleReload]);
  useEffect(() => {
    getDefendants({ completeName: "" });
  }, [toggleReload]);
  useEffect(() => {
    if (errorDelete) {
      AppToast().fire({
        title: translation("SwalDeleteDefendantError"),
        icon: "error",
        text: translation("SwalDeleteDefendantErrorText"),
      });
    }
    if (loadingDeleteDefendant) {
      AppToast().fire({
        title: translation("SwalLoadingDeleteDefendant"),
        icon: "info",
        text: translation("SwalLoadingDeleteDefendantText"),
      });
    }
  }, [errorDelete, loadingDeleteDefendant]);
  return (
    <Suspense fallback="loading">
      <AppAuthorizationGuard
        roles={AppConfig["defendants.managerPage.authorization"] as UserRole[]}
        redirect={{ to: "/" }}
      >
        {!defendants && <AppLoading />}
        <AppNewDefendantModal
          isVisible={visibleNewDefendantModal}
          onClose={() => setVisibleNewDefendantModal(false)}
          onReload={() => {
            setToggleReload(!toggleReload);
          }}
          translation={translation}
        />
        <AppEditSelectionModal
          isVisible={visibleEditSelectionModal}
          onClose={() => {
            setVIsibleEditSelectionmodal(false);
            setIdDefendant(null);
          }}
          onEditInfo={(param: string) => {
            switch (param) {
              case "editInfo": {
                setVIsibleEditSelectionmodal(false);
                setVisibleEditDefendantInfoModal(true);
                break;
              }

              case "victims": {
                setVIsibleEditSelectionmodal(false);
                setVisibleEditVictimDefendantModal(true);
                break;
              }
              case "editAlarm": {
                setVIsibleEditSelectionmodal(false);
                setVisibleEditAlarmDefendantModal(true);
                break;
              }
              case "scheduleAlarms": {
                setVIsibleEditSelectionmodal(false);
                setVisibleScheduleAlarmsModal(true);
                break;
              }
              case "addNote": {
                setVIsibleEditSelectionmodal(false);
                setVisibleEditNoteDefendant(true);
                break;
              }
              default:
                return null;
            }
          }}
          idDefendant={idDefendant}
          translation={translation}
        />
        <AppEditInfoDefendantModal
          isVisible={visibleEditDefendantInfoModal}
          onClose={() => {
            setVisibleEditDefendantInfoModal(false);
            setVIsibleEditSelectionmodal(true);
            setToggleReload(!toggleReload);
          }}
          idDefendant={idDefendant}
          translation={translation}
        />
        <AppEditVictimDefendantModal
          isVisible={visibleEditVictimDefendantModal}
          onClose={() => {
            setVisibleEditVictimDefendantModal(false);
            setVIsibleEditSelectionmodal(true);
            setToggleReload(!toggleReload);
          }}
          idDefendant={idDefendant}
          translation={translation}
        />
        <AppEditAlarmDefendantModal
          isVisible={visibleEditAlarmDefendantModal}
          onClose={() => {
            setVisibleEditAlarmDefendantModal(false);
            setVIsibleEditSelectionmodal(true);
            setToggleReload(!toggleReload);
          }}
          idDefendant={idDefendant}
          translation={translation}
        />
        <AppAlarmsDefendantScheduleModal
          isVisible={visibleScheduleAlarmsModal}
          onClose={() => {
            setVisibleScheduleAlarmsModal(false);
            setVIsibleEditSelectionmodal(true);
            setToggleReload(!toggleReload);
          }}
          idDefendant={idDefendant}
          translation={translation}
        />
        <AppAddNoteDefendantModal
          isVisible={visibleAddNoteDefendant}
          onClose={() => {
            setVisibleAddNoteDefendant(false);
            // setVIsibleEditSelectionmodal(true);
            setToggleReload(!toggleReload);
          }}
          idDefendant={idDefendant}
          translation={translation}
        />
        <AppEditNoteDefendantModal
          isVisible={visibleEditNoteDefendant}
          onClose={() => setVisibleEditNoteDefendant(false)}
          idDefendant={idDefendant}
          translation={translation}
        />
        <AppPageTransition>
          <div className="items-center mx-auto mb-10">
            <AppDefendantsHeader
              onClick={onClick}
              loadingDefendants={loadingDefendants}
              search={search}
              setSearch={setSearch}
              translation={translation}
            />
          </div>
          <div className="container mx-auto flex flex-col items-end jusitfy-center mt-5">
            <Tooltip
              content={translation("ButtonNewDefendant")}
              color="warning"
              offset={1}
              showArrow
              closeDelay={10}
              style={{
                zIndex: 0,
              }}
              disableAnimation
            >
              <Button
                color="warning"
                onClick={() => setVisibleNewDefendantModal(true)}
                isIconOnly
                size="md"
              >
                <Icon.PlusCircle color="white" />
              </Button>
            </Tooltip>
          </div>
          <div className="container mx-auto mt-5 mb-14">
            <AppDefendantsTable
              onEdit={(record) => {
                setIdDefendant(record.record.idPerson);
                setVIsibleEditSelectionmodal(true);
              }}
              items={defendants}
              onDelete={({ record }) => {
                setIdDefendant(record.idPerson);
                onDelete();
                // await deleteDefendant({ idPerson: record.idPerson });
                // if (!errorDelete) onDelete();
                // setToggleReload(!toggleReload);
              }}
              loadingDeleteDefendant={loadingDeleteDefendant}
              onAddNote={(record) => {
                setIdDefendant(record.record.idPerson);
                setVisibleAddNoteDefendant(true);
              }}
              translation={translation}
            />
          </div>
        </AppPageTransition>
      </AppAuthorizationGuard>
    </Suspense>
  );
};
