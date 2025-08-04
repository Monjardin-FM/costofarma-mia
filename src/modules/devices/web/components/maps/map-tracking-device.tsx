import { DevicePosition } from "../../../domain/entities/device-position";
import DefIcon from "../../../../../assets/icons/defendant-marker.png";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc"; // Importa el plugin UTC de Day.js
import timezone from "dayjs/plugin/timezone"; // Importa el plugin de zona horaria de Day.js
import { Icon } from "leaflet";
import { Card, Skeleton } from "@nextui-org/react";
import * as IconFeather from "react-feather";
import { Player } from "@lottiefiles/react-lottie-player";
import MapPositon from "../../../../../assets/json/position.json";
import {
  LayerGroup,
  LayersControl,
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
} from "react-leaflet";
import { FullscreenControl } from "react-leaflet-fullscreen";
import { useEffect } from "react";
dayjs.extend(utc);
dayjs.extend(timezone);

type FlyNewPositionDeviceTrackingProps = {
  positionDefendantCenter: number[];
  positionDevice?: DevicePosition[] | [];
};
// Marker with last position
export const FlyNewPositionDeviceTracking = ({
  // defendantPositionHistoric,
  positionDefendantCenter,
  positionDevice,
}: FlyNewPositionDeviceTrackingProps) => {
  const map = useMap();
  useEffect(() => {
    map.flyTo([positionDefendantCenter[0], positionDefendantCenter[1]], 15);
  }, [positionDefendantCenter]);
  const defendantIcon = new Icon({
    iconUrl: DefIcon,
    iconSize: [35, 35], // size of the icon
    iconAnchor: [17.5, 35], // point of the icon which will correspond to marker's location
    popupAnchor: [0, -35], // point from which the popup should open relative to the iconAnchor
  });
  return positionDefendantCenter &&
    positionDevice &&
    positionDevice.length > 0 ? (
    <Marker
      key={1}
      position={[positionDefendantCenter[0], positionDefendantCenter[1]]}
      icon={defendantIcon}
    >
      <Popup>
        <div className="flex flex-col gap-2">
          <h1 className="text-red-700 text-center font-semibold">{`Last Position`}</h1>
          <ul>
            <li className="flex flex-row items-center gap-1">
              <IconFeather.Heart size={10} color="red" />
              <span>{`Cardio Frequency: ${positionDevice[0].cardioFrequency}`}</span>
            </li>

            <li className="flex flex-row items-center gap-1">
              <IconFeather.Battery size={10} color="green" />
              <span>{`Battery: ${positionDevice[0].battery}`}</span>
            </li>
            <li className="flex flex-row items-center gap-1">
              <IconFeather.Calendar size={10} color="blue" />
              <span>{`Date: ${dayjs
                .utc(positionDevice[0].positionDate)
                .local()
                .format("MMMM/DD/YYYY HH:mm:ss A")}`}</span>
            </li>
            {}
            <li className="flex flex-row items-center gap-1">
              <IconFeather.Shield size={10} color="red" />
              <span>{`Blood Oxygen: ${positionDevice[0].bloodOxygen}`}</span>
            </li>
          </ul>
        </div>
      </Popup>
    </Marker>
  ) : null;
};

export type MapTrackingDeviceProps = {
  positionDevice?: DevicePosition[];
  position?: [number, number] | null;
};

export const MapTrackingDevice = ({
  positionDevice,
  position,
}: MapTrackingDeviceProps) => {
  const legalIcon = new Icon({
    iconUrl: DefIcon,
    iconSize: [35, 35], // size of the icon
    iconAnchor: [17.5, 35], // point of the icon which will correspond to marker's location
    popupAnchor: [0, -35], // point from which the popup should open relative to the iconAnchor
  });

  return (
    <>
      {positionDevice && positionDevice.length > 0 && position ? (
        <MapContainer
          center={position}
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
          <FlyNewPositionDeviceTracking
            positionDefendantCenter={position}
            positionDevice={positionDevice}
          />
          {positionDevice && position && (
            <Marker
              key={positionDevice[0].idPerson}
              position={position}
              icon={legalIcon}
            >
              <Popup>
                <div className="flex flex-col gap-2">
                  {/* <h1 className="text-red-700 text-center font-semibold">{`Defendant: ${defendantItem?.name} ${defendantItem?.lastName}`}</h1> */}
                  <ul>
                    <li className="flex flex-row items-center gap-1">
                      <IconFeather.Heart size={10} color="red" />
                      <span>{`Cardio Frequency: ${positionDevice[0].cardioFrequency}`}</span>
                    </li>

                    <li className="flex flex-row items-center gap-1">
                      <IconFeather.Battery size={10} color="green" />
                      <span>{`Battery: ${positionDevice[0].battery}`}</span>
                    </li>
                    <li className="flex flex-row items-center gap-1">
                      <IconFeather.Calendar size={10} color="blue" />
                      <span>{`Date: ${dayjs
                        .utc(positionDevice[0].positionDate)
                        .local()
                        .format("MMMM/DD/YYYY HH:mm:ss A")}`}</span>
                    </li>
                    <li className="flex flex-row items-center gap-1">
                      <IconFeather.Shield size={10} color="red" />
                      <span>{`Blood Oxygen: ${positionDevice[0].bloodOxygen}`}</span>
                    </li>
                  </ul>
                </div>
              </Popup>
            </Marker>
          )}
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
