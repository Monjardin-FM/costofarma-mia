import { useEffect, useState } from "react";
import { Multiselect } from "multiselect-react-dropdown";
import { useCreateAlarm } from "../../hooks/use-create-alarm";
import { Formik } from "formik";
import { useGetResponsiveDevices } from "../../../../catalog/hooks/use-get-responsive-devices";
import { useGetDeviceType } from "../../../../catalog/hooks/use-get-device-type";
import { ResponseDevice } from "../../../../catalog/domain/entities/response-device";
import { DeviceType } from "../../../../catalog/domain/entities/device-type";
import {
  AppModal,
  AppModalBody,
  AppModalCloseButton,
  AppModalContent,
  AppModalFooter,
  AppModalHeader,
  AppModalOverlay,
} from "../../../../../presentation/Components/AppModal";
import {
  AppFormField,
  AppFormLabel,
} from "../../../../../presentation/Components/AppForm";
import AppTextField from "../../../../../presentation/Components/AppTextField";
import { AppButton } from "../../../../../presentation/Components/AppButton";
import { Switch } from "@headlessui/react";
import { TFunction } from "i18next";

export type AppNewAlarmModalProps = {
  isVisible: boolean;
  onClose: () => void;
  onReload: () => void;
  translation: TFunction<[string], undefined>;
};
type AlarmCreateFormValues = {
  name: string;
  interval: number;
  geocordinateTimeout: number;
  restrainingDistance: number;
  cancellationTime: number;
  textSMS: string;
  textMail: string;
  callResponse: string;
};
export const AppNewAlarmModal = ({
  isVisible,
  onClose,
  onReload,
  translation,
}: AppNewAlarmModalProps) => {
  const { createAlarm } = useCreateAlarm();
  const { responsiveDevices, getResponsiveDevices } = useGetResponsiveDevices();
  const { deviceType, getDeviceType } = useGetDeviceType();
  const [selectedResponseDevicesValues, setSelectedResponseDevices] = useState<
    Omit<ResponseDevice, "responseDevice">[]
  >([]);
  const [selectedDeviceTypeValues, setSelectedDeviceType] = useState<
    Omit<DeviceType, "deviceType">[]
  >([]);
  const [status, setStatus] = useState(false);

  const onSubmitHandler = async (data: AlarmCreateFormValues) => {
    await createAlarm({
      automatic: status,

      callText: data.callResponse,
      enableResponseCall: data.callResponse.length > 0,
      description: data.name,
      dynamicDistance: Number(data.restrainingDistance),
      geocordinateTimeout: Number(data.geocordinateTimeout),
      responseInterval: Number(data.interval),
      resolveTime: Number(data.cancellationTime),
      idStatus: 1,
      lAssignedDevice: selectedDeviceTypeValues,
      lResponseDevice: selectedResponseDevicesValues,
      mailText: data.textMail,
      smsText: data.textSMS,
    });
    onReload();
    onClose();
  };

  const getIdResponse = (
    selectedList: ResponseDevice[]
  ): Omit<ResponseDevice, "responseDevice">[] => {
    return selectedList.map((device) => ({
      idResponseDevice: device.idResponseDevice,
    }));
  };
  const getIdDevice = (
    selectedList: DeviceType[]
  ): Omit<DeviceType, "deviceType">[] => {
    return selectedList.map((device) => ({
      idDeviceType: device.idDeviceType,
    }));
  };
  const onSelectResponseDevices = (
    selectedList: ResponseDevice[]
    // selectedItems: [],
  ) => {
    const idList: Omit<ResponseDevice, "responseDevice">[] =
      getIdResponse(selectedList);
    setSelectedResponseDevices(idList);
  };
  const onSelectDeviceType = (
    selectedList: DeviceType[]
    // selectedItems: [],
  ) => {
    const idList: Omit<DeviceType, "deviceType">[] = getIdDevice(selectedList);
    setSelectedDeviceType(idList);
  };
  useEffect(() => {
    getResponsiveDevices();
    getDeviceType();
  }, []);
  return (
    <AppModal isVisible={isVisible} onClose={onClose} size="7xl">
      <AppModalOverlay>
        <AppModalContent>
          <Formik
            enableReinitialize
            initialValues={{
              name: "",
              automatic: false,
              interval: 0,
              geocordinateTimeout: 0,
              restrainingDistance: 0,
              cancellationTime: 0,
              textSMS: "",
              textMail: "",
              callResponse: "",
            }}
            onSubmit={onSubmitHandler}
          >
            {({ handleSubmit, handleChange, values }) => (
              <form onSubmit={handleSubmit}>
                <AppModalHeader>
                  <AppModalCloseButton />
                  {translation("ModalNewAlarmTitle")}
                </AppModalHeader>
                <AppModalBody>
                  <div className="grid grid-cols-12 gap-y-4 gap-x-3">
                    <div className="grid grid-cols-12 col-span-6 gap-x-3 gap-y-4">
                      <AppFormField className="col-span-6">
                        <AppFormLabel>
                          {translation("LabelAlarmName")}
                        </AppFormLabel>
                        <AppTextField
                          name="name"
                          value={values.name}
                          onChange={handleChange}
                        />
                      </AppFormField>

                      <AppFormField className="col-span-6">
                        <AppFormLabel>
                          {translation("LabelAutomaticAlarm")}
                        </AppFormLabel>
                        <div className="flex flex-row items-center justify-start gap-5">
                          <span>{translation("TooltipActiveAlarm")}</span>
                          <Switch
                            checked={status}
                            onChange={setStatus}
                            className={`${
                              status
                                ? "bg-primaryColor-600"
                                : "bg-primaryColor-200"
                            } relative inline-flex h-6 w-11 items-center rounded-full`}
                          >
                            <span className="sr-only">
                              Enable notifications
                            </span>
                            <span
                              className={`${
                                status ? "translate-x-6" : "translate-x-1"
                              } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                            />
                          </Switch>
                          <span>{translation("TooltipInactiveAlarm")}</span>
                        </div>
                      </AppFormField>
                      <AppFormField className="col-span-6">
                        <AppFormLabel>
                          {translation("LabelResponseDevices")}
                        </AppFormLabel>
                        <Multiselect
                          displayValue="responseDevice"
                          showCheckbox={true}
                          options={responsiveDevices}
                          onSelect={onSelectResponseDevices}
                        />
                      </AppFormField>
                      <AppFormField className="col-span-6">
                        <AppFormLabel>
                          {translation("LabelAssignedDevices")}
                        </AppFormLabel>
                        <Multiselect
                          displayValue="deviceType"
                          showCheckbox={true}
                          options={deviceType}
                          onSelect={onSelectDeviceType}
                        />
                      </AppFormField>
                      <AppFormField className="col-span-6">
                        <AppFormLabel>
                          {translation("LabelInterval")}
                        </AppFormLabel>
                        <AppTextField
                          name="interval"
                          value={values.interval}
                          onChange={handleChange}
                        />
                      </AppFormField>
                      <AppFormField className="col-span-6">
                        <AppFormLabel>
                          {translation("LabelGeocoordinates")}
                        </AppFormLabel>
                        <AppTextField
                          name="geocordinateTimeout"
                          value={values.geocordinateTimeout}
                          onChange={handleChange}
                        />
                      </AppFormField>
                      <AppFormField className="col-span-6">
                        <AppFormLabel>
                          {translation("LabelRestrainingDistance")}
                        </AppFormLabel>
                        <AppTextField
                          name="restrainingDistance"
                          value={values.restrainingDistance}
                          onChange={handleChange}
                        />
                      </AppFormField>
                      <AppFormField className="col-span-6">
                        <AppFormLabel>
                          {translation("LabelCancellationTime")}
                        </AppFormLabel>
                        <AppTextField
                          name="cancellationTime"
                          value={values.cancellationTime}
                          onChange={handleChange}
                        />
                      </AppFormField>
                    </div>
                    <div className="grid grid-cols-12 col-span-6 gap-x-3 gap-y-5">
                      <AppFormField className="col-span-6 ">
                        <AppFormLabel>
                          {translation("LabelTextSMS")}
                        </AppFormLabel>
                        <textarea
                          name="textSMS"
                          value={values.textSMS}
                          onChange={handleChange}
                          className="w-full h-40 border border-gray-300 rounded-lg p-5"
                        ></textarea>
                      </AppFormField>
                      <AppFormField className="col-span-6">
                        <AppFormLabel>
                          {translation("LabelTextEmail")}
                        </AppFormLabel>
                        <textarea
                          name="textMail"
                          value={values.textMail}
                          onChange={handleChange}
                          className="w-full h-40 border border-gray-300 rounded-lg p-5"
                        ></textarea>
                      </AppFormField>
                      <AppFormField className="col-span-6 ">
                        <AppFormLabel>{translation("LabelCall")}</AppFormLabel>
                        <textarea
                          name="callResponse"
                          value={values.callResponse}
                          onChange={handleChange}
                          className="w-full h-40 border border-gray-300 rounded-lg p-5"
                        ></textarea>
                      </AppFormField>
                    </div>
                  </div>
                </AppModalBody>
                <AppModalFooter>
                  <AppButton onClick={onClose}>
                    {translation("ButtonCancel")}
                  </AppButton>
                  <AppButton colorScheme="primary" type="submit">
                    {translation("ButtonSave")}
                  </AppButton>
                </AppModalFooter>
              </form>
            )}
          </Formik>
        </AppModalContent>
      </AppModalOverlay>
    </AppModal>
  );
};
