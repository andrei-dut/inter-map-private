// import { locationsArray } from "./data/locations";
import React, { useMemo, useState } from "react";
import "./App.css";
import MapLegend from "./views/MapLegend";
import ObjectSelector from "./views/ObjectSelector";
import MapContainer from "./views/Ymaps";
import PreviewSlide from "./views/PreviewSlide";
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

  const [slideId, setSlideId] = useState(null);

  const [stateMap, setStateMap] = useState({ center: [0, 0], zoom: 3 });

  const handleMarkerClickFromList = (coords) => {
    setStateMap({ center: coords, zoom: 10 });
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
        setSlideId={setSlideId}
      />
      <MapLegend />
      <PreviewSlide slideId={slideId} setSlideId={setSlideId} />
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
