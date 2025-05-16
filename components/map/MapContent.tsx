"use client"
import { MapContainer, TileLayer, FeatureGroup, Polygon } from 'react-leaflet'
import { EditControl } from "react-leaflet-draw"
import { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import L from "leaflet"
import 'leaflet/dist/leaflet.css'
import 'leaflet-draw/dist/leaflet.draw.css';
import { MapContext } from '@/app/page';
import wkx from 'wkx';



const maps = [
    {
        name: "OpenStreetMap",
        url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    },
    {
        name: "Satellite",
        url: "https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"
    }, {
        name: "Hybrid",
        url: "https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}"
    },
    {
        name: "Terrain",
        url: "https://mt1.google.com/vt/lyrs=p&x={x}&y={y}&z={z}"
    },
    {
        name: "Dark",
        url: "https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
    }
]

const polygon = { "feature_id": 164, "latLng": "{\"type\":\"Polygon\",\"coordinates\":[[[100.567245,13.842747],[100.558147,13.826996],[100.574198,13.825162],[100.582695,13.84108],[100.574799,13.84758],[100.567245,13.842747]]]}", "type": "POLYGON" }
// Parse the GeoJSON from the string
const geoJson = JSON.parse(polygon.latLng)

// Convert GeoJSON [lng, lat] to Leaflet [lat, lng]
const coordinates = geoJson.coordinates[0].map(([lng, lat]) => [lat, lng]);


const drawOption = {
    position: 'topright',
    draw: {
        circle: false,
        rectangle: false,
        circlemarker: false,
        marker: false,
        polyline: false,
        polygon: {
            shapeOptions: {
                color: '#F2BE38',
                opacity: 0.9,
                weight: 3,
                lineCap: 'round',
                lineJoin: 'round'
            }
        },
        // polyline: {
        //     shapeOptions: {
        //         color: '#F2BE38',
        //         opacity: 0.9,
        //         weight: 3,
        //     }
        // }
    }

}


// Convert function
function convertWKBHexToGeoJSON(wkbHex: string) {
    const buffer = Buffer.from(wkbHex, 'hex');
    const geometry = wkx.Geometry.parse(buffer);
    return geometry.toGeoJSON(); // GeoJSON object
}

const MapContent = () => {
    const { setFeature, isPlanCreated, setIsPlanCreated, selectedData } = useContext(MapContext)
    const [center, setCenter] = useState<[number, number]>([13.815, 100.559])
    const featureGroupRef = useRef(null);

    useEffect(() => {
        const layerFeature = featureGroupRef.current

        if (isPlanCreated) {
            // Shape ของ polygon
            if (layerFeature) {
                layerFeature.clearLayers()
                setFeature(null)
                setIsPlanCreated(false)
                return
            }
        }
    }, [isPlanCreated])



    const convertedData = useMemo(() => {
        if (!selectedData) return null;

        const { plans: { geom } } = selectedData;
        const geoJson = convertWKBHexToGeoJSON(geom);
        const arrayGeoJson = geoJson.coordinates[0].map(([lng, lat]) => [lat, lng])
        return arrayGeoJson
    }, [selectedData]);

    const _onCreated = (e: L.DrawEvents.Created) => {
        const { layerType, layer } = e

        if (layerType === 'polygon') {
            const geoJson = layer.toGeoJSON()
            setFeature(
                {
                    feature_id: layer._leaflet_id,
                    latLng: JSON.stringify(geoJson.geometry),
                    type: layerType.toUpperCase()
                })
            return
        }

    }



    const _onEdited = (e: L.DrawEvents.Edited) => {
        const { layers: { _layers } } = e
        Object.values(_layers).map((layer) => {
            setFeature({ feature_id: layer._leaflet_id, latLng: layer._latlngs })
        })
    }

    const _onDeleted = (e: L.DrawEvents.Deleted) => {
        setFeature(null)
    }

    return (
        <MapContainer center={center} zoom={14} className='h-[100vh] w-full z-2'>

            <FeatureGroup ref={featureGroupRef}>
                <EditControl
                    {...drawOption}
                    onCreated={_onCreated}
                    onEdited={_onEdited}
                    onDeleted={_onDeleted}
                />

            </FeatureGroup>

            <TileLayer
                url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
                attribution=''
            />
            {convertedData && <Polygon positions={convertedData} />}

        </MapContainer>
    )
};
export default MapContent;
