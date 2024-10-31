import React, { useMemo, useState } from "react";
import {
  YMaps,
  Map,
  Placemark,
  Clusterer,
  ObjectManager,
} from "@pbe/react-yandex-maps";
import logo from "./custom-icon.svg";

const getRandomCoordinates = () => {
  // Генерация случайных координат в пределах Москвы
  const latitude = 55.75 + Math.random() * 0.1;
  const longitude = 37.6 + Math.random() * 0.1;
  return [latitude, longitude];
};

const generateMarkers = (count) => {
  const markers = [];
  for (let i = 0; i < count; i++) {
    const coordinates = getRandomCoordinates();
    markers.push({ id: i, coordinates, name: `Маркер ${i + 1}` });
  }
  return markers;
};

const MapContainer = () => {
  const mapState = {
    center: [55.751574, 37.573856], // Центр карты
    zoom: 9, // Уровень масштабирования
  };

  const coordinates = [
    [55.751574, 37.573856],
    // Добавьте здесь координаты других точек, если необходимо
  ];
  const markers = generateMarkers(76);

  const [layout, setLayout] = useState();

  const handlerOnLoadMap = (ymaps) => {
    console.log(ymaps);
    const locationMarkBalloonContainer = ({ ymaps }) =>
      ymaps.templateLayoutFactory.createClass(
        '<div style="color: #FFFFFF; font-weight: bold;">1</div>'
      );

    const content = locationMarkBalloonContainer({ ymaps });
    //   setLayout(locationMarkBalloonContainer({ ymaps }));
    setLayout({ content });
  };
  console.log(layout);

  const generateFeaturesForObjManager = useMemo(() => {
    let objects = [];

    if (markers && layout) {
      let allMarkers = [...markers];

      allMarkers.forEach((marker) => {
        objects.push({
          type: "Feature",
          id: marker.id,
          geometry: {
            type: "Point",
            coordinates: marker.coordinates,
          },
          options: {
            iconLayout: "default#imageWithContent",
            iconImageHref:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiTKBIACJ5Z1dc93CzpuS4xBkAgbx_4QqQwAVWGf5RqA&s",
            iconImageSize: [35, 44],
            iconImageOffset: [-18, -37],
            balloonLayout: layout.content,
            balloonShadow: false,
            balloonPanelMaxMapArea: 0,
            hideIconOnBalloonOpen: false,
            openBalloonOnClick: false,
          },
        });
      });
    }

    return objects;
  }, [markers, layout]);

  return (
    <YMaps query={{ apikey: "8334e7a6-6bb1-44c2-a061-4d1f8662219d" }}>
      <Map
        state={mapState}
        width="100%"
        height="100vh"
        modules={["templateLayoutFactory", "layout.ImageWithContent"]}
        onLoad={handlerOnLoadMap}
      >
        {/* <Clusterer
          options={{
            groupByCoordinates: false,
            gridSize: 128,
            // preset: "islands#invertedVioletClusterIcons",
          }}
        > */}
          {layout && (
            <ObjectManager
              options={
                {
                  //if need clusters
                  // clusterize: true,
                  // gridSize: 32,
                }
              }
              objects={{ openBalloonOnClick: true }}
              features={generateFeaturesForObjManager}
              modules={[
                "objectManager.addon.objectsBalloon",
                "objectManager.addon.objectsHint",
              ]}
              // onMouseenter={handlerMouseEnterMark}
              // onBalloonopen={handlerOpenBalloon}
              // onMouseleave={handlerMouseLeavMark}
              // onClick={handlerMoveToLocation}
              // instanceRef={objectManagerRef}
            />
          )}
          {/* {layout &&
            markers.map((marker) => (
              <Placemark
                key={marker.id}
                geometry={marker.coordinates}
                properties={{
                  hintContent: "Собственный значок метки с контентом",
                  balloonContent: "А эта — новогодняя",
                  iconContent: "12",
                }}
                options={{
                  iconLayout: "default#imageWithContent",
                //   iconLayout: "default#image",
                  iconImageHref: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiTKBIACJ5Z1dc93CzpuS4xBkAgbx_4QqQwAVWGf5RqA&s',
                  iconImageSize: [48, 48],
                  iconImageOffset: [-24, -24],
                  iconContentOffset: [15, 15],
                  iconContentLayout: layout.content,
                }}
              />
            ))} */}
        {/* </Clusterer> */}
      </Map>
    </YMaps>
  );
};

export default MapContainer;
