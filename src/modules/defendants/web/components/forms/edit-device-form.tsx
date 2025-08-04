import { useEffect, useState } from "react";
import { DeviceType } from "../../../../catalog/domain/entities/device-type";
import { useGetDeviceType } from "../../../../catalog/hooks/use-get-device-type";
import { useGetDevices } from "../../../../devices/web/hooks/use-get-devices";
import { AppToast } from "../../../../../presentation/Components/AppToast";
import {
  AppFormField,
  AppFormLabel,
} from "../../../../../presentation/Components/AppForm";
import AppSelect from "../../../../../presentation/Components/AppSelect";
import Select from "react-select";
import AppTextField from "../../../../../presentation/Components/AppTextField";
import { AppButton } from "../../../../../presentation/Components/AppButton";
import { useUpdateDeviceDefendant } from "../../hooks/use-update-device-defendant";
import { DefendantDevice } from "../../../domain/entities/defendant-device";
import { TFunction } from "i18next";

export type EditDeviceFormProps = {
  onClose: () => void;
  idDefendant?: number | null;
  onReload: () => void;
  selectedDevice?: DefendantDevice | null;
  translation: TFunction<[string], undefined>;
};

export const EditDeviceForm = ({
  onClose,
  idDefendant,
  onReload,
  selectedDevice,
  translation,
}: EditDeviceFormProps) => {
  const { deviceType, getDeviceType } = useGetDeviceType();
  const [deviceTypeOptions, setDeviceTypeOptions] = useState<DeviceType[]>();
  const {
    updateDeviceDefendant,
    error: errorSave,
    loading: loadingDeviceDefendant,
  } = useUpdateDeviceDefendant();
  const [idDeviceType, setIdDeviceType] = useState<number>();
  const [idDevice, setIdDevice] = useState<number>();
  const [imeiNew, setImeiNew] = useState<string>();
  const { devices, getDevices } = useGetDevices();
  const [devicesOptions, setDevicesOptions] =
    useState<{ value: number; label: string }[]>();

  const onSubmitHandler = async () => {
    if (selectedDevice) {
      await updateDeviceDefendant({
        idDevice: Number(selectedDevice?.idDevice),
        idPerson: Number(idDefendant),
        idDeviceNew: Number(idDevice),
        imei: selectedDevice?.imei,
        imeiNew: imeiNew ?? "",
      });
    }

    if (!errorSave) {
      AppToast().fire({
        title: translation("ToastSuccesDeviceTitle"),
        text: translation("ToastSuccesDeviceText"),
        icon: "success",
      });
    }
    onClose();
    onReload();
  };
  useEffect(() => {
    if (errorSave) {
      AppToast().fire({
        title: "Error",
        text: translation("ToastErrorDeviceText"),
        icon: "error",
      });
    }
    if (loadingDeviceDefendant) {
      AppToast().fire({
        title: translation("ToastLoadingDeviceTitle"),
        text: translation("ToastLoadingDeviceText"),
        icon: "info",
      });
    }
  }, [loadingDeviceDefendant, errorSave]);
  useEffect(() => {
    getDeviceType();
    getDevices({ completeName: "" });
  }, []);
  useEffect(() => {
    if (deviceType) {
      const deviceTypeFiltered = deviceType.filter(
        (item) => item.idDeviceType === 1
      );
      setDeviceTypeOptions(deviceTypeFiltered);
    }
    if (devices) {
      const filteredDevices = devices.filter((item) => item.idDeviceType === 1);
      setDevicesOptions(
        filteredDevices.map((item) => ({
          value: item.idDevice,
          label: item.description,
        }))
      );
    }
  }, [deviceType, devices]);
  return (
    <div className="grid grid-cols-12 gap-y-4 gap-x-3 col-span-12 border border-gray-300 rounded-lg p-6 bg-gray-200">
      <AppFormField className="col-span-4">
        <AppFormLabel>{translation("LabelDeviceType")}</AppFormLabel>
        <AppSelect
          name="idDeviceType"
          value={idDeviceType}
          onChange={(e) => setIdDeviceType(Number(e.target.value))}
        >
          <option value={0}>{translation("LabelSelectDeviceType")}</option>
          {deviceTypeOptions?.map((device) => (
            <option key={device.idDeviceType} value={device.idDeviceType}>
              {device.deviceType}
            </option>
          ))}
        </AppSelect>
      </AppFormField>
      {idDeviceType !== 0 ? (
        <>
          {idDeviceType === 1 ? (
            // && available ===1
            <AppFormField className="col-span-4">
              <AppFormLabel>{translation("LabelBracelet")}</AppFormLabel>
              <Select
                options={devicesOptions}
                isSearchable={true}
                onChange={(e) => {
                  setIdDevice(e?.value);
                  setImeiNew(e?.label);
                }}
              />
            </AppFormField>
          ) : (
            <AppFormField className="col-span-4">
              <AppFormLabel>{translation("LabelModel")}</AppFormLabel>
              <AppTextField />
            </AppFormField>
          )}
        </>
      ) : (
        ""
      )}
      <div className="col-span-12 flex flex-row items-center justify-end gap-4">
        <AppButton onClick={onClose}>{translation("ButtonCancel")}</AppButton>
        <AppButton
          colorScheme="primary"
          onClick={() => {
            onSubmitHandler();
          }}
          isDisabled={
            idDeviceType === 0 ||
            idDevice === 0 ||
            !idDefendant ||
            loadingDeviceDefendant
          }
          isLoading={loadingDeviceDefendant}
        >
          {translation("ButtonSave")}
        </AppButton>
      </div>
    </div>
  );
};
