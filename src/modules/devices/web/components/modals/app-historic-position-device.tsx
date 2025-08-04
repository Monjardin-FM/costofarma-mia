import { useEffect, useState } from "react";
import { Device } from "../../../domain/entities/device";
import { useGetHistoricPositionDevice } from "../../hooks/use-get-historic-position-device";
import dayjs from "dayjs";
import { AppFormField } from "../../../../../presentation/Components/AppForm";
import AppDatePicker from "../../../../../presentation/Components/AppDatePicker";
import { Button, Slider, SliderValue, Tooltip } from "@nextui-org/react";
import { MapHistoricPositionDevice } from "../maps/map-historic-position-device";
import { DeviceHistoricPosition } from "../../../domain/entities/device-position";

export type AppHistoricPositionDeviceProps = {
  deviceInfo?: Device | null;
};
export const AppHistoricPositionDevice = ({
  deviceInfo,
}: AppHistoricPositionDeviceProps) => {
  const [dateInitSearch, setDateInitSearch] = useState<string>();
  const [dateFinishSearch, setDateFinishSearch] = useState<string>();
  const [dateInit, setDateInit] = useState<Date>(new Date());
  const [dateFinish, setDateFinish] = useState<Date>(new Date());
  const { getHistoricPositionDevice, historicPositionDevice, loading } =
    useGetHistoricPositionDevice();

  const [rangePositionsDefendant, setRangePositionsDefendant] =
    useState<DeviceHistoricPosition[]>();
  const [positionSelectedDefendant, setPositionSelectedDefendant] =
    useState<DeviceHistoricPosition>();

  const [value, setValue] = useState<SliderValue>(0);
  const [inputValue, setInputValue] = useState<string>("0");

  const handleChange = (value: SliderValue) => {
    if (isNaN(Number(value))) return;

    setValue(value);
    setInputValue(value.toString());
    if (rangePositionsDefendant) {
      setPositionSelectedDefendant(rangePositionsDefendant[Number(inputValue)]);
    }
  };

  const handleSubmit = async () => {
    if (deviceInfo) {
      if (deviceInfo.idDeviceType === 1) {
        await getHistoricPositionDevice({
          dateInit: dateInitSearch ?? "",
          dateFin: dateFinishSearch ?? "",
          deviceId: deviceInfo.description,
        });
      } else if (deviceInfo.idDeviceType === 3) {
        await getHistoricPositionDevice({
          dateInit: dateInitSearch ?? "",
          dateFin: dateFinishSearch ?? "",
          deviceId: String(deviceInfo.idPerson),
        });
      }
    }
  };

  useEffect(() => {
    if (historicPositionDevice && historicPositionDevice.length > 0)
      setRangePositionsDefendant(historicPositionDevice);
  }, [historicPositionDevice]);
  useEffect(() => {
    setDateInitSearch(dayjs(dateInit.getTime()).toISOString());
    setDateFinishSearch(dayjs(dateFinish.getTime()).toISOString());
  }, [dateInit, setDateFinish]);
  return (
    <div className="w-full flex flex-row items-start justify-center">
      <div className="flex flex-col text-center items-center w-2/5  gap-3 z-50">
        <AppFormField className="col-span-4">
          <AppDatePicker
            selected={dateInit}
            onChange={(date) => {
              if (date instanceof Date) setDateInit(date);
            }}
            className="col-span-4"
            placeholderText="From"
            showTimeInput
            dateFormat="MMMM d, yyyy h:mm aa"
            inline
          />
        </AppFormField>
        <AppFormField className="col-span-4">
          <AppDatePicker
            selected={dateFinish}
            onChange={(date) => {
              if (date instanceof Date) {
                setDateFinish(date);
              }
            }}
            className="col-span-4"
            placeholderText="From"
            showTimeInput
            dateFormat="MMMM d, yyyy h:mm aa"
            inline
          />
        </AppFormField>
        <Button
          color="primary"
          className="w-1/2 tex-center"
          onPress={handleSubmit}
          isDisabled={loading}
          isLoading={loading}
        >
          Search
        </Button>
      </div>
      <div className=" w-3/5 flex flex-col rounded-lg bg-gray-200 mb-5 gap-5 p-2">
        <MapHistoricPositionDevice
          historicPositionDevice={historicPositionDevice}
          positionSelectedDefendant={positionSelectedDefendant}
        />
        {rangePositionsDefendant ? (
          <Slider
            label={`Defendant position ${Number(inputValue)} of ${Number(
              rangePositionsDefendant?.length
            )} positions`}
            size="sm"
            step={1}
            maxValue={rangePositionsDefendant?.length}
            minValue={0}
            color="danger"
            classNames={{
              base: "max-w-md",
              label: "text-medium",
            }}
            // we extract the default children to render the input
            renderValue={({ children, ...props }) => (
              <output {...props}>
                <Tooltip
                  className="text-tiny text-danger-500 rounded-md"
                  content="Press Enter to confirm"
                  placement="right-end"
                  disableAnimation
                >
                  <input
                    className="px-1 py-0.5 w-20 text-right text-small text-danger-500 font-medium bg-danger-100 outline-double transition-colors rounded-small border-medium border-transparent hover:border-danger-500 focus:border-danger-500"
                    type="number"
                    aria-label="Position"
                    max={rangePositionsDefendant.length}
                    min={0}
                    value={inputValue}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      const v = e.target.value;
                      setPositionSelectedDefendant(
                        rangePositionsDefendant[Number(inputValue)]
                      );
                      setInputValue(v);
                      setValue(Number(e.target.value));
                    }}
                    onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                      if (e.key === "Enter" && !isNaN(Number(inputValue))) {
                        setValue(Number(inputValue));
                        setPositionSelectedDefendant(
                          rangePositionsDefendant[Number(inputValue)]
                        );
                      }
                    }}
                  />
                </Tooltip>
              </output>
            )}
            value={value}
            onChange={handleChange}
          />
        ) : (
          ""
        )}
      </div>
    </div>
  );
};
