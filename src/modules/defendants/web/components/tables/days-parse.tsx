import dayjs from "dayjs";
import utc from "dayjs/plugin/utc"; // Importa el plugin UTC de Day.js
import timezone from "dayjs/plugin/timezone"; // Importa el plugin de zona horaria de Day.js
import { useEffect, useState } from "react";
import { Intervals, StrDays } from "../../../domain/entities/alarm-defendant";
import { Chip } from "@nextui-org/react";

dayjs.extend(utc);
dayjs.extend(timezone);

const convertDaysWeek = (days: number[]): string => {
  const nameDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const daysNames = days.map((day) => nameDays[day - 1]);
  return daysNames.join(", ");
};
export type DaysParseProps = {
  strDays: string;
};
export const DaysParse = ({ strDays }: DaysParseProps) => {
  const [intervals, setIntervals] = useState<Intervals[]>([]);
  useEffect(() => {
    if (strDays !== "") {
      const itemsSchedule: StrDays = JSON.parse(strDays);
      const itemsIntervals = itemsSchedule.intervals;
      setIntervals(itemsIntervals);
    }
  }, []);
  return (
    <div className="flex flex-col gap-2">
      {intervals?.map((inter) => (
        <Chip color="warning" size="lg">
          <p className="text-balance leading-3 tracking-tight text-sm">
            {convertDaysWeek(inter.days)}
          </p>
        </Chip>
      ))}
    </div>
  );
};
