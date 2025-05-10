"use client"
import { MapContainer, TileLayer, LayersControl } from 'react-leaflet'

import 'leaflet/dist/leaflet.css'


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

const MapDisplay = () => {

    return (
        <MapContainer center={[13.815, 100.559]} zoom={14} className='h-[100vh] w-full'>
            <TileLayer
                url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
                attribution=''
            />
        </MapContainer>
    )
};
export default MapDisplay;
