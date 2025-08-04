import { Historic } from "../../../domain/entities/historic-position";
import { CircleMarker, LayerGroup, Popup } from "react-leaflet";
import * as Icon from "react-feather";
import dayjs from "dayjs";
export type MyLayerProps = {
  positions?: Historic[] | [];
};

export const MyLayer = ({ positions }: MyLayerProps) => {
  //   const [markers, setMarkers] = useState(positions);
  return (
    <LayerGroup>
      {positions &&
        positions.length > 0 &&
        positions.map((position, key) => {
          return (
            <>
              <CircleMarker
                key={key}
                center={[position.lat, position.lon]}
                fill
                radius={5}
                color={"#FF1919"}
                fillColor={"#ff9999"}
                //ref={markerRef}
                className="relative flex flex-col items-center justify-center"
                // pane={key.toString()}
              >
                <span className="w-full z-50 text-primaryColor-900">
                  {key.toString()}
                </span>
                <Popup>
                  <div className="flex flex-col gap-2">
                    <ul>
                      <li className="flex flex-row items-center gap-1">
                        <Icon.Heart size={10} color="red" />
                        <span>{`Cardio Frequency: ${position.cardioFrequency}`}</span>
                      </li>

                      <li className="flex flex-row items-center gap-1">
                        <Icon.Battery size={10} color="green" />
                        <span>{`Battery: ${position.battery}`}</span>
                      </li>
                      <li className="flex flex-row items-center gap-1">
                        <Icon.Calendar size={10} color="blue" />
                        <span>{`Date: ${dayjs
                          .utc(position.positionDate)
                          .local()
                          .format("MMMM/DD/YYYY HH:mm:ss A")}`}</span>
                      </li>
                      <li className="flex flex-row items-center gap-1">
                        <Icon.Shield size={10} color="red" />
                        <span>{`Blood Oxygen: ${position.bloodOxygen}`}</span>
                      </li>
                    </ul>
                  </div>
                </Popup>
              </CircleMarker>
            </>
          );
        })}
    </LayerGroup>
  );
};
