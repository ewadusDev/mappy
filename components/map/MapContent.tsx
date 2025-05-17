"use client";
import { MapContainer, TileLayer, FeatureGroup, Polygon } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import wkx from "wkx";
import { MapContext } from "./MapContext";

const polygon = {
  feature_id: 164,
  latLng:
    '{"type":"Polygon","coordinates":[[[100.567245,13.842747],[100.558147,13.826996],[100.574198,13.825162],[100.582695,13.84108],[100.574799,13.84758],[100.567245,13.842747]]]}',
  type: "POLYGON",
};
// Parse the GeoJSON from the string
const geoJson = JSON.parse(polygon.latLng);

// Convert GeoJSON [lng, lat] to Leaflet [lat, lng]
const coordinates = geoJson.coordinates[0].map(([lng, lat]: number[]) => [
  lat,
  lng,
]);

const drawOption = {
  position: "topright",
  draw: {
    circle: false,
    rectangle: false,
    circlemarker: false,
    marker: false,
    polyline: false,
    polygon: {
      shapeOptions: {
        color: "#F2BE38",
        opacity: 0.9,
        weight: 3,
        lineCap: "round",
        lineJoin: "round",
      },
    },
    // polyline: {
    //     shapeOptions: {
    //         color: '#F2BE38',
    //         opacity: 0.9,
    //         weight: 3,
    //     }
    // }
  },
};

// Convert function
function convertWKBHexToGeoJSON(wkbHex: string) {
  const buffer = Buffer.from(wkbHex, "hex");
  const geometry = wkx.Geometry.parse(buffer);
  return geometry.toGeoJSON(); // GeoJSON object
}

const MapContent = () => {
  const {
    setFeature,
    isPlanCreated,
    setIsPlanCreated,
    selectedData,
    isCreateMapActive,
    isCancel,
    setIsCancel,
    selectBaseMap,
  } = useContext(MapContext);
  const [center, setCenter] = useState<[number, number]>([13.815, 100.559]);
  const featureGroupRef = useRef(null);

  useEffect(() => {
    const layerFeature = featureGroupRef.current;

    if (isPlanCreated || isCancel) {
      // Shape ของ polygon
      if (layerFeature) {
        layerFeature.clearLayers();
        setFeature(null);
        setIsPlanCreated(false);
        setIsCancel(false);
        return;
      }
    }
  }, [isPlanCreated, isCancel]);

  const convertedData = useMemo(() => {
    if (!selectedData) return null;

    const {
      plans: { geom },
    } = selectedData;
    const geoJson = convertWKBHexToGeoJSON(geom);
    const arrayGeoJson = geoJson.coordinates[0].map(([lng, lat]: number[]) => [
      lat,
      lng,
    ]);
    return arrayGeoJson;
  }, [selectedData]);

  const _onCreated = (e: L.DrawEvents.Created) => {
    const { layerType, layer } = e;

    if (layerType === "polygon") {
      const geoJson = layer.toGeoJSON();
      setFeature({
        feature_id: layer._leaflet_id,
        latLng: JSON.stringify(geoJson.geometry),
        type: layerType.toUpperCase(),
      });
      return;
    }
  };

  const _onEdited = (e: L.DrawEvents.Edited) => {
    const {
      layers: { _layers },
    } = e;
    Object.values(_layers).map((layer) => {
      setFeature({ feature_id: layer._leaflet_id, latLng: layer._latlngs });
    });
  };

  const _onDeleted = (e: L.DrawEvents.Deleted) => {
    setFeature(null);
  };

  return (
    <MapContainer center={center} zoom={14} className="z-2 h-[100vh] w-full">
      {isCreateMapActive && (
        <FeatureGroup ref={featureGroupRef}>
          <EditControl
            {...drawOption}
            onCreated={_onCreated}
            onEdited={_onEdited}
            onDeleted={_onDeleted}
          />
        </FeatureGroup>
      )}
      <TileLayer url={selectBaseMap} attribution="" />

      {convertedData && <Polygon positions={convertedData} />}
    </MapContainer>
  );
};
export default MapContent;
