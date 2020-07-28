import React from "react";
import { Map as LeafletMap, TileLayer } from "react-leaflet";
import './Map.css';
import {showDataOnMap} from './utils';
function Map({countries, caseType, center, zoom }) {
  return (
    <div className="mapL">
      <LeafletMap center={center} zoom={zoom}>
        <TileLayer
          url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {showDataOnMap(countries, caseType)}
      </LeafletMap>
    </div>
  );
}

export default Map;
