import {
  MapContainer,
  TileLayer,
  Popup,
  Marker,
  GeoJSON,
  Tooltip,
  LayersControl,
  LayerGroup,
} from "react-leaflet";
import * as IconFeather from "react-feather";
// import { HistoricPosition } from "../../../domain/entities/historic-position";
import { Person, PersonAlert } from "../../../domain/entities/tracking-detail";
import "dayjs/locale/es"; // Importa el idioma local si es necesario
import { Card, Skeleton } from "@nextui-org/react";
import { Player } from "@lottiefiles/react-lottie-player";
import MapPositon from "../../../../../assets/json/position.json";
import { FullscreenControl } from "react-leaflet-fullscreen";
import { Icon } from "leaflet";
import DefIcon from "../../../../../assets/icons/defendant-marker.png";
// import AlarmIcon from "../../../../../assets/icons/alarm-marker.png";
import { FlyNewPositionMarkerAlarm } from "./marker-alarm-fly-map";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc"; // Importa el plugin UTC de Day.js
import timezone from "dayjs/plugin/timezone"; // Importa el plugin de zona horaria de Day.js
import { useEffect, useState } from "react";

dayjs.extend(utc);
dayjs.extend(timezone);

type MapTrackingProps = {
  loadingTracking: boolean;
  positionDefendant?: [number, number] | null;
  isPositionDefendant: boolean;
  defendantItem?: Person | null;
  victims?: Person[] | null;
  alertPerson?: PersonAlert[] | null;
  onClose: () => void;
  geofences?: {
    idGeofence: number;
    geofence: any;
    idAlarmType: number;
    name: string;
  }[];
  markerAlarmMap?: PersonAlert | null;
};

export const MapTracking = ({
  defendantItem,
  positionDefendant,
  victims,
  geofences,
  markerAlarmMap,
  alertPerson,
}: MapTrackingProps) => {
  const legalIcon = new Icon({
    iconUrl: DefIcon,
    iconSize: [35, 35], // size of the icon
    iconAnchor: [17.5, 35], // point of the icon which will correspond to marker's location
    popupAnchor: [0, -35], // point from which the popup should open relative to the iconAnchor
  });
  const [showVictimTracking, setShowVictimTracking] = useState(false);
  useEffect(() => {
    if (alertPerson) {
      const alarmProximity = alertPerson.filter((item) =>
        item.alarmName.includes("Proximity Alert")
      );
      if (
        alarmProximity.length > 0 &&
        alarmProximity.some((item) => item.seqMachineState) === true
      ) {
        setShowVictimTracking(true);
      } else {
        setShowVictimTracking(false);
      }
    }
  }, [alertPerson]);
  return (
    <>
      {positionDefendant && defendantItem ? (
        <MapContainer
          center={[positionDefendant[0], positionDefendant[1]]}
          zoom={20}
          scrollWheelZoom={true}
          style={{ height: "70vh", width: "100wh" }}
        >
          <FullscreenControl
            position="topright"
            title="Fullscreen mode"
            titleCancel="Exit fullscreen mode"
            content={"[ ]"}
          />
          <FlyNewPositionMarkerAlarm markerAlarmMap={markerAlarmMap} />
          {defendantItem && (
            <Marker
              key={defendantItem?.idDefendant}
              position={[positionDefendant[0], positionDefendant[1]]}
              icon={legalIcon}
            >
              <Popup>
                <div className="flex flex-col gap-2">
                  <h1 className="text-red-700 text-center font-semibold">{`Defendant: ${defendantItem?.name} ${defendantItem?.lastName}`}</h1>
                  <ul>
                    <li className="flex flex-row items-center gap-1">
                      <IconFeather.Heart size={10} color="red" />
                      <span>{`Cardio Frequency: ${defendantItem?.personPosition.cardioFrequency}`}</span>
                    </li>

                    <li className="flex flex-row items-center gap-1">
                      <IconFeather.Battery size={10} color="green" />
                      <span>{`Battery: ${defendantItem?.personPosition.battery}`}</span>
                    </li>
                    <li className="flex flex-row items-center gap-1">
                      <IconFeather.Calendar size={10} color="blue" />
                      <span>{`Date: ${dayjs
                        .utc(defendantItem?.personPosition.positionDate)
                        .local()
                        .format("MMMM/DD/YYYY HH:mm:ss A")}`}</span>
                    </li>
                    <li className="flex flex-row items-center gap-1">
                      <IconFeather.Shield size={10} color="red" />
                      <span>{`Blood Oxygen: ${defendantItem?.personPosition.bloodOxygen}`}</span>
                    </li>
                  </ul>
                </div>
              </Popup>
            </Marker>
          )}

          {victims?.map((victim) => {
            if (victim.personPosition && showVictimTracking) {
              return (
                <Marker
                  key={victim?.idPerson}
                  position={[
                    victim.personPosition.lat,
                    victim.personPosition.lon,
                  ]}
                >
                  <Popup>
                    <div className="flex flex-col gap-2">
                      <h1 className="text-primaryColor-700 text-center font-semibold">{`Victim: ${victim?.name} ${victim?.lastName}`}</h1>
                      <ul>
                        <li className="flex flex-row items-center gap-1">
                          <IconFeather.Heart size={10} color="red" />
                          <span>{`Cardio Frequency: ${victim?.personPosition.cardioFrequency}`}</span>
                        </li>

                        <li className="flex flex-row items-center gap-1">
                          <IconFeather.Battery size={10} color="green" />
                          <span>{`Battery: ${victim?.personPosition.battery}`}</span>
                        </li>
                        <li className="flex flex-row items-center gap-1">
                          <IconFeather.Calendar size={10} color="blue" />
                          <span>{`Date: ${dayjs
                            .utc(victim?.personPosition.positionDate)
                            .local()
                            .format("MMMM/DD/YYYY HH:mm:ss A")}`}</span>
                        </li>
                        <li className="flex flex-row items-center gap-1">
                          <IconFeather.Shield size={10} color="red" />
                          <span>{`Blood Oxygen: ${victim?.personPosition.bloodOxygen}`}</span>
                        </li>
                      </ul>
                    </div>
                  </Popup>
                </Marker>
              );
            } else return "";
          })}

          {geofences &&
            geofences?.map((geofence) => {
              const getGeofenceStyle = (idAlarmType: number) => {
                switch (idAlarmType) {
                  case 1:
                    return { color: "blue" };
                  case 2:
                    return { color: "red" };
                  case 3:
                    return { color: "green" };
                  default:
                    return { color: "black" }; // Valor por defecto en caso de que no coincida con 1, 2, o 3
                }
              };
              return (
                <GeoJSON
                  key={geofence.idGeofence}
                  data={geofence.geofence}
                  style={getGeofenceStyle(geofence.idAlarmType)}
                >
                  <Tooltip
                    permanent={true}
                    direction="center"
                    content={geofence.name}
                    opacity={0.8}
                    className={
                      geofence.idAlarmType === 1
                        ? "font-semibold text-xl  border-0 border-none border-opacity-0 text-primaryColor-700 text-opacity-100"
                        : geofence.idAlarmType === 3
                        ? "font-semibold text-xl  border-0 border-none border-opacity-0 text-gray-900 text-opacity-100"
                        : "font-semibold text-xl  border-0 border-none border-opacity-0 text-red-700 text-opacity-100"
                    }
                  ></Tooltip>
                </GeoJSON>
              );
            })}
          <LayersControl>
            <LayersControl.BaseLayer checked name="Google Map">
              <TileLayer
                attribution="Google Maps"
                url="https://www.google.cn/maps/vt?lyrs=m@189&gl=cn&x={x}&y={y}&z={z}"
              />
            </LayersControl.BaseLayer>
            <LayersControl.BaseLayer name="Google Map Satellite">
              <LayerGroup>
                <TileLayer
                  attribution="Google Maps Satellite"
                  url="https://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}"
                />
                <TileLayer url="https://www.google.cn/maps/vt?lyrs=y@189&gl=cn&x={x}&y={y}&z={z}" />
              </LayerGroup>
            </LayersControl.BaseLayer>
          </LayersControl>
        </MapContainer>
      ) : (
        <Card className="w-full space-y-5 p-4" radius="lg">
          <div className="h-1/2 rounded-lg bg-transparent flex items-center justify-center flex-col">
            <Player
              autoplay
              loop
              src={MapPositon}
              style={{ height: "300px", width: "300px" }}
            />
            <span className="text-primaryColor-900 font-semibold">
              No position Found
            </span>
          </div>
          <div className="space-y-3">
            <Skeleton className="w-full rounded-lg">
              <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
            </Skeleton>
            <Skeleton className="w-full rounded-lg">
              <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
            </Skeleton>
          </div>
        </Card>
      )}
    </>
  );
};
