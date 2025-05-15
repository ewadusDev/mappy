"use client"
import { MapContainer, TileLayer, FeatureGroup } from 'react-leaflet'
import { EditControl } from "react-leaflet-draw"
import { useContext, useEffect, useRef, useState } from 'react';
import L from "leaflet"
import 'leaflet/dist/leaflet.css'
import 'leaflet-draw/dist/leaflet.draw.css';
import { MapContext } from '@/app/page';




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

const MapContent = () => {
    const { setFeature, isPlanCreated, setIsPlanCreated } = useContext(MapContext)
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
        </MapContainer>
    )
};
export default MapContent;
