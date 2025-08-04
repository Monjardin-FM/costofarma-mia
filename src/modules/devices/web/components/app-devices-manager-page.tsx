import { useEffect, useMemo, useState } from "react";
import AppConfig from "../../../../settings.json";
import { AppDevicesHeader } from "./app-devices-header";
import * as Icon from "react-feather";
import { useToggle } from "react-use";
import { AppNewDeviceModal } from "./modals/app-new-device-modal";
import { useGetDevices } from "../hooks/use-get-devices";
import { AppEditDeviceModal } from "./modals/app-edit-device";
import { useDeleteDevice } from "../hooks/use-delete-device";
import { AppAuthorizationGuard } from "../../../../presentation/Components/AppAuthorizationGuard";
import { UserRole } from "../../../user/domain/entities/user-role";
import { AppLoading } from "../../../../presentation/Components/AppLoading";
import { AppPageTransition } from "../../../../presentation/Components/AppPageTransition";
import { Button, Pagination, Tooltip } from "@nextui-org/react";
import { AppDevicessTable } from "./tables/app-device-table";
import { Device } from "../../domain/entities/device";
import { AppTrackingDeviceModal } from "./modals/app-tracking-device-modal";
import { useTranslation } from "react-i18next";

export const AppDevicesManagerPage = () => {
  const { t: translation } = useTranslation("Devices");

  const [visibleNewDeviceModal, setVisibleNewDeviceModal] = useToggle(false);
  const [visibleEditDeviceModal, setVisibleEditDeviceModal] = useToggle(false);
  const [visibleTrackingDeviceModal, setVisibleTrackingDeviceModal] =
    useToggle(false);
  const [idDevice, setIdDevice] = useState<number>();
  const { devices, getDevices, loading: loadingDevices } = useGetDevices();
  const [toggleReload, setToggleReload] = useToggle(false);
  const [selectedDeviceTrack, setSelectedDeviceTrack] =
    useState<Device | null>();
  const { deleteDevice, loading: loadingDeleteDevice } = useDeleteDevice();
  const onClick = (search: string) => {
    getDevices({ completeName: search });
  };
  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(0);

  const rowsPerPage = 10;

  useEffect(() => {
    if (devices) {
      const nPages = Math.ceil(devices?.length / rowsPerPage);
      setPages(nPages);
    }
  }, [devices]);

  const data = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return devices?.slice(start, end);
  }, [page, devices]);

  // useEffect debounce search
  useEffect(() => {
    if (search.length > 1 || search.length === 0) {
      const timeDelay = setTimeout(() => {
        onClick(search);
      }, 500);
      return () => clearTimeout(timeDelay);
    }
  }, [search, toggleReload]);
  // useEffect to getDevices when render the component
  useEffect(() => {
    getDevices({ completeName: "" });
  }, [toggleReload]);
  return (
    <AppAuthorizationGuard
      roles={AppConfig["devices.managerPage.authorization"] as UserRole[]}
      redirect={{ to: "/" }}
    >
      {!devices && <AppLoading />}
      <AppNewDeviceModal
        isVisible={visibleNewDeviceModal}
        onClose={() => setVisibleNewDeviceModal(false)}
        onReload={() => setToggleReload(!toggleReload)}
        translation={translation}
      />
      <AppEditDeviceModal
        isVisible={visibleEditDeviceModal}
        onClose={() => setVisibleEditDeviceModal(false)}
        onReload={() => setToggleReload(!toggleReload)}
        idDevice={idDevice}
        translation={translation}
      />
      <AppTrackingDeviceModal
        isVisible={visibleTrackingDeviceModal}
        onClose={() => setVisibleTrackingDeviceModal(false)}
        deviceInfo={selectedDeviceTrack}
      />
      <AppPageTransition>
        <div className="items-center mx-auto mb-5">
          <AppDevicesHeader
            onClick={onClick}
            loadingDevices={loadingDevices}
            search={search}
            setSearch={setSearch}
            translation={translation}
          />
        </div>
        <div className="container mx-auto flex flex-col items-end jusitfy-center">
          <Tooltip
            content={translation("TooltipNewDevice")}
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
              onClick={() => setVisibleNewDeviceModal(true)}
              isIconOnly
              size="md"
            >
              <Icon.PlusCircle color="white" />
            </Button>
          </Tooltip>
        </div>
        <div className="mt-5 flex flex-col items-center w-full justify-center gap-5 mb-10 bg-gray-100 container mx-auto p-3 rounded-lg">
          <div className="w-full container">
            <AppDevicessTable
              onEdit={(record) => {
                setIdDevice(record.record.idDevice);
                setVisibleEditDeviceModal(true);
              }}
              onDelete={async (record) => {
                if (record.record.idDevice) {
                  await deleteDevice({ idDevice: record.record.idDevice });
                }
                setToggleReload(!toggleReload);
              }}
              onTracking={(record) => {
                setSelectedDeviceTrack(record.record);
                setVisibleTrackingDeviceModal(true);
              }}
              items={data}
              loadingDeleteDevice={loadingDeleteDevice}
              translation={translation}
            />
          </div>
          <div>
            <Pagination
              loop
              // isCompact
              showControls
              showShadow
              color="primary"
              page={page}
              total={pages}
              onChange={(page) => setPage(page)}
              className="w-full container"
            />
          </div>
        </div>
      </AppPageTransition>
    </AppAuthorizationGuard>
  );
};
