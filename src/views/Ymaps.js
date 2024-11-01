import React, { useCallback, useRef, useState } from "react";
import { YMaps, Map, Placemark, Clusterer } from "react-yandex-maps";
// import logo from "../icons/custom-icon.svg";
// import BuildingSvg from "../icons/building.svg";
import CrownBSvg from "../icons/crownB.svg";
import CrownRSvg from "../icons/crownR.svg";
import CrownYSvg from "../icons/crownY.svg";
// new multi brands icons
import NewCrownBSvg from "../icons/newCrownB.svg";
import NewCrownGSvg from "../icons/newCrownG.svg";
import NewCrownYSvg from "../icons/newCrownY.svg";
import NewCrownLBSvg from "../icons/newCrownLB.svg";
// end

import NotWorkSvg from "../icons/notWork.svg";
import SettingsSvg from "../icons/settings.svg";
import ShopHouseSvg from "../icons/shopHouse.svg";
import PredstavSvg from "../icons/predstav.svg";
import StarSvg from "../icons/star.svg";

const MapContainer = ({ markers, markers2, stateMap, setSelectedMarker }) => {
  let mapRef = useRef();
  const [layout, setLayout] = useState();

  const iconContent = useCallback(
    (text, fontSize, color) =>
      `<div style="font-size: ${fontSize}px;z-index: 99999;color: ${color}; max-width: 120px; width: 120px; display: flex; align-items: end; justify-content: center; height: 26px; font-weight: 600;text-shadow: 2px 2px 4px rgba(255, 255, 255, 1)">${text}</div>`,
    []
  );

  const handlerOnLoadMap = (ymaps) => {
    // console.log(ymaps);

    const locationMarkBalloonContainer = ({ ymaps }) =>
      ymaps.templateLayoutFactory.createClass(iconContent("text"));

    const content = locationMarkBalloonContainer({ ymaps });
    // setLayout({ content });
  };

  const handlePlacemarkClick = (e) => {
    const allMarkers = [markers, markers2].flat();
    const placemarkId = e.get("target")?.properties?.get("id");
    const _coordinates = e.get("target")?.properties?.get("_coordinates");
    const currentMarker = allMarkers.find((el) => el && el.id === placemarkId);
    console.log(`Клик по метке с идентификатором ${placemarkId}`);
    console.log(_coordinates);

    setTimeout(() => {
      if (mapRef.current?.setCenter) {
        mapRef.current.setCenter(_coordinates, 15, {
          duration: 500,
        });
        setSelectedMarker(currentMarker);
      }
    }, 0);
  };

  const getIconByStatus = (status) => {
    switch (`${status}`) {
      case "1":
        return ShopHouseSvg;
      case "2":
        return SettingsSvg;
      case "3":
        return PredstavSvg;
      case "4a":
        return CrownYSvg;
      case "4b":
        return CrownRSvg;
      case "4c":
        return CrownBSvg;
      case "4d":
        return CrownBSvg;
      case "4e":
        return CrownBSvg;
      // case "5":
      //   return BuildingSvg;
      case "6":
        return NotWorkSvg;
      case "7a":
        return NewCrownGSvg;
      case "7b":
        return NewCrownBSvg;
      case "7c":
        return NewCrownYSvg;
      case "7d":
        return NewCrownLBSvg;

      default:
        return StarSvg;
    }
  };

  // console.log(markers);

  return (
    <YMaps query={{ apikey: "6b70571d-3060-45ee-8ac0-cb21e5594ed5" }}>
      <Map
        defaultState={stateMap}
        state={stateMap}
        width="100%"
        height="100vh"
        modules={[
          "templateLayoutFactory",
          "layout.ImageWithContent",
          //   "geoObject.addon.balloon",
          "geoObject.addon.hint",
          "search",
        ]}
        onLoad={handlerOnLoadMap}
        instanceRef={mapRef}
      >
        <Clusterer
          options={{
            groupByCoordinates: false,
            // gridSize: 128,
          }}
          propertie={{ hintContent: "Мало меток" }}
        >
          {markers.map((marker) => (
            <Placemark
              key={marker.id}
              geometry={marker.coordinates}
              properties={{
                id: marker.id,
                hintContent: marker.holding || marker.name,
                iconContent: iconContent(
                  marker.name,
                  marker.holding ? 10 : 14,
                  "#124168"
                  // marker.holding ? "#1470bd" : "#1e98ff"
                ),
                _coordinates: marker.coordinates,
              }}
              options={{
                iconLayout: "default#imageWithContent",
                //   iconLayout: "default#image",
                iconImageHref: getIconByStatus(marker.status),
                iconImageSize: marker.holding ? [14, 14] : [28, 28],
                iconImageOffset: [-7, -7],
                iconContentOffset: [-53, -28],
                // iconContentLayout: layout.content,
              }}
              onClick={handlePlacemarkClick}
            />
          ))}
        </Clusterer>
        <Clusterer
          options={{
            groupByCoordinates: false,
            // gridSize: 33,
            preset: "islands#invertedRedClusterIcons", // Стиль для красных кластеров
            minClusterSize: 4,
          }}
          propertie={{ hintContent: "Мало меток" }}
        >
          {markers2
            ? markers2.map((marker) => (
                <Placemark
                  key={marker.id}
                  geometry={marker.coordinates}
                  properties={{
                    id: marker.id,
                    hintContent: marker.holding || marker.name,
                    iconContent: iconContent(
                      marker.name,
                      marker.holding ? 6 : 8,
                      marker.holding ? "#1470bd" : "#1e98ff"
                    ),
                    _coordinates: marker.coordinates,
                  }}
                  options={{
                    iconLayout: "default#imageWithContent",
                    //   iconLayout: "default#image",
                    iconImageHref: getIconByStatus(marker.status),
                    iconImageSize: marker.holding ? [7, 7] : [14, 14],
                    iconImageOffset: [-7, -7],
                    iconContentOffset: [-53, -28],
                    // iconContentLayout: layout.content,
                  }}
                  onClick={handlePlacemarkClick}
                />
              ))
            : null}
        </Clusterer>
      </Map>
    </YMaps>
  );
};

export default React.memo(MapContainer);
