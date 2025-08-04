import {
  Button,
  Chip,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import * as Icon from "react-feather";
import { useGetDefendantsById } from "../../hooks/use-get-defendants-by-id";
import { AlarmForm } from "../forms/alarm-form";
import { AppAlarmDefendantsTable } from "../tables/app-defendant-alarm-table";
import { useGetDefendantAlarm } from "../../hooks/use-get-defendant-alarm";
import { useToggle } from "react-use";
import { useDeleteDefendantAlarm } from "../../hooks/use-delete-alarm.defendant";
import { AppToast } from "../../../../../presentation/Components/AppToast";
import { AppGeofenceView } from "../maps/app-geofence-view";
import { useGetDefendantAlarmById } from "../../hooks/use-get-alarm-defendant-by-id";
import { GeoJSONO } from "../../../domain/entities/geoJSON";
import { AppAlarmExceptionSchedulesTable } from "../tables/app-alarm-exception";
import { EditGeofenceForm } from "../forms/edit-geofence-form";
import { ScheduleAlarm } from "../../../domain/entities/schedule-alarm";
import { AlarmDefendant } from "../../../domain/entities/alarm-defendant";
import { TFunction } from "i18next";
// import {
//   AlarmExceptionSchedule,
//   Intervals,
//   StrDays,
// } from "../../../domain/entities/alarm-defendant";
// import { ScheduleAlarm } from "../../../domain/entities/schedule-alarm";
export type AppEditAlarmDefendantModalProps = {
  isVisible: boolean;
  onClose: () => void;
  idDefendant?: number | null;
  translation: TFunction<[string], undefined>;

  //   onEditInfo: (param: string) => void;
};
export const AppEditAlarmDefendantModal = ({
  isVisible,
  onClose,
  idDefendant,
  translation,
}: //   onEditInfo,
AppEditAlarmDefendantModalProps) => {
  const { defendant, getDefendantById } = useGetDefendantsById();
  const { defendantAlarm, getDefendantAlarm } = useGetDefendantAlarm();
  const [visibleAlarmForm, setVisibleAlarmForm] = useState(false);
  const [visibleMapGeofence, setVisibleMapGeofence] = useState(false);
  const [toggleReload, setToggleReload] = useToggle(false);
  const [idAlarmDefendant, setIdAlarmDefendant] = useState<number | null>();
  const [visibleEditGeofence, setVisibleEditGeofence] = useState(false);
  const {
    deleteDefendantAlarm,
    loading: loadingDelete,
    error: errorDelete,
  } = useDeleteDefendantAlarm();
  const { defendantAlarmById, getDefendantAlarmById } =
    useGetDefendantAlarmById();
  const [geofence, setGeofence] = useState<any>();
  // const [intervals, setIntervals] = useState<Intervals[]>([]);
  const [itemsScheduleException, setItemsScheduleException] =
    useState<Omit<ScheduleAlarm, "idAlarm">[]>();

  // useEffect to fetch defendant alarm
  useEffect(() => {
    if (idAlarmDefendant)
      getDefendantAlarmById({ idPersonSpecificAlarm: idAlarmDefendant });
  }, [idAlarmDefendant]);

  useEffect(() => {
    if (defendantAlarmById) {
      const geofenceJSON: GeoJSONO[] = defendantAlarmById?.lGeofence.map(
        (item) => JSON.parse(item.geofence)
      );
      setGeofence(geofenceJSON);
      const items = defendantAlarmById.alarmException.map((item) => ({
        alarmExceptionType: item.alarmExceptionType,
        dateInit: item.dateInit,
        dateFinish: item.dateFinish,
        strDays: item.strDays,
      }));
      setItemsScheduleException(items);
    }
  }, [defendantAlarmById]);

  const onDelete = () => {
    AppToast().fire({
      title: translation("ToastDeleteAlarm"),
      icon: "success",
      text: translation("ToastDeleteAlarmText"),
    });
  };

  useEffect(() => {
    if (idDefendant) {
      getDefendantById({ idPerson: idDefendant });
      getDefendantAlarm({ idPerson: idDefendant });
    }
  }, [idDefendant, toggleReload]);

  useEffect(() => {
    if (errorDelete) {
      AppToast().fire({
        title: "Error",
        icon: "error",
        text: translation("ToastErrorDeleteAlarmText"),
      });
    }
    if (loadingDelete) {
      AppToast().fire({
        title: translation("ToastLoadingDeleteAlarmTitle"),
        icon: "info",
        text: translation("ToastLoadingDeleteAlarmText"),
      });
    }
  }, [errorDelete, loadingDelete]);
  const handleView = async (record: AlarmDefendant) => {
    setVisibleMapGeofence(true);
    setIdAlarmDefendant(record.idPersonSpecificAlarm);
    setVisibleMapGeofence(false);
    await getDefendantAlarmById({
      idPersonSpecificAlarm: record.idPersonSpecificAlarm,
    });
    setVisibleMapGeofence(true);
    setVisibleAlarmForm(false);
    setVisibleEditGeofence(false);
  };

  const handleEdit = async (record: AlarmDefendant) => {
    setIdAlarmDefendant(record.idPersonSpecificAlarm);
    await getDefendantAlarmById({
      idPersonSpecificAlarm: record.idPersonSpecificAlarm,
    });
    setVisibleEditGeofence(true);
    setVisibleMapGeofence(false);
    setVisibleAlarmForm(false);
  };
  return (
    <Modal
      size="full"
      isOpen={isVisible}
      onClose={() => {
        onClose();
        setVisibleMapGeofence(false);
        setVisibleAlarmForm(false);
        setVisibleEditGeofence(false);
      }}
      backdrop="blur"
      // scrollBehavior="outside"
    >
      <ModalContent>
        {/* {(onClose) => ( */}
        <div className="overflow-auto">
          <ModalHeader className="flex flex-col items-center">
            <span className="text-primaryColor-700 absolute left-5">
              {translation("SpanEditAlarm")}
            </span>
            <Chip color="primary" variant="bordered" className="text-center">
              <div className="flex flex-row items-center jusitfy-center gap-3">
                <Icon.User size={15} />
                <span>
                  {translation("SpanDefendant")}
                  {`${defendant?.name} ${defendant?.lastName}`}
                </span>
              </div>
            </Chip>
          </ModalHeader>
          <ModalBody className="grid grid-cols-12 items-center justify-center w-full p-5 gap-5">
            <div className="col-span-12 flex flex-col items-end mx-16">
              <Button
                startContent={<Icon.Plus />}
                color="warning"
                onPress={() => {
                  setVisibleAlarmForm(true);
                  setVisibleMapGeofence(false);
                  setVisibleEditGeofence(false);
                }}
              >
                {translation("ButtonNewAlarm")}
              </Button>
            </div>
            <div className="col-span-12 mx-16">
              <AppAlarmDefendantsTable
                onDelete={async (record) => {
                  setVisibleMapGeofence(false);
                  await deleteDefendantAlarm({
                    idAlarmDefendant: record.record.idPersonSpecificAlarm,
                  });
                  if (!errorDelete) onDelete();
                  setToggleReload(!toggleReload);
                }}
                onView={({ record }) => handleView(record)}
                onEdit={({ record }) => handleEdit(record)}
                items={defendantAlarm}
                loadingDelete={loadingDelete}
                translation={translation}
              />
            </div>
            {visibleMapGeofence && (
              <div className="col-span-12 grid grid-cols-12 h-full gap-3 bg-info-100 p-3 rounded-lg items-star">
                <div className="col-span-7 flex flex-col overflow-x-auto gap-4 bg-white p-3 rounded-lg">
                  <span className="font-semibold text-primaryColor-700 text-center mt-5">
                    {translation("SpanSchedules")}
                  </span>
                  <AppAlarmExceptionSchedulesTable
                    items={itemsScheduleException}
                    translation={translation}
                  />
                </div>
                <div className="col-span-5 flex flex-col items-end gap-2">
                  <AppGeofenceView geofence={geofence} />
                  <Button
                    color="danger"
                    onPress={() => setVisibleMapGeofence(false)}
                    className="self-end"
                  >
                    {translation("ButtonHideMap")}
                  </Button>
                </div>
              </div>
            )}

            {visibleEditGeofence ? (
              <div className="col-span-12 border">
                <EditGeofenceForm
                  geofence={geofence}
                  items={itemsScheduleException}
                  idDefendant={idDefendant}
                  onReload={async () => {
                    if (defendantAlarmById?.idPersonSpecificAlarm) {
                      await deleteDefendantAlarm({
                        idAlarmDefendant:
                          defendantAlarmById?.idPersonSpecificAlarm,
                      });
                    }
                    setToggleReload(!toggleReload);
                  }}
                  onClose={() => setVisibleEditGeofence(false)}
                  translation={translation}
                />
              </div>
            ) : (
              ""
            )}
            {visibleAlarmForm ? (
              <AlarmForm
                idDefendant={idDefendant}
                onClose={() => {
                  setVisibleAlarmForm(false);
                  setToggleReload(!toggleReload);
                }}
                translation={translation}
              />
            ) : (
              ""
            )}
          </ModalBody>
        </div>
        {/* )} */}
      </ModalContent>
    </Modal>
  );
};
