
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { CatPoint } from '../hooks/useSimulatedCat'
import { useMemo } from 'react'

// Simple cat emoji icon as data URI
const svg = encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 24 24'><text y='18' font-size='18'>🐱</text></svg>`)
const catIcon = new L.Icon({
  iconUrl: "data:image/svg+xml;utf8," + svg,
  iconSize: [32, 32],
  iconAnchor: [16, 16],
  popupAnchor: [0, -16]
})

type Props = {
  point: CatPoint
  trail: CatPoint[]
  bboxPadding?: number[]
}

export default function CatMap({ point, trail }: Props) {
  const center = useMemo(() => [point.lat, point.lng] as [number, number], [point.lat, point.lng])
  const path = trail.map(p => [p.lat, p.lng]) as [number, number][]

  return (
    <MapContainer center={center} zoom={15} className="map" aria-label="Map showing your cat's live location">
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Polyline positions={path} />
      <Marker position={center} icon={catIcon}>
        <Popup>
          <div><strong>Live Cat</strong></div>
          <div>Lat: {point.lat.toFixed(5)}, Lng: {point.lng.toFixed(5)}</div>
          <div>Speed: {point.speedKmh.toFixed(1)} km/h</div>
          <div>Accuracy: ±{Math.round(point.accuracyM)} m</div>
        </Popup>
      </Marker>
    </MapContainer>
  )
}
