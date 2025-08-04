import { useEffect, useRef } from "react";
import {
  MapContainer,
  TileLayer,
  GeoJSON,
  useMap,
  LayersControl,
  LayerGroup,
} from "react-leaflet";
import { FullscreenControl } from "react-leaflet-fullscreen";

type AppGeofenceViewProps = {
  geofence?: any;
};

export const AppGeofenceView = ({ geofence }: AppGeofenceViewProps) => {
  const mapRef = useRef<any>();
  return (
    <div className="flex flex-col w-full col-span-12">
      {!geofence ? (
        ""
      ) : (
        <MapContainer
          ref={mapRef}
          center={[29.424349, -98.491142]}
          zoom={3}
          scrollWheelZoom={true}
          style={{ height: "60vh", width: "80wh" }}
          id="mapGeofence"
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
          <MapFlyCenter />
          {geofence &&
            geofence.map((geo: any) => (
              <GeoJSON
                key={"geofence-defendant"}
                data={geo}
                style={
                  geofence.idAlarmType === 1
                    ? { color: "red" }
                    : { color: "blue" }
                }
              />
            ))}
          <FullscreenControl
            position="topright"
            title="Fullscreen mode"
            titleCancel="Exit fullscreen mode"
            content={"[ ]"}
          />

          {/* <TileLayer
            attribution="&copy; OpenStreetMap</a> "
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          /> */}
        </MapContainer>
      )}
    </div>
  );
};
type MapFlyCenterProps = {
  id?: number | null;
};
export const MapFlyCenter = ({}: MapFlyCenterProps) => {
  const map = useMap();
  useEffect(() => {
    map.flyTo([29.424349, -98.491142], 10);
  }, []);
  return null;
};
