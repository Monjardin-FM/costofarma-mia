import { Marker, Tooltip, useMap } from "react-leaflet";
import { PersonAlert } from "../../../domain/entities/tracking-detail";
import { useEffect } from "react";
import AlarmIcon from "../../../../../assets/icons/alarm-marker.png";
import { Icon } from "leaflet";
import * as IconFeather from "react-feather";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc"; // Importa el plugin UTC de Day.js
import timezone from "dayjs/plugin/timezone"; // Importa el plugin de zona horaria de Day.js

dayjs.extend(utc);
dayjs.extend(timezone);
type FlyNewPositionMarkerAlarmProps = {
  markerAlarmMap?: PersonAlert | null;
};
// Marker with last position
export const FlyNewPositionMarkerAlarm = ({
  markerAlarmMap,
}: FlyNewPositionMarkerAlarmProps) => {
  const map = useMap();
  useEffect(() => {
    if (markerAlarmMap)
      map.flyTo(
        [markerAlarmMap?.device1Latitude, markerAlarmMap?.device1Longitude],
        15
      );
  }, [markerAlarmMap]);
  const alarmIcon = new Icon({
    iconUrl: AlarmIcon,
    iconSize: [35, 35], // size of the icon
    iconAnchor: [17.5, 35], // point of the icon which will correspond to marker's location
    popupAnchor: [0, -35], // point from which the popup should open relative to the iconAnchor
  });
  return markerAlarmMap ? (
    <Marker
      key={markerAlarmMap.personId}
      position={[
        markerAlarmMap?.device1Latitude,
        markerAlarmMap?.device1Longitude,
      ]}
      icon={alarmIcon}
    >
      <Tooltip direction="top" permanent={true} offset={[0, -30]}>
        <div className="flex flex-col gap-2">
          {/* <h1 className="text-red-700 text-center font-semibold">{`Defendant: ${defendantItem?.name} ${defendantItem?.lastName}`}</h1> */}
          <ul>
            <li className="flex flex-row items-center gap-2">
              <IconFeather.AlertTriangle size={10} color="orange" />
              <span>{`Alarm name: ${markerAlarmMap.alarmName}`}</span>
            </li>
            <li className="flex flex-row items-center gap-2">
              <IconFeather.Calendar size={10} color="blue" />
              <span>{`Date: ${dayjs
                .utc(markerAlarmMap.timestamp)
                .local()
                .format("MMMM/DD/YYYY HH:mm:ss A")}`}</span>
            </li>
          </ul>
        </div>
      </Tooltip>
    </Marker>
  ) : null;
};
