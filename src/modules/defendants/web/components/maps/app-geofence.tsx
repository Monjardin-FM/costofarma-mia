import {
  FeatureGroup,
  LayerGroup,
  LayersControl,
  MapContainer,
  TileLayer,
} from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import EsriLeafletGeoSearch from "react-esri-leaflet/plugins/EsriLeafletGeoSearch";
import { useRef } from "react";
import { FullscreenControl } from "react-leaflet-fullscreen";
export type AppGeofenceProps = {
  handleVisibleException: (param: boolean) => void;
  setPoints: (params: [number, number][]) => void;
};
export const AppGeofence = ({
  handleVisibleException,
  setPoints,
}: AppGeofenceProps) => {
  const mapRef = useRef<any>();
  const created = (e: any) => {
    handleVisibleException(true);
    if (e.layerType === "circle") {
      const latlng = e.layer.getLatLng();
      const d2r = Math.PI / 180;
      const r2d = 180 / Math.PI;
      const earthRadius = 6371000;
      const points = 60;
      const rLat = (e.layer.getRadius() / earthRadius) * r2d;
      const rLng = rLat / Math.cos(latlng.lat * d2r);
      const extP: [number, number][] = [];

      for (let i = 0; i < points + 1; i++) {
        let theta = Math.PI * 2 * (i / points);
        let ex: number = latlng.lng + rLng * Math.cos(theta);
        let ey: number = latlng.lat + rLat * Math.sin(theta);
        extP.push([ex, ey]);
      }
      setPoints(extP);
    }
  };
  const deleted = () => {
    handleVisibleException(false);
    setPoints([]);
  };

  return (
    <>
      <MapContainer
        ref={mapRef}
        center={[29.424349, -98.491142]}
        zoom={10}
        scrollWheelZoom={true}
        style={{ height: "60vh", width: "100wh" }}
        id="map"
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
        <FeatureGroup>
          <EditControl
            position="topright"
            onCreated={created}
            onDeleted={deleted}
            draw={{
              rectangle: false,
              circle: true,
              circlemarker: false,
              marker: false,
              polyline: false,
              polygon: false,
            }}
          />
        </FeatureGroup>
        {/* <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        /> */}
        <EsriLeafletGeoSearch
          providers={{
            arcgisOnlineProvider: {
              token: import.meta.env.VITE_TOKEN_GEOSEARCH,
              label: "ArcGIS Online Results",
              maxResults: 10,
            },
          }}
          useMapBounds={false}
          position="bottomright"
          key={import.meta.env.VITE_TOKEN_GEOSEARCH}
        />
      </MapContainer>
    </>
  );
};
