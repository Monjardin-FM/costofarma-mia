import { useEffect, useState } from "react";
import { DeviceHistoricPosition } from "../../../domain/entities/device-position";
import {
  LayerGroup,
  LayersControl,
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  Tooltip,
  useMap,
} from "react-leaflet";
import { FullscreenControl } from "react-leaflet-fullscreen";
import { Card, Skeleton } from "@nextui-org/react";
import { Player } from "@lottiefiles/react-lottie-player";
import MapPositon from "../../../../../assets/json/position.json";
import { Icon } from "leaflet";
import DefIcon from "../../../../../assets/icons/defendant-marker.png";
import * as IconFetaher from "react-feather";
import dayjs from "dayjs";
import { MapLayerHistoricPosition } from "./map-layer-historic-position";
import DefHistoricIcon from "../../../../../assets/icons/defendant-historic-marker.png";

type FlyNewPositionDeviceProps = {
  positionDefendantCenter: number[];
  historicPositionDevice?: DeviceHistoricPosition[] | [];
};
// Marker with last position
export const FlyNewPositionDevice = ({
  // defendantPositionHistoric,
  positionDefendantCenter,
  historicPositionDevice,
}: FlyNewPositionDeviceProps) => {
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
    historicPositionDevice &&
    historicPositionDevice.length > 0 ? (
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
              <IconFetaher.Heart size={10} color="red" />
              <span>{`Cardio Frequency: ${
                historicPositionDevice[historicPositionDevice.length - 1]
                  .cardioFrequency
              }`}</span>
            </li>

            <li className="flex flex-row items-center gap-1">
              <IconFetaher.Battery size={10} color="green" />
              <span>{`Battery: ${
                historicPositionDevice[historicPositionDevice.length - 1]
                  .battery
              }`}</span>
            </li>
            <li className="flex flex-row items-center gap-1">
              <IconFetaher.Calendar size={10} color="blue" />
              <span>{`Date: ${dayjs
                .utc(
                  historicPositionDevice[historicPositionDevice.length - 1]
                    .positionDate
                )
                .local()
                .format("MMMM/DD/YYYY HH:mm:ss A")}`}</span>
            </li>
            {}
            <li className="flex flex-row items-center gap-1">
              <IconFetaher.Shield size={10} color="red" />
              <span>{`Blood Oxygen: ${
                historicPositionDevice[historicPositionDevice.length - 1]
                  .bloodOxygen
              }`}</span>
            </li>
          </ul>
        </div>
      </Popup>
    </Marker>
  ) : null;
};

export type MapHistoricPositionDeviceProps = {
  historicPositionDevice?: DeviceHistoricPosition[];
  positionSelectedDefendant?: DeviceHistoricPosition;
};

export const MapHistoricPositionDevice = ({
  historicPositionDevice,
  positionSelectedDefendant,
}: MapHistoricPositionDeviceProps) => {
  const [positionDeviceCenter, setPositionDeviceCenter] = useState([
    29.424349, -98.491142,
  ]);
  useEffect(() => {
    if (historicPositionDevice && historicPositionDevice.length > 0) {
      setPositionDeviceCenter([
        historicPositionDevice[historicPositionDevice.length - 1].lat,
        historicPositionDevice[historicPositionDevice.length - 1].lon,
      ]);
    } else {
      setPositionDeviceCenter([29.424349, -98.491142]);
    }
  }, [historicPositionDevice]);
  const historicDefenndatnIcon = new Icon({
    iconUrl: DefHistoricIcon,
    iconSize: [35, 35], // size of the icon
    iconAnchor: [17.5, 35], // point of the icon which will correspond to marker's location
    popupAnchor: [0, -35], // point from which the popup should open relative to the iconAnchor
  });
  return (
    <>
      {historicPositionDevice ? (
        <MapContainer
          center={
            positionDeviceCenter
              ? [positionDeviceCenter[0], positionDeviceCenter[1]]
              : [29.424349, -98.491142]
          }
          zoom={18}
          scrollWheelZoom={true}
          style={{ height: "70vh", width: "100wh" }}
          preferCanvas
        >
          <FullscreenControl
            position="topright"
            title="Fullscreen mode"
            titleCancel="Exit fullscreen mode"
            content={"[ ]"}
          />
          <FlyNewPositionDevice
            positionDefendantCenter={positionDeviceCenter}
            historicPositionDevice={historicPositionDevice}
          />
          <MapLayerHistoricPosition positions={historicPositionDevice} />
          {positionSelectedDefendant && (
            <Marker
              icon={historicDefenndatnIcon}
              key={positionSelectedDefendant.idPerson}
              position={[
                positionSelectedDefendant.lat,
                positionSelectedDefendant.lon,
              ]}
            >
              <Tooltip direction="top" permanent={true} offset={[0, -35]}>
                <div className="flex flex-col gap-2">
                  <h1 className="text-red-700 text-center font-semibold">{`Position`}</h1>
                  <ul>
                    <li className="flex flex-row items-center gap-1">
                      <IconFetaher.Heart size={10} color="red" />
                      <span>{`Cardio Frequency: ${positionSelectedDefendant.cardioFrequency}`}</span>
                    </li>

                    <li className="flex flex-row items-center gap-1">
                      <IconFetaher.Battery size={10} color="green" />
                      <span>{`Battery: ${positionSelectedDefendant.battery}`}</span>
                    </li>
                    <li className="flex flex-row items-center gap-1">
                      <IconFetaher.Calendar size={10} color="blue" />
                      <span>{`Date: ${dayjs
                        .utc(positionSelectedDefendant.positionDate)
                        .local()
                        .format("MMMM/DD/YYYY HH:mm:ss A")}`}</span>
                    </li>
                    {}
                    <li className="flex flex-row items-center gap-1">
                      <IconFetaher.Shield size={10} color="red" />
                      <span>{`Blood Oxygen: ${positionSelectedDefendant.bloodOxygen}`}</span>
                    </li>
                  </ul>
                </div>
              </Tooltip>
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
