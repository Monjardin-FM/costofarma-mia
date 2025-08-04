import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Chip,
  Divider,
  Tooltip,
} from "@nextui-org/react";
import { Tracking } from "../../../tracking/domain/entities/tracking";
import * as Icon from "react-feather";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc"; // Importa el plugin UTC de Day.js
import timezone from "dayjs/plugin/timezone"; // Importa el plugin de zona horaria de Day.js
import { TFunction } from "i18next";
import { useEffect } from "react";

dayjs.extend(utc);
dayjs.extend(timezone);
export type AppAlertCardProps = {
  alert?: Tracking[];
  handleClick: (item: Tracking) => void;
  translation: TFunction;
};
export const AppAlertCard = ({
  alert,
  handleClick,
  translation,
}: AppAlertCardProps) => {
  useEffect(() => {}, [alert]);
  return (
    <div className="flex flex-col items-center justify-items-center gap-3 mt-5 w-72">
      {alert?.map((item) => (
        <Card
          className="w-full"
          radius="lg"
          isBlurred={true}
          shadow="lg"
          key={item.personId}
          isHoverable
        >
          <CardBody className="flex flex-col justify-center gap-5">
            <Chip color="primary" variant="shadow">
              <b>{`${item?.name} ${item.lastName} `}</b>{" "}
            </Chip>
            {item.alerts.map((alert) => (
              <>
                <div className="flex flex-row items-center justify-around">
                  <span className="text-primaryColor-800 font-semibold ">
                    {alert.alarmName}
                  </span>

                  <Chip color={"danger"} variant="shadow" radius="md">
                    <Icon.AlertTriangle size={12} />
                  </Chip>
                </div>
                <div className="self-center">
                  <Chip color="primary" variant="shadow" radius="md">
                    <span className="font-semibold text-sm  tracking-wider">
                      {dayjs
                        .utc(alert.timestamp)
                        .local()
                        .format("MM/DD/YYYY HH:mm:ss A")}
                    </span>
                  </Chip>
                </div>
              </>
            ))}
          </CardBody>
          <Divider />
          <CardFooter className="flex flex-col items-center justify-center">
            <Tooltip
              content={translation("CardTooltip")}
              showArrow
              color="warning"
              disableAnimation
              closeDelay={100}
              placement="bottom"
            >
              <Button
                isIconOnly
                value="light"
                onClick={() => handleClick(item)}
                color="warning"
              >
                <Icon.Map size={18} />
              </Button>
            </Tooltip>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};
