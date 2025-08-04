import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  GeoJSON,
  Tooltip,
  LayersControl,
  LayerGroup,
} from "react-leaflet";
import { useEffect, useState } from "react";
import * as IconFetaher from "react-feather";
import dayjs from "dayjs";
import {
  GeofenceHistoric,
  Historic,
  HistoricPosition,
} from "../../../domain/entities/historic-position";
import { FullscreenControl } from "react-leaflet-fullscreen";
import { Card, Skeleton } from "@nextui-org/react";
import { Player } from "@lottiefiles/react-lottie-player";
import MapPosition from "../../../../../assets/json/position.json";
import { MyLayer } from "./markers";
import { Icon } from "leaflet";
import DefIcon from "../../../../../assets/icons/defendant-marker.png";
import DefHistoricIcon from "../../../../../assets/icons/defendant-historic-marker.png";
import { MyLayerVictims } from "./markers-victim";

type FlyNewPositionDefendantProps = {
  positionDefendantCenter: number[];
  defendantPositionHistoric?: Historic[] | [];
};
// Marker with last position
export const FlyNewPositionDefendant = ({
  defendantPositionHistoric,
  positionDefendantCenter,
}: FlyNewPositionDefendantProps) => {
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
    defendantPositionHistoric &&
    defendantPositionHistoric.length > 0 ? (
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
                defendantPositionHistoric[defendantPositionHistoric.length - 1]
                  .cardioFrequency
              }`}</span>
            </li>

            <li className="flex flex-row items-center gap-1">
              <IconFetaher.Battery size={10} color="green" />
              <span>{`Battery: ${
                defendantPositionHistoric[defendantPositionHistoric.length - 1]
                  .battery
              }`}</span>
            </li>
            <li className="flex flex-row items-center gap-1">
              <IconFetaher.Calendar size={10} color="blue" />
              <span>{`Date: ${dayjs
                .utc(
                  defendantPositionHistoric[
                    defendantPositionHistoric.length - 1
                  ].positionDate
                )
                .local()
                .format("MMMM/DD/YYYY HH:mm:ss A")}`}</span>
            </li>
            {}
            <li className="flex flex-row items-center gap-1">
              <IconFetaher.Shield size={10} color="red" />
              <span>{`Blood Oxygen: ${
                defendantPositionHistoric[defendantPositionHistoric.length - 1]
                  .bloodOxygen
              }`}</span>
            </li>
          </ul>
        </div>
      </Popup>
    </Marker>
  ) : null;
};

type MapTrackingProps = {
  defendantPosition?: HistoricPosition | null;
  victimPosition?: HistoricPosition[] | null;
  geofences?: GeofenceHistoric[] | null;
  positionSelectedDefendant?: Historic;
};
export const MapHistoricPosition = ({
  defendantPosition,
  geofences,
  victimPosition,
  positionSelectedDefendant,
}: // victimPosition,
MapTrackingProps) => {
  const [positionDefendantCenter, setPositionDefendantCenter] = useState([
    29.424349, -98.491142,
  ]);
  // const [isPositionDefendant, setIspositionDefendant] = useState(false);
  useEffect(() => {
    if (
      defendantPosition &&
      defendantPosition.historicPersonPosition.length > 0
    ) {
      setPositionDefendantCenter([
        defendantPosition.historicPersonPosition[
          defendantPosition.historicPersonPosition.length - 1
        ].lat,
        defendantPosition.historicPersonPosition[
          defendantPosition.historicPersonPosition.length - 1
        ].lon,
      ]);
    } else {
      setPositionDefendantCenter([29.424349, -98.491142]);
    }
  }, [defendantPosition]);
  const historicDefenndatnIcon = new Icon({
    iconUrl: DefHistoricIcon,
    iconSize: [35, 35], // size of the icon
    iconAnchor: [17.5, 35], // point of the icon which will correspond to marker's location
    popupAnchor: [0, -35], // point from which the popup should open relative to the iconAnchor
  });
  return (
    <>
      {defendantPosition ? (
        <MapContainer
          center={
            positionDefendantCenter
              ? [positionDefendantCenter[0], positionDefendantCenter[1]]
              : [29.424349, -98.491142]
          }
          zoom={18}
          scrollWheelZoom={true}
          style={{ height: "70vh", width: "100wh", zIndex: 0 }}
          preferCanvas
        >
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
          <FullscreenControl
            position="topright"
            title="Fullscreen mode"
            titleCancel="Exit fullscreen mode"
            content={"[ ]"}
          />
          <FlyNewPositionDefendant
            positionDefendantCenter={positionDefendantCenter}
            defendantPositionHistoric={
              defendantPosition?.historicPersonPosition
            }
          />
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

          <MyLayer positions={defendantPosition?.historicPersonPosition} />

          {geofences && geofences.length > 0
            ? geofences.map((geo) => {
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
                    key={geo.idGeofence}
                    data={JSON.parse(geo.geofence)}
                    style={getGeofenceStyle(geo.idAlarmType)}
                  >
                    <Tooltip
                      permanent={true}
                      direction="center"
                      content={geo.name}
                      opacity={0.8}
                      className={
                        geo.idAlarmType === 1
                          ? "font-semibold text-xl  border-0 border-none border-opacity-0 text-primaryColor-700 text-opacity-100"
                          : geo.idAlarmType === 3
                          ? "font-semibold text-xl  border-0 border-none border-opacity-0 text-gray-900 text-opacity-100"
                          : "font-semibold text-xl  border-0 border-none border-opacity-0 text-red-700 text-opacity-100"
                      }
                    ></Tooltip>
                  </GeoJSON>
                );
              })
            : ""}

          {victimPosition &&
            victimPosition.length > 0 &&
            victimPosition.map((victim) => (
              <>
                {victim.historicPersonPosition.length > 0 ? (
                  <>
                    <Marker
                      key={victim.idPerson}
                      position={[
                        victim.historicPersonPosition[
                          victim.historicPersonPosition.length - 1
                        ].lat,
                        victim.historicPersonPosition[
                          victim.historicPersonPosition.length - 1
                        ].lon,
                      ]}
                    >
                      <Popup>
                        <div className="flex flex-col gap-2">
                          <h1 className="text-red-700 text-center font-semibold">{`Last Position: ${victim.completeName}`}</h1>
                          <ul>
                            <li className="flex flex-row items-center gap-1">
                              <IconFetaher.Heart size={10} color="red" />
                              <span>{`Cardio Frequency: ${
                                victim.historicPersonPosition[
                                  victim.historicPersonPosition.length - 1
                                ].cardioFrequency
                              }`}</span>
                            </li>

                            <li className="flex flex-row items-center gap-1">
                              <IconFetaher.Battery size={10} color="green" />
                              <span>{`Battery: ${
                                victim.historicPersonPosition[
                                  victim.historicPersonPosition.length - 1
                                ].battery
                              }`}</span>
                            </li>
                            <li className="flex flex-row items-center gap-1">
                              <IconFetaher.Calendar size={10} color="blue" />
                              <span>{`Date: ${dayjs
                                .utc(
                                  victim.historicPersonPosition[
                                    victim.historicPersonPosition.length - 1
                                  ].positionDate
                                )
                                .local()
                                .format("MMMM/DD/YYYY HH:mm:ss A")}`}</span>
                            </li>
                            {}
                            <li className="flex flex-row items-center gap-1">
                              <IconFetaher.Shield size={10} color="red" />
                              <span>{`Blood Oxygen: ${
                                victim.historicPersonPosition[
                                  victim.historicPersonPosition.length - 1
                                ].bloodOxygen
                              }`}</span>
                            </li>
                          </ul>
                        </div>
                      </Popup>
                    </Marker>
                    <MyLayerVictims positions={victim.historicPersonPosition} />
                  </>
                ) : (
                  ""
                )}
              </>
            ))}

          {/* <TileLayer
            attribution="&copy; OpenStreetMap</a> "
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          /> */}
        </MapContainer>
      ) : (
        <>
          {/* {String(isPositionDefendant)} */}
          <Card className="w-full space-y-5 p-4" radius="lg">
            <div className="h-1/2 rounded-lg bg-transparent flex items-center justify-center flex-col">
              <Player
                autoplay
                loop
                src={MapPosition}
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
        </>
      )}
    </>
  );
};
