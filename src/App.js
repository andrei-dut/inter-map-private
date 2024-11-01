// import { locationsArray } from "./data/locations";
import React, { useMemo, useState } from "react";
import "./App.css";
import MapLegend from "./views/MapLegend";
import ObjectSelector from "./views/ObjectSelector";
import MapContainer from "./views/Ymaps";
import PreviewInfo from "./views/PreviewInfo";
import jsonData from "./data/stars.json";
import { newMultiBrands } from "./data/newMultiBrands";

const pjson = require("../package.json");

function App() {
  // const [stars, setStars] = useState([]);

  const countries = useMemo(() => {
    return newMultiBrands.reduce((prev, current) => {
      const isCountry = prev.find((_) => _.name === current.country);

      if (isCountry) {
        isCountry.elems = [...isCountry.elems, current];
      } else {
        return [...prev, { name: current.country, elems: [current] }];
      }
      return prev;
    }, []);
  }, []);

  const [selectedMarker, setSelectedMarker] = useState(null);

  const [stateMap, setStateMap] = useState({ center: [56.837864, 60.594882], zoom: 4 });

  const handleMarkerClickFromList = (marker) => {
    setStateMap({ center: marker.coordinates, zoom: 15 });
    setTimeout(() => {
      setSelectedMarker(marker);
    }, 500);
  };

  return (
    <div className="App">
      <div className="app-head">
        <h1 className="app__header">
          Карта расположения субъектов ТПС предприятий системы Министерства промышленности
          Республики Беларусь
        </h1>
        <ObjectSelector countries={countries} handleMarkerClick={handleMarkerClickFromList} />
      </div>

      <MapContainer
        markers={newMultiBrands}
        markers2={Object.values(jsonData)}
        stateMap={stateMap}
        setSelectedMarker={setSelectedMarker}
      />
      <MapLegend />
      <PreviewInfo selectedMarker={selectedMarker} setSelectedMarker={setSelectedMarker} />
      <p
        style={{
          position: "fixed",
          bottom: 0,
          fontWeight: 500,
          fontSize: "8px",
          background: "#ffffff7d",
          padding: "2px",
          borderRadius: "8px",
        }}
      >
        {pjson.version}
      </p>
    </div>
  );
}

export default App;
