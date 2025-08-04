import {
  AppDataGrid,
  AppDataGridColumn,
  RenderFnParams,
} from "../../../../../presentation/Components/AppDataGrid";
import { Chip } from "@nextui-org/react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc"; // Importa el plugin UTC de Day.js
import timezone from "dayjs/plugin/timezone"; // Importa el plugin de zona horaria de Day.js
import { DateInitParse } from "./date-init-parse";
import { DateFinishParse } from "./date-finish-parse";
import { DaysParse } from "./days-parse";
import { TFunction } from "i18next";
dayjs.extend(utc);
dayjs.extend(timezone);
type Shedules = {
  alarmExceptionType: number;
  dateInit: string;
  dateFinish: string;
  strDays: string;
};
export type AlarmExceptionSchedulesTableProps = {
  items?: Shedules[];
  translation: TFunction<[string], undefined>;
};

const DateInitAlarmExceptionScheduleColumn = (
  params: RenderFnParams<Shedules>
) => {
  return (
    <>
      {params.record.strDays !== "null" ? (
        <DateInitParse strDays={params.record.strDays} />
      ) : (
        <Chip color={"primary"} variant="shadow" radius="full">
          <span>
            {dayjs
              .utc(params.record.dateInit)
              .local()
              .format("MM/DD/YYYY HH:mm:ss A")}
          </span>
        </Chip>
      )}
    </>
  );
};
const DateFinishAlarmExceptionScheduleColumn = (
  params: RenderFnParams<Shedules>
) => {
  return (
    <>
      {params.record.strDays !== "null" ? (
        <DateFinishParse strDays={params.record.strDays}></DateFinishParse>
      ) : (
        <Chip color={"primary"} variant="shadow" radius="full">
          <span>
            {dayjs
              .utc(params.record.dateFinish)
              .local()
              .format("MM/DD/YYYY HH:mm:ss A")}
          </span>
        </Chip>
      )}
    </>
  );
};

const DateDaysAlarmExceptionScheduleColumn = (
  params: RenderFnParams<Shedules>
) => {
  return (
    //TODO: CHECK THE PARSE DAYS COMPONENT
    <>
      {params.record.strDays !== "null" ? (
        <DaysParse strDays={params.record.strDays}></DaysParse>
      ) : (
        ""
      )}
    </>
  );
};

export const AppAlarmExceptionSchedulesTable = ({
  items,
  translation,
}: AlarmExceptionSchedulesTableProps) => {
  const columns: AppDataGridColumn<Shedules>[] = [
    {
      key: "DateInitAlarmExceptionScheduleColumn",
      dataIndex: "DateInitAlarmExceptionScheduleColumn",
      title: translation("StartDateColumn"),
      render: DateInitAlarmExceptionScheduleColumn,
    },
    {
      key: "DateFinishAlarmExceptionScheduleColumn",
      dataIndex: "DateFinishAlarmExceptionScheduleColumn",
      title: translation("EndDateColumn"),
      render: DateFinishAlarmExceptionScheduleColumn,
    },
    {
      key: "DateDaysAlarmExceptionScheduleColumn",
      dataIndex: "DateDaysAlarmExceptionScheduleColumn",
      title: translation("DaysDateColumn"),
      render: DateDaysAlarmExceptionScheduleColumn,
    },
  ];
  return (
    <AppDataGrid<Shedules> columns={columns} dataSource={items} itemKey="id" />
  );
};
