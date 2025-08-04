import dayjs from "dayjs";
import utc from "dayjs/plugin/utc"; // Importa el plugin UTC de Day.js
import timezone from "dayjs/plugin/timezone"; // Importa el plugin de zona horaria de Day.js
import { useEffect, useState } from "react";
import { Intervals, StrDays } from "../../../domain/entities/alarm-defendant";
import { Chip } from "@nextui-org/react";

dayjs.extend(utc);
dayjs.extend(timezone);

const convertHour = (utcTime: string): string => {
  // Parsear la hora UTC como un objeto Date
  const utcDate = new Date(`2000-01-01T${utcTime}:00Z`); // Asignamos una fecha arbitraria ya que solo nos interesa la hora

  // Obtener el desplazamiento de la zona horaria local en minutos
  const offsetMinutes = new Date().getTimezoneOffset();

  // Aplicar el desplazamiento de la zona horaria local a la hora UTC
  const localTime = new Date(utcDate.getTime() - offsetMinutes * 60000);

  // Formatear la hora local en formato HH:mm
  const horaLocal = localTime.toISOString().slice(11, 16);

  return horaLocal;
};

export type DateFinishParseProps = {
  strDays: string;
};
export const DateFinishParse = ({ strDays }: DateFinishParseProps) => {
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
        <Chip color="secondary">
          <p className="text-balance leading-3 tracking-tight text-sm">
            {convertHour(inter.end)}
          </p>
        </Chip>
      ))}
    </div>
  );
};
