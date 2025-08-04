import clsx from "clsx";
import { NotificationTracking } from "../../../domain/entities/notification";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Chip,
  Divider,
} from "@nextui-org/react";
import * as Icon from "react-feather";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc"; // Importa el plugin UTC de Day.js
import timezone from "dayjs/plugin/timezone"; // Importa el plugin de zona horaria de Day.js
import { TFunction } from "i18next";
dayjs.extend(utc);
dayjs.extend(timezone);
export type NotificationCardProps = {
  notification?: NotificationTracking[];
  handleClick: (item: NotificationTracking) => void;
  translation: TFunction<[string], undefined>;
};

export const NotificationCard = ({
  notification,
  handleClick,
  translation,
}: NotificationCardProps) => {
  return (
    <div className="flex flex-col items-center justify-items-center gap-3 mt-5 w-96">
      {notification?.map((item) => (
        <Card
          radius="lg"
          isBlurred={true}
          shadow="lg"
          key={item.idNotification}
          className={clsx(
            "w-full bg-opacity-75 ",
            {
              "bg-red-200": item.idStatus === 1,
            },
            {
              "bg-success-100": item.idStatus === 2,
            }
          )}
          isHoverable
        >
          <CardBody className="flex flex-col justify-center gap-5 ">
            <div
              className={clsx(
                "absolute right-3 top-3 rounded-full w-2 h-2 ",
                {
                  "bg-red-600": item.idStatus === 1,
                },
                {
                  "bg-success-500": item.idStatus === 2,
                }
              )}
            ></div>
            <Chip color="primary" variant="shadow">
              <b>{`${item?.defendant} `}</b>{" "}
            </Chip>
            <div className="flex flex-row justify-between ">
              <Chip color="warning" variant="shadow">
                {translation("LabelOfficer")}
                <b>{item?.officer}</b>
              </Chip>
              <Button
                isIconOnly
                variant="light"
                onClick={() => {
                  handleClick(item);
                }}
                color="primary"
              >
                <Icon.Eye size={18} />
              </Button>
            </div>
          </CardBody>
          <Divider />
          <CardFooter>
            <Chip color="primary" variant="dot">
              <div className="flex flex-row items-center gap-2">
                <Icon.Calendar size={15} />
                <span>
                  {` ${dayjs
                    .utc(item?.fecAlta)
                    .local()
                    .format("MMMM/DD/YYYY HH:mm:ss A")}`}
                </span>
              </div>
            </Chip>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};
