import { useEffect, useState } from "react";
import {
  GeofenceHistoric,
  Historic,
  HistoricPosition,
} from "../../../tracking/domain/entities/historic-position";
import { Button, Slider, SliderValue, Tooltip } from "@nextui-org/react";
import dayjs from "dayjs";
import { AppFormField } from "../../../../presentation/Components/AppForm";
import AppDatePicker from "../../../../presentation/Components/AppDatePicker";
import { MapHistoricPosition } from "../../../tracking/web/components/maps/map-historic-position";
import { useFindHistoricDeletedDefendantPosition } from "../hooks/use-find-historic-position-deleted-defendant";

type AppTrackingHistoricInactiveDefendantsProps = {
  idDefendant?: number | null;
};

export const AppTrackingHistoricInactiveDefendants = ({
  idDefendant,
}: AppTrackingHistoricInactiveDefendantsProps) => {
  const [dateInitSearch, setDateInitSearch] = useState<string>();
  const [dateFinishSearch, setDateFinishSearch] = useState<string>();
  const [dateInit, setDateInit] = useState<Date>(new Date());
  const [dateFinish, setDateFinish] = useState<Date>(new Date());
  //   const [userId, setUserId] = useState<number | null>();
  const { findHistoricDeltededDefendantPosition, historicPosition, loading } =
    useFindHistoricDeletedDefendantPosition();
  const [defendantPosition, setDefendantPosition] =
    useState<HistoricPosition | null>();
  const [victimsPosition, setVictimsPosition] = useState<
    HistoricPosition[] | null
  >();
  const [geofences, setGeofences] = useState<GeofenceHistoric[]>();
  const [rangePositionsDefendant, setRangePositionsDefendant] =
    useState<Historic[]>();
  const [positionSelectedDefendant, setPositionSelectedDefendant] =
    useState<Historic>();

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
    if (idDefendant)
      await findHistoricDeltededDefendantPosition({
        dateInit: dateInitSearch ?? "",
        dateFin: dateFinishSearch ?? "",
        idPerson: idDefendant,
      });
  };

  useEffect(() => {
    if (historicPosition && historicPosition.length > 0) {
      const defendantPositionFilter = historicPosition?.find(
        (item) => item.idPersonType === 2
      );
      setDefendantPosition(defendantPositionFilter);
      const victimPositionFilter = historicPosition?.filter(
        (item) => item.idPersonType === 3
      );
      setVictimsPosition(victimPositionFilter);
      if (defendantPositionFilter) {
        setGeofences(defendantPositionFilter.geofences);
      }
      setRangePositionsDefendant(
        defendantPositionFilter?.historicPersonPosition
      );
    }
  }, [historicPosition]);
  // Transform dates in to strings
  useEffect(() => {
    setDateInitSearch(dayjs(dateInit.getTime()).toISOString());
    setDateFinishSearch(dayjs(dateFinish.getTime()).toISOString());
  }, [dateInit, setDateFinish]);

  // get idDefendant in local storage
  //   useEffect(() => {
  //     const storedUserId = localStorage.getItem("trackingId");
  //     if (storedUserId) setUserId(Number(storedUserId));
  //   }, []);
  return (
    <div className="w-full flex flex-row items-start justify-center p-10 -z-10">
      <div className="flex flex-col text-center items-center w-2/5  gap-3">
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
          onClick={handleSubmit}
          isDisabled={loading}
          isLoading={loading}
        >
          Search
        </Button>
      </div>

      <div className=" w-3/5 flex flex-col rounded-lg bg-gray-200 mb-5 gap-5 p-2">
        <MapHistoricPosition
          defendantPosition={defendantPosition}
          victimPosition={victimsPosition}
          geofences={geofences}
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
